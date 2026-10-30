import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const requireDependency = createRequire(import.meta.url)
const cache = new Map()
function load(file) {
  const filename = path.join(root, file)
  if (cache.has(filename)) return cache.get(filename).exports
  const loadedModule = { exports: {} }
  cache.set(filename, loadedModule)
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const localRequire = (id) => id.startsWith('@/') ? load(`src/${id.slice(2)}.ts`) : requireDependency(id)
  vm.runInThisContext(`(function(require,module,exports){${source}\n})`, { filename })(localRequire, loadedModule, loadedModule.exports)
  return loadedModule.exports
}

const { products } = load('src/lib/products.ts')
const { productVariantCommerce } = load('src/lib/commerce.ts')
const { validateCheckoutPayload, CheckoutValidationError } = load('src/lib/paypal-checkout.ts')
const { getProductVariantCopy } = load('src/lib/product-variant-copy.ts')
const { locales } = load('src/i18n/config.ts')
const { getLocalizedProductPageContent } = load('src/lib/product-localizations.ts')
const customer = { name: 'Test Buyer', email: 'test@example.com', phone: '+49123456789', countryCode: 'DE', address: 'Test address' }
const payload = (slug, variant) => ({ orderNumber: 'JKESS-CCS-TEST123', customer, items: [{ slug, variant, quantity: 1 }] })

for (const [slug, prices] of [['battery-kit', [400, 300]], ['6u-battery-kit', [499, 280, 599]]]) {
  const product = products.find((entry) => entry.slug === slug)
  const ccs = product.variants.find((variant) => variant.label === 'CCS Version')
  assert.equal(product.variants.length, 3)
  const pending = slug === 'battery-kit'
  assert.equal(ccs.pricePending === true, pending)
  assert.equal(ccs.description, 'Kit + LCD + BMS + CCS')
  assert.equal(ccs.price, pending ? undefined : '$599.00')
  assert.deepEqual(productVariantCommerce(product).map((variant) => variant.salePrice), prices)
  assert.deepEqual(productVariantCommerce(product).map((variant) => variant.sku), prices.map((_, index) => `${slug}-${index + 1}`))
  if (pending) assert.throws(() => validateCheckoutPayload(payload(slug, ccs.label)), CheckoutValidationError)
  else {
    assert.equal(validateCheckoutPayload(payload(slug, ccs.label)).items[0].unitPriceCents, 59900)
    assert.equal(ccs.detailImages.length, 10)
    for (const image of ccs.detailImages) assert.ok(fs.existsSync(path.join(root, 'public', image)))
  }
  const oldVariant = product.variants[0]
  assert.equal(validateCheckoutPayload(payload(slug, oldVariant.label)).items[0].unitPriceCents, prices[0] * 100)
  // Even an accidentally populated price must not enable a pending variant.
  if (pending) {
    ccs.price = '$1.00'
    assert.equal(productVariantCommerce(product).length, 2)
    assert.throws(() => validateCheckoutPayload(payload(slug, ccs.label)), CheckoutValidationError)
    delete ccs.price
  }
  for (const { code } of locales) {
    const localized = getLocalizedProductPageContent(product, code).product
    assert.equal(localized.variants.find((variant) => variant.label === ccs.label).pricePending === true, pending)
    const copy = getProductVariantCopy(code)
    assert.ok(copy.pricePending)
    assert.ok(copy.ccsIncludes.endsWith(' + LCD + BMS + CCS'))
  }
}
assert.equal(productVariantCommerce(products.find((product) => product.slug === 'high-voltage-kit')).length, 4)
console.log('PASS: 6U CCS price and images, 26 locales, server checkout, and pending caster CCS exclusion.')
