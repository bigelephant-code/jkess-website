export const INITIAL_INVENTORY = {
  'battery-kit': 672,
  '6u-battery-kit': 790,
  'high-voltage-kit': 985,
} as const

export type ManagedInventorySlug = keyof typeof INITIAL_INVENTORY
export type InventorySnapshot = Record<ManagedInventorySlug, number>

export const managedInventorySlugs = Object.keys(INITIAL_INVENTORY) as ManagedInventorySlug[]

export function isManagedInventorySlug(value: string): value is ManagedInventorySlug {
  return value in INITIAL_INVENTORY
}

export function inventorySlugFromSku(sku: string): ManagedInventorySlug | null {
  return managedInventorySlugs.find((slug) => sku === slug || sku.startsWith(`${slug}-`)) || null
}

export function normalizedInventory(value: unknown, fallback: number) {
  const parsed = typeof value === 'number' ? value : Number.parseInt(String(value), 10)
  return Number.isFinite(parsed) ? Math.max(0, Math.floor(parsed)) : fallback
}
