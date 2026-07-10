import { products } from '@/lib/products'
import { absoluteUrl, siteUrl } from '@/lib/site'
import { merchantAvailability, productVariantCommerce } from '@/lib/commerce'
import { INITIAL_INVENTORY, isManagedInventorySlug } from '@/lib/inventory-catalog'

function escapeXml(value: string | number) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function productMpn(product: (typeof products)[number], variant: ReturnType<typeof productVariantCommerce>[number]) {
  const model = product.specs.find((spec) => spec.key.toLowerCase().includes('model'))?.value
  return model ? `${model}-${variant.index + 1}` : variant.sku
}

function productWeightKg(product: (typeof products)[number]) {
  const weight = product.specs.find((spec) => spec.key.toLowerCase().includes('weight'))?.value
  const match = weight?.match(/(\d+(?:\.\d+)?)/)
  return match ? `${match[1]} kg` : null
}

function productDetails(product: (typeof products)[number]) {
  return product.specs.slice(0, 12).map((spec) => `
      <g:product_detail>
        <g:section_name>Technical specifications</g:section_name>
        <g:attribute_name>${escapeXml(spec.key)}</g:attribute_name>
        <g:attribute_value>${escapeXml(spec.value)}</g:attribute_value>
      </g:product_detail>`).join('')
}

function feedItem(product: (typeof products)[number], variant: ReturnType<typeof productVariantCommerce>[number]) {
  const productUrl = absoluteUrl(`/products/${product.slug}`)
  const stock = isManagedInventorySlug(product.slug) ? INITIAL_INVENTORY[product.slug] : 100
  const title = `${product.name} - ${variant.label}`
  const image = product.images[0] ? absoluteUrl(product.images[0]) : absoluteUrl('/images/jkess-logo.png')
  const weight = productWeightKg(product)

  return `
    <item>
      <g:id>${escapeXml(variant.sku)}</g:id>
      <g:title>${escapeXml(title)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      <g:image_link>${escapeXml(image)}</g:image_link>
      <g:brand>JKESS</g:brand>
      <g:mpn>${escapeXml(productMpn(product, variant))}</g:mpn>
      <g:item_group_id>${escapeXml(product.slug)}</g:item_group_id>
      <g:condition>new</g:condition>
      <g:adult>no</g:adult>
      <g:availability>${merchantAvailability(stock)}</g:availability>
      <g:price>${variant.salePrice.toFixed(2)} USD</g:price>
      <g:sale_price>${variant.salePrice.toFixed(2)} USD</g:sale_price>
      <g:google_product_category>Electronics &gt; Power &gt; Power Storage</g:google_product_category>
      <g:product_type>${escapeXml(product.categoryLabel)}</g:product_type>
      <g:custom_label_0>${escapeXml(product.categoryLabel)}</g:custom_label_0>
      <g:custom_label_1>${escapeXml(variant.label)}</g:custom_label_1>
      ${weight ? `<g:shipping_weight>${escapeXml(weight)}</g:shipping_weight>` : ''}
      ${productDetails(product)}
      <g:shipping>
        <g:country>DE</g:country>
        <g:service>EU standard shipping</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>FR</g:country>
        <g:service>EU standard shipping</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>ES</g:country>
        <g:service>EU standard shipping</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>IT</g:country>
        <g:service>EU standard shipping</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>NL</g:country>
        <g:service>EU standard shipping</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>PL</g:country>
        <g:service>EU standard shipping</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
    </item>`
}

export function GET() {
  const items = products
    .filter((product) => product.type === 'shop')
    .flatMap((product) => productVariantCommerce(product).map((variant) => feedItem(product, variant)))
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>JKESS direct checkout products</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>JKESS battery enclosure kits and high-voltage BMS control hardware available for direct checkout in supported destinations.</description>
    ${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
