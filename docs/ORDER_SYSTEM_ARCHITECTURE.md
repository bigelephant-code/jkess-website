# JKESS Order System Architecture

This document describes the production order workflow implemented in the website.

## Components

- **Order database:** a private Sanity dataset configured with `SANITY_ORDERS_DATASET`.
- **Server-side payment:** Next.js Route Handlers create and capture PayPal Orders v2 transactions.
- **Price validation:** the server resolves every product and variant against `src/lib/products.ts`; prices sent by the browser are ignored.
- **Automatic email:** Resend REST API sends customer confirmations, internal order notifications, and shipment updates.
- **Order administration:** `/admin/orders` provides a password-protected order list and fulfillment editor.
- **Customer tracking:** customers can check payment and shipment status with their order number and email address.
- **Payment recovery:** a verified PayPal webhook reconciles completed, denied, and refunded captures.

## Required production environment variables

```bash
NEXT_PUBLIC_PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_ID=
PAYPAL_CLIENT_SECRET=
PAYPAL_ENVIRONMENT=live
PAYPAL_WEBHOOK_ID=

NEXT_PUBLIC_SANITY_PROJECT_ID=
SANITY_ORDERS_DATASET=orders
SANITY_ORDERS_TOKEN=

RESEND_API_KEY=
ORDER_EMAIL_FROM="JKESS Orders <orders@jkess.com>"
ORDER_NOTIFICATION_EMAIL=zhou@jkess.com

ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
```

`SANITY_ORDERS_DATASET` must be a **private** dataset. Do not store customer order data in a public content dataset.

## PayPal webhook URL

Configure this URL in the PayPal developer dashboard:

```text
https://www.jkesstech.com/api/paypal/webhook
```

Subscribe to at least:

- `PAYMENT.CAPTURE.COMPLETED`
- `PAYMENT.CAPTURE.DENIED`
- `PAYMENT.CAPTURE.REFUNDED`

Copy the webhook ID into `PAYPAL_WEBHOOK_ID`.

## Admin access

After setting `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`, open:

```text
https://www.jkesstech.com/admin/login
```

The admin can update order status, carrier, tracking number, tracking URL, and fulfillment notes. Changing an order to `SHIPPED` or `DELIVERED` sends the corresponding customer email when Resend is configured.

## Order lifecycle

```text
PENDING_PAYMENT
  -> PAID
  -> PROCESSING
  -> READY_TO_SHIP
  -> SHIPPED
  -> DELIVERED
```

Exceptional states:

```text
PAYMENT_FAILED
CANCELLED
REFUNDED
```
