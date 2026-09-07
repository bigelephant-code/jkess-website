export type QuotationBankAccount = {
  id: string
  label: string
  beneficiary: string
  bankName: string
  accountNumber: string
  swiftCode?: string
  bankAddress?: string
  routingNumber?: string
  currency?: string
  notes?: string
}

// Bank details intentionally remain empty until the verified account information
// is supplied. Add each account here and it will become selectable in the builder.
export const quotationBankAccounts: readonly QuotationBankAccount[] = []
