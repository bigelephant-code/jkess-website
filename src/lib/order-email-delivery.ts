import { sendCustomerOrderConfirmation } from '@/lib/customer-order-email'
import {
  acquireOrderEmailLock,
  getStoredOrder,
  releaseOrderEmailLock,
  savePaidOrder,
  type StoredOrderRecord,
} from '@/lib/order-store'
import { sendPaidOrderEmail } from '@/lib/paid-order-email'

function customerEmail(order: StoredOrderRecord) {
  return (order.customer.email || order.payerEmail).trim().toLowerCase()
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function toInternalEmail(order: StoredOrderRecord) {
  return {
    orderNumber: order.orderNumber,
    paypalOrderId: order.paypalOrderId,
    paypalCaptureId: order.paypalCaptureId,
    payerEmail: order.payerEmail,
    customer: order.customer,
    items: order.items.map((item) => {
      const unitAmount = Number.parseFloat(item.unitAmount)
      return {
        name: item.name,
        variant: item.sku,
        quantity: item.quantity,
        lineTotal: Number.isFinite(unitAmount) ? unitAmount * item.quantity : 0,
      }
    }),
    total: Number.parseFloat(order.amount) || 0,
  }
}

async function saveStatus(
  order: StoredOrderRecord,
  status: Partial<Pick<StoredOrderRecord, 'internalEmailStatus' | 'customerEmailStatus'>>
) {
  const updated: StoredOrderRecord = {
    ...order,
    ...status,
    updatedAt: new Date().toISOString(),
  }
  await savePaidOrder(updated)
  return updated
}

export async function deliverPaidOrderEmails(orderNumber: string) {
  const lockAcquired = await acquireOrderEmailLock(orderNumber)
  if (!lockAcquired) {
    return {
      processing: true,
      internalEmailStatus: 'pending' as const,
      customerEmailStatus: 'pending' as const,
    }
  }

  try {
    let order = await getStoredOrder(orderNumber)
    if (!order) throw new Error('Stored order was not found.')

    if (order.internalEmailStatus !== 'sent') {
      try {
        await sendPaidOrderEmail(toInternalEmail(order))
        order = await saveStatus(order, { internalEmailStatus: 'sent' })
      } catch (error) {
        await saveStatus(order, { internalEmailStatus: 'failed' }).catch(() => undefined)
        throw error
      }
    }

    if (order.customerEmailStatus !== 'sent') {
      const recipient = customerEmail(order)
      if (!validEmail(recipient)) {
        order = await saveStatus(order, { customerEmailStatus: 'failed' })
      } else {
        try {
          await sendCustomerOrderConfirmation(order)
          order = await saveStatus(order, { customerEmailStatus: 'sent' })
        } catch (error) {
          await saveStatus(order, { customerEmailStatus: 'failed' }).catch(() => undefined)
          throw error
        }
      }
    }

    return {
      processing: false,
      internalEmailStatus: order.internalEmailStatus,
      customerEmailStatus: order.customerEmailStatus,
    }
  } finally {
    await releaseOrderEmailLock(orderNumber).catch(() => undefined)
  }
}
