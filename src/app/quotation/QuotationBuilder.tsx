'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import {
  Building2,
  FileText,
  Plus,
  Printer,
  RotateCcw,
  ShieldCheck,
  Trash2,
} from 'lucide-react'
import {
  quotationBankAccounts,
  type QuotationBankAccount,
} from '@/lib/quotation-bank-accounts'
import styles from './quotation.module.css'

type CurrencyPreset = 'USD' | 'CNY' | 'CUSTOM'

const INCOTERMS = ['DDP', 'EXW', 'FOB', 'CIF', 'CFR', 'CPT', 'CIP', 'DAP', 'DPU', 'FCA'] as const

const BANK_ACCOUNT_GROUPS = Array.from(new Set(quotationBankAccounts.map((account) => account.group)))

type QuoteItem = {
  id: string
  model: string
  quantity: string
  unitPrice: string
}

type QuoteDraft = {
  quoteNumber: string
  issueDate: string
  validUntil: string
  customerCompany: string
  contactName: string
  phone: string
  email: string
  address: string
  currency: CurrencyPreset
  customCurrencyCode: string
  customCurrencySymbol: string
  items: QuoteItem[]
  shippingFee: string
  shippingMethod: string
  bankAccountId: string
  notes: string
}

const EMPTY_ITEM: QuoteItem = {
  id: 'item-1',
  model: '',
  quantity: '1',
  unitPrice: '',
}

const INITIAL_DRAFT: QuoteDraft = {
  quoteNumber: '',
  issueDate: '',
  validUntil: '',
  customerCompany: '',
  contactName: '',
  phone: '',
  email: '',
  address: '',
  currency: 'USD',
  customCurrencyCode: '',
  customCurrencySymbol: '',
  items: [EMPTY_ITEM],
  shippingFee: '0',
  shippingMethod: '',
  bankAccountId: '',
  notes: '',
}

function isoDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function datedDefaults() {
  const today = new Date()
  const validUntil = new Date(today)
  validUntil.setDate(validUntil.getDate() + 15)
  const stamp = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('')
  const suffix = String(today.getTime()).slice(-4)
  return {
    issueDate: isoDate(today),
    validUntil: isoDate(validUntil),
    quoteNumber: `JKESS-Q-${stamp}-${suffix}`,
  }
}

function numberValue(value: string) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0
}

function nonNegativeValue(value: string) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0
}

function currencyDetails(draft: QuoteDraft) {
  if (draft.currency === 'USD') return { code: 'USD', symbol: '$' }
  if (draft.currency === 'CNY') return { code: 'CNY', symbol: '¥' }
  return {
    code: draft.customCurrencyCode.trim().toUpperCase() || 'CUR',
    symbol: draft.customCurrencySymbol.trim(),
  }
}

