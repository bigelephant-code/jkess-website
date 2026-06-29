import type { LangCode } from '@/i18n/config'

type MessageOverrides = Partial<Record<LangCode, Record<string, string>>>

export const messageOverrides: MessageOverrides = {
  de: {
    'cart.shippingNote':
      'Kostenloser Standardversand in die EU; 150 US-Dollar pro Bestellung in unterstützte Regionen; für andere Länder ist ein Versandangebot erforderlich.',
    'checkout.shippingNote':
      'Kostenloser Standardversand in die EU; 150 US-Dollar pro Bestellung in unterstützte Regionen; für andere Länder ist ein Versandangebot erforderlich.',
    'product.freeShipping': 'Kostenloser EU-Standardversand',
  },
  fr: {
    'cart.shippingNote':
      'Livraison standard gratuite dans l’UE ; 150 $ US par commande vers les destinations prises en charge ; devis requis pour les autres pays.',
    'checkout.subtotal': 'Sous-total ({count} {items})',
    'checkout.shippingNote':
      'Livraison standard gratuite dans l’UE ; 150 $ US par commande vers les destinations prises en charge ; devis requis pour les autres pays.',
    'checkout.proceedToCheckout': 'Passer au paiement',
    'product.freeShipping': 'Livraison standard gratuite dans l’UE',
  },
}