function formatAmount(amount: number, draft: QuoteDraft) {
  const { code, symbol } = currencyDetails(draft)

  if (draft.currency !== 'CUSTOM') {
    return new Intl.NumberFormat(draft.currency === 'CNY' ? 'zh-CN' : 'en-US', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
  return `${symbol}${formatted} ${code}`.trim()
}

function displayDate(value: string) {
  if (!value) return '—'
  const parts = value.split('-')
  return parts.length === 3 ? `${parts[0]}-${parts[1]}-${parts[2]}` : value
}

export default function QuotationBuilder({
  initialDates,
}: {
  initialDates: Pick<QuoteDraft, 'quoteNumber' | 'issueDate' | 'validUntil'>
}) {
  const [draft, setDraft] = useState<QuoteDraft>(() => ({ ...INITIAL_DRAFT, ...initialDates }))

  const lineTotals = useMemo(
    () => draft.items.map((item) => numberValue(item.quantity) * nonNegativeValue(item.unitPrice)),
    [draft.items]
  )
  const subtotal = lineTotals.reduce((sum, amount) => sum + amount, 0)
  const shipping = nonNegativeValue(draft.shippingFee)
  const total = subtotal + shipping
  const selectedBank = quotationBankAccounts.find((account) => account.id === draft.bankAccountId)

  const updateDraft = <Key extends keyof QuoteDraft>(key: Key, value: QuoteDraft[Key]) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  const updateItem = (id: string, patch: Partial<QuoteItem>) => {
    updateDraft(
      'items',
      draft.items.map((item) => (item.id === id ? { ...item, ...patch } : item))
    )
  }

  const addItem = () => {
    updateDraft('items', [
      ...draft.items,
      { id: `item-${Date.now()}`, model: '', quantity: '1', unitPrice: '' },
    ])
  }

  const removeItem = (id: string) => {
    if (draft.items.length === 1) {
      updateItem(id, { model: '', quantity: '1', unitPrice: '' })
      return
    }
    updateDraft('items', draft.items.filter((item) => item.id !== id))
  }

  const resetDraft = () => {
    if (!window.confirm('确定清空当前填写的报价信息吗？')) return
    setDraft({ ...INITIAL_DRAFT, items: [{ ...EMPTY_ITEM }], ...datedDefaults() })
  }

  return (
    <main className={styles.shell}>
      <header className={`${styles.toolbar} ${styles.noPrint}`}>
        <div className={styles.brandLockup}>
          <div className={styles.logoFrame}>
            <Image src="/images/jkess-logo-cropped.png" alt="JKESS" width={190} height={72} priority />
          </div>
          <div>
            <p className={styles.eyebrow}>Standalone quotation workspace</p>
            <h1>JKESS 报价单工具</h1>
            <p>客户资料只在当前浏览器页面中处理，不会提交到服务器。</p>
          </div>
        </div>
        <div className={styles.toolbarActions}>
          <button type="button" className={styles.secondaryButton} onClick={resetDraft}>
            <RotateCcw size={17} /> 清空
          </button>
          <button type="button" className={styles.primaryButton} onClick={() => window.print()}>
            <Printer size={17} /> 打印 / 保存 PDF
          </button>
        </div>
      </header>

      <div className={styles.workspace}>
        <section className={`${styles.editor} ${styles.noPrint}`} aria-label="报价信息输入">
          <EditorSection icon={<FileText size={18} />} title="报价信息" subtitle="Quotation details">
            <div className={styles.twoColumns}>
              <Field label="报价单号" value={draft.quoteNumber} onChange={(value) => updateDraft('quoteNumber', value)} />
              <Field label="报价日期" type="date" value={draft.issueDate} onChange={(value) => updateDraft('issueDate', value)} />
              <Field label="有效期至" type="date" value={draft.validUntil} onChange={(value) => updateDraft('validUntil', value)} />
              <label className={styles.field}>
                <span>币种</span>
                <select value={draft.currency} onChange={(event) => updateDraft('currency', event.target.value as CurrencyPreset)}>
                  <option value="USD">美元 USD</option>
                  <option value="CNY">人民币 CNY</option>
                  <option value="CUSTOM">自定义币种</option>
                </select>
              </label>
              {draft.currency === 'CUSTOM' && (
                <>
                  <Field label="币种代码" value={draft.customCurrencyCode} placeholder="例如 EUR" maxLength={8} onChange={(value) => updateDraft('customCurrencyCode', value)} />
                  <Field label="币种符号" value={draft.customCurrencySymbol} placeholder="例如 €" maxLength={6} onChange={(value) => updateDraft('customCurrencySymbol', value)} />
                </>
              )}
            </div>
          </EditorSection>

          <EditorSection icon={<Building2 size={18} />} title="客户信息" subtitle="Customer information">
            <div className={styles.twoColumns}>
              <Field label="客户/公司名称" value={draft.customerCompany} onChange={(value) => updateDraft('customerCompany', value)} />
              <Field label="联系人" value={draft.contactName} onChange={(value) => updateDraft('contactName', value)} />
              <Field label="联系电话" value={draft.phone} onChange={(value) => updateDraft('phone', value)} />
              <Field label="邮箱" type="email" value={draft.email} onChange={(value) => updateDraft('email', value)} />
              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span>完整地址</span>
                <textarea rows={3} value={draft.address} onChange={(event) => updateDraft('address', event.target.value)} placeholder="街道、门牌号、城市、邮编、国家" />
              </label>
            </div>
          </EditorSection>

          <EditorSection icon={<Plus size={18} />} title="产品与价格" subtitle="Products and pricing">
            <div className={styles.itemList}>
              {draft.items.map((item, index) => (
                <div className={styles.itemEditor} key={item.id}>
                  <div className={styles.itemEditorHeader}>
                    <strong>产品 {index + 1}</strong>
                    <button type="button" className={styles.iconButton} onClick={() => removeItem(item.id)} aria-label={`删除产品 ${index + 1}`}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <Field label="商品型号 / 描述" value={item.model} onChange={(value) => updateItem(item.id, { model: value })} />
                  <div className={styles.twoColumns}>
                    <Field label="数量" type="number" min="0" step="1" value={item.quantity} onChange={(value) => updateItem(item.id, { quantity: value })} />
                    <Field label="单价" type="number" min="0" step="0.01" value={item.unitPrice} onChange={(value) => updateItem(item.id, { unitPrice: value })} />
                  </div>
                  <p className={styles.lineAmount}>本行金额：<strong>{formatAmount(lineTotals[index], draft)}</strong></p>
                </div>
              ))}
            </div>
            <button type="button" className={styles.addButton} onClick={addItem}>
              <Plus size={17} /> 添加一行产品
            </button>
            <div className={`${styles.twoColumns} ${styles.shippingFields}`}>
              <Field label="运费（可填 0）" type="number" min="0" step="0.01" value={draft.shippingFee} onChange={(value) => updateDraft('shippingFee', value)} />
              <label className={styles.field}>
                <span>运输方式 / Incoterm</span>
                <select value={draft.shippingMethod} onChange={(event) => updateDraft('shippingMethod', event.target.value)}>
                  <option value="">请选择</option>
                  {INCOTERMS.map((term) => <option value={term} key={term}>{term}</option>)}
                </select>
              </label>
            </div>
          </EditorSection>

          <EditorSection icon={<ShieldCheck size={18} />} title="收款信息" subtitle="Bank details">
            <label className={styles.field}>
              <span>选择收款账户</span>
              <select
                value={draft.bankAccountId}
                disabled={quotationBankAccounts.length === 0}
                onChange={(event) => updateDraft('bankAccountId', event.target.value)}
              >
                <option value="">{quotationBankAccounts.length ? '请选择账户' : '银行账户资料待补充'}</option>
                {BANK_ACCOUNT_GROUPS.map((group) => (
                  <optgroup label={group} key={group}>
                    {quotationBankAccounts
                      .filter((account) => account.group === group)
                      .map((account) => (
                        <option value={account.id} key={account.id}>{account.label}</option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <p className={styles.bankHint}>
              {selectedBank?.internalHint || '请按收款主体、币种和付款地区选择账户，并在出具报价前再次核对。'}
            </p>
            <label className={styles.field}>
              <span>补充说明 / 条款</span>
              <textarea rows={4} value={draft.notes} onChange={(event) => updateDraft('notes', event.target.value)} placeholder="付款条件、交期、报价范围或其他备注" />
            </label>
          </EditorSection>
        </section>

        <QuotationPreview
          draft={draft}
          lineTotals={lineTotals}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          selectedBank={selectedBank}
        />
      </div>
    </main>
  )
}

function EditorSection({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section className={styles.editorSection}>
      <div className={styles.sectionTitle}>
        <span>{icon}</span>
        <div><h2>{title}</h2><p>{subtitle}</p></div>
      </div>
      {children}
    </section>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  min,
  step,
  maxLength,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  min?: string
  step?: string
  maxLength?: number
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input
        type={type}
        value={value}
        min={min}
        step={step}
        maxLength={maxLength}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function QuotationPreview({
  draft,
  lineTotals,
  subtotal,
  shipping,
  total,
  selectedBank,
}: {
  draft: QuoteDraft
  lineTotals: number[]
  subtotal: number
  shipping: number
  total: number
  selectedBank?: QuotationBankAccount
}) {
  const currency = currencyDetails(draft)

  return (
    <section className={styles.previewWrap} aria-label="报价单预览">
      <div className={styles.previewLabel}>实时预览 · PRINT PREVIEW</div>
      <article className={styles.paper}>
        <header className={styles.quoteHeader}>
          <div>
            <Image src="/images/jkess-logo-cropped.png" alt="JKESS" width={225} height={85} className={styles.quoteLogo} />
            <p>Energy Storage Solutions</p>
          </div>
          <div className={styles.quoteHeading}>
            <h2>QUOTATION</h2>
            <p>报价单</p>
          </div>
        </header>

        <div className={styles.rule} />

        <div className={styles.quoteMeta}>
          <section>
            <p className={styles.blockLabel}>QUOTATION TO</p>
            <h3>{draft.customerCompany || 'Customer / Company'}</h3>
            <p>{draft.contactName || 'Contact name'}</p>
            <p>{draft.phone || 'Phone'}</p>
            <p>{draft.email || 'Email'}</p>
            <p className={styles.preserveLines}>{draft.address || 'Customer address'}</p>
          </section>
          <dl>
            <div><dt>Quotation No.</dt><dd>{draft.quoteNumber || '—'}</dd></div>
            <div><dt>Date</dt><dd>{displayDate(draft.issueDate)}</dd></div>
            <div><dt>Valid Until</dt><dd>{displayDate(draft.validUntil)}</dd></div>
            <div><dt>Currency</dt><dd>{currency.code}</dd></div>
          </dl>
        </div>

        <div className={styles.tableScroll}>
          <table className={styles.quoteTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>MODEL / DESCRIPTION</th>
                <th>QTY</th>
                <th>UNIT PRICE</th>
                <th>AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {draft.items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.model || '—'}</td>
                  <td>{item.quantity || '0'}</td>
                  <td>{formatAmount(nonNegativeValue(item.unitPrice), draft)}</td>
                  <td>{formatAmount(lineTotals[index], draft)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.summaryArea}>
          <section className={styles.shippingBlock}>
            <p className={styles.blockLabel}>SHIPPING</p>
            <p><strong>Method:</strong> {draft.shippingMethod || '—'}</p>
          </section>
          <dl className={styles.totals}>
            <div><dt>Subtotal</dt><dd>{formatAmount(subtotal, draft)}</dd></div>
            <div><dt>Shipping</dt><dd>{formatAmount(shipping, draft)}</dd></div>
            <div className={styles.grandTotal}><dt>TOTAL</dt><dd>{formatAmount(total, draft)}</dd></div>
          </dl>
        </div>

        <section className={styles.bankBlock}>
          <p className={styles.blockLabel}>BANK INFORMATION</p>
          {selectedBank ? <BankAccountDetails account={selectedBank} /> : (
            <p className={styles.pendingBank}>Verified bank account details will appear here after an account is selected.</p>
          )}
        </section>

        {draft.notes && (
          <section className={styles.notesBlock}>
            <p className={styles.blockLabel}>NOTES / TERMS</p>
            <p className={styles.preserveLines}>{draft.notes}</p>
          </section>
        )}

        <footer className={styles.quoteFooter}>
          <div>
            <strong>JKESS</strong>
            <span>JKBMS Electronic Technology Co.,Ltd</span>
          </div>
        </footer>
      </article>
    </section>
  )
}

function BankAccountDetails({ account }: { account: QuotationBankAccount }) {
  const rows = [
    ['Beneficiary', account.beneficiary],
    ['Beneficiary address', account.beneficiaryAddress],
    ['Bank name', account.bankName],
    ['Account number', account.accountNumber],
    ['IBAN', account.iban],
    ['SWIFT / BIC', account.swiftCode],
    ['Routing number', account.routingNumber],
    ['CNAPS code', account.cnapsCode],
    ['Sort code', account.sortCode],
    ['Bank code', account.bankCode],
    ['Branch code', account.branchCode],
    ['Bank address', account.bankAddress],
    ['Bank country / region', account.bankCountry],
    ['Account type', account.accountType],
    ['Payment method', account.paymentMethod],
    ['Account currency', account.currency],
  ].filter((row): row is [string, string] => Boolean(row[1]))

  return (
    <div className={styles.bankGrid}>
      {rows.map(([label, value]) => (
        <div key={label}><span>{label}</span><strong>{value}</strong></div>
      ))}
      {account.notes && <p className={`${styles.preserveLines} ${styles.bankNotes}`}>{account.notes}</p>}
    </div>
  )
}
