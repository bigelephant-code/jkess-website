import type { LangCode } from '@/i18n/config'

type MessageOverrides = Partial<Record<LangCode, Record<string, string>>>

export const messageOverrides: MessageOverrides = {
  de: {
    'cart.shippingNote':
      'Kostenloser Standardversand in die EU; 150 US-Dollar pro Bestellung in unterstützte Regionen; für andere Länder ist ein Versandangebot erforderlich.',
    'checkout.shippingNote':
      'Kostenloser Standardversand in die EU; 150 US-Dollar pro Bestellung in unterstützte Regionen; für andere Länder ist ein Versandangebot erforderlich.',
    'checkout.paymentFailed':
      'Die Zahlung ist fehlgeschlagen. Bitte versuchen Sie es erneut oder kontaktieren Sie zhou@jkess.com.',
    'checkout.orderNumber': 'JKESS-Bestellnummer',
    'checkout.paypalOrderId': 'PayPal-Bestell-ID',
    'checkout.paypalRecorded':
      'Produkte, Versandkosten, Mengen, Betrag und Bestellreferenzen wurden automatisch in PayPal erfasst.',
    'checkout.deliveryCountry': 'Lieferland / Lieferregion *',
    'checkout.selectDeliveryCountry': 'Lieferland / Lieferregion auswählen',
    'checkout.otherCountryQuoteRequired': 'Anderes Land / andere Region — Angebot erforderlich',
    'checkout.euFreeShipping':
      'Für diese Lieferadresse in der EU ist der Standardversand kostenlos enthalten.',
    'checkout.flatRateShipping':
      'Für dieses Ziel wird einmal pro Bestellung eine feste Versandgebühr von {amount} US-Dollar hinzugefügt.',
    'checkout.quoteOnlyShipping':
      'Für dieses Ziel ist der direkte Online-Checkout nicht verfügbar, da Versand-, Import- oder Transportbedingungen einzeln geprüft werden müssen. Bitte fordern Sie ein Angebot mit schriftlichen Bedingungen an.',
    'checkout.paypalCountryMatch':
      'Das hier ausgewählte Land muss mit dem Lieferland in PayPal übereinstimmen. Einfuhrzölle, Steuern, Zollabfertigung und Gebühren am Zielort sind nicht enthalten, sofern sie nicht schriftlich bestätigt wurden.',
    'checkout.orderLabel': 'Bestellung',
    'checkout.productSubtotal': 'Produkt-Zwischensumme',
    'checkout.shipping': 'Versand',
    'checkout.free': 'KOSTENLOS',
    'checkout.quoteRequired': 'Angebot erforderlich',
    'checkout.selectCountry': 'Land auswählen',
    'checkout.orderTotal': 'Gesamtsumme',
    'checkout.shippingSummary':
      'EU-Adressen erhalten kostenlosen Standardversand. Für unterstützte Ziele außerhalb der EU werden einmal pro Bestellung {amount} US-Dollar berechnet. Für andere Ziele ist ein schriftliches Angebot erforderlich.',
    'checkout.policyConsentStart': 'Ich stimme den folgenden Richtlinien zu:',
    'checkout.policyConsentEnd': 'Zusätzlich bestätige ich die',
    'checkout.termsOfSale': 'Verkaufsbedingungen',
    'checkout.shippingPolicy': 'Versandrichtlinie',
    'checkout.returnsPolicy': 'Rückgabe- und Erstattungsrichtlinie',
    'checkout.warrantyPolicy': 'Garantierichtlinie',
    'checkout.safetyNotice': 'Sicherheitshinweise',
    'checkout.privacyPolicy': 'Datenschutzrichtlinie',
    'checkout.selectCountryToContinue':
      'Wählen Sie das Lieferland aus, um die Versandkosten zu berechnen und fortzufahren.',
    'checkout.separateQuoteTitle': 'Für dieses Ziel ist ein separates Angebot erforderlich.',
    'checkout.separateQuoteBody':
      'Der direkte Checkout ist aufgrund zielortspezifischer Versand- und lokaler Richtlinien deaktiviert.',
    'checkout.getQuote': 'Angebot anfordern',
    'checkout.acceptPolicies':
      'Bitte prüfen und akzeptieren Sie vor der Zahlung die Bestellrichtlinien.',
    'checkout.checkingInventory': 'Aktueller Lagerbestand wird geprüft…',
    'product.freeShipping': 'Kostenloser EU-Standardversand',
    'product.checkingStock': 'Lagerbestand wird geprüft…',
    'product.outOfStock': 'Nicht auf Lager',
    'product.unitsInStock': '{count} Stück auf Lager',
    'product.discountOff': '-{discount}% RABATT',
    'product.promoPriceNote':
      'Der angezeigte Preis ist der aktuelle Aktionspreis nach {discount}% Rabatt.',
    'product.shippingRuleDetail':
      'Lieferadressen in der EU erhalten kostenlosen Standardversand. Unterstützte Ziele außerhalb der EU werden mit 150 US-Dollar pro Bestellung berechnet. Für andere Länder ist vor der Online-Zahlung ein Versandangebot erforderlich. Einfuhrzölle, Steuern, Zollabfertigungs- und Maklergebühren sind nicht enthalten, sofern sie nicht ausdrücklich angegeben sind.',
    'product.shippingQuoteBeforePayment': 'Vor der Zahlung ein Versandangebot anfordern',
    'product.sharedInventoryNote':
      'Der Lagerbestand wird von allen Optionen dieses Produkts gemeinsam genutzt und nach bestätigter Zahlung abgezogen.',
    'product.availableToAdd': '{count} zum Hinzufügen verfügbar',
    'product.decreaseQuantity': 'Menge verringern',
    'product.increaseQuantity': 'Menge erhöhen',
    'product.stockInCart': 'Verfügbarer Bestand bereits im Warenkorb',
    'product.item': 'Artikel',
    'product.items': 'Artikel',
    'product.customQuoteResponse':
      'Für dieses Produkt ist ein individuelles Angebot erforderlich. JKESS antwortet normalerweise innerhalb von 24 Geschäftsstunden.',
    'product.shippingSummary': 'EU kostenlos; unterstützte Regionen 150 US-Dollar pro Bestellung',
    'product.returnsSubjectToPolicy': 'Rückgabe gemäß Richtlinie',
    'product.packageScope': 'Lieferumfang',
    'product.whatsIncluded': 'Im Lieferumfang enthalten',
    'product.whatsNotIncluded': 'Nicht im Lieferumfang enthalten',
    'product.applications': 'Anwendungen',
    'product.compatibleSystems': 'Kompatible Systeme',
    'product.selectionNotes': 'Auswahlhinweise',
    'product.projectFit': 'Projekteignung',
    'product.selectionGuidance': 'Auswahlhilfe für {name}',
    'product.installationNotes': 'Installationshinweise',
    'product.procurementNotes': 'Beschaffungshinweise',
    'product.buyerNotes': 'Hinweise für Käufer',
    'product.configureForProject': '{name} für Ihr Projekt konfigurieren',
    'product.buyerNotesBody':
      'Teilen Sie Zielspannung, Kapazität, Wechselrichter- oder PCS-Modell, Installationsumgebung und erwartete Bestellmenge mit, damit JKESS vor der Produktion die passende Konfiguration bestätigen kann.',
    'product.requestQuote': 'Angebot anfordern',
    'product.requestQuoteText': 'Konfigurationsunterstützung und Preisangabe erhalten.',
    'product.checkDocuments': 'Dokumente prüfen',
    'product.checkDocumentsText': 'Handbücher und Datenblätter ansehen.',
    'product.readInsights': 'Fachbeiträge lesen',
    'product.readInsightsText': 'Aktuelle Informationen zu BMS und Energiespeichern verfolgen.',
    'product.faqTitle': 'Häufig gestellte Fragen',
    'product.technicalDownloads': 'Technische Downloads',
    'product.technicalDownloadsText': 'Datenblätter, Handbücher und Produktunterlagen.',
    'product.industryInsights': 'Branchenwissen',
    'product.industryInsightsText': 'Neuigkeiten zu Batteriespeichern und BMS-Technologie.',
    'product.projectInquiry': 'Projektanfrage',
    'product.projectInquiryText': 'Konfigurationsunterstützung oder ein Angebot anfordern.',
    'product.relatedProducts': 'Ähnliche Produkte',
  },
  fr: {
    'cart.shippingNote':
      'Livraison standard gratuite dans l’UE ; 150 $ US par commande vers les destinations prises en charge ; devis requis pour les autres pays.',
    'checkout.subtotal': 'Sous-total ({count} {items})',
    'checkout.shippingNote':
      'Livraison standard gratuite dans l’UE ; 150 $ US par commande vers les destinations prises en charge ; devis requis pour les autres pays.',
    'checkout.proceedToCheckout': 'Passer au paiement',
    'checkout.paymentFailed':
      'Le paiement a échoué. Veuillez réessayer ou contacter zhou@jkess.com.',
    'checkout.orderNumber': 'Numéro de commande JKESS',
    'checkout.paypalOrderId': 'Identifiant de commande PayPal',
    'checkout.paypalRecorded':
      'Les produits, les frais de livraison, les quantités, le montant et les références de commande ont été enregistrés automatiquement dans PayPal.',
    'checkout.deliveryCountry': 'Pays / région de livraison *',
    'checkout.selectDeliveryCountry': 'Sélectionner le pays / la région de livraison',
    'checkout.otherCountryQuoteRequired': 'Autre pays / région — devis requis',
    'checkout.euFreeShipping':
      'La livraison standard est incluse gratuitement pour cette adresse de livraison dans l’UE.',
    'checkout.flatRateShipping':
      'Des frais de livraison fixes de {amount} $ US seront ajoutés une seule fois par commande pour cette destination.',
    'checkout.quoteOnlyShipping':
      'Le paiement direct en ligne n’est pas disponible pour cette destination, car les conditions de livraison, d’importation ou du transporteur doivent être examinées individuellement. Veuillez demander un devis pour connaître la disponibilité et les conditions écrites.',
    'checkout.paypalCountryMatch':
      'Le pays sélectionné ici doit correspondre au pays de livraison indiqué dans PayPal. Les droits d’importation, taxes, frais de dédouanement et frais de traitement à destination ne sont pas inclus, sauf confirmation écrite.',
    'checkout.orderLabel': 'Commande',
    'checkout.productSubtotal': 'Sous-total des produits',
    'checkout.shipping': 'Livraison',
    'checkout.free': 'GRATUITE',
    'checkout.quoteRequired': 'Devis requis',
    'checkout.selectCountry': 'Sélectionner un pays',
    'checkout.orderTotal': 'Total de la commande',
    'checkout.shippingSummary':
      'Les adresses de l’UE bénéficient de la livraison standard gratuite. Les destinations admissibles hors UE sont facturées {amount} $ US une seule fois par commande. Les autres destinations nécessitent un devis écrit.',
    'checkout.policyConsentStart': 'J’accepte les politiques suivantes :',
    'checkout.policyConsentEnd': 'Je reconnais également la',
    'checkout.termsOfSale': 'Conditions de vente',
    'checkout.shippingPolicy': 'Politique de livraison',
    'checkout.returnsPolicy': 'Politique de retour et de remboursement',
    'checkout.warrantyPolicy': 'Politique de garantie',
    'checkout.safetyNotice': 'Avis de sécurité',
    'checkout.privacyPolicy': 'Politique de confidentialité',
    'checkout.selectCountryToContinue':
      'Sélectionnez le pays de livraison pour calculer les frais de livraison et continuer.',
    'checkout.separateQuoteTitle': 'Cette destination nécessite un devis séparé.',
    'checkout.separateQuoteBody':
      'Le paiement direct est désactivé en raison des exigences de livraison et des règles locales propres à la destination.',
    'checkout.getQuote': 'Demander un devis',
    'checkout.acceptPolicies':
      'Veuillez consulter et accepter les politiques de commande avant le paiement.',
    'checkout.checkingInventory': 'Vérification du stock actuel…',
    'product.freeShipping': 'Livraison standard gratuite dans l’UE',
    'product.checkingStock': 'Vérification du stock…',
    'product.outOfStock': 'Rupture de stock',
    'product.unitsInStock': '{count} unités en stock',
    'product.discountOff': '-{discount}% DE REMISE',
    'product.promoPriceNote':
      'Le prix affiché est le prix promotionnel actuel après une remise de {discount}%.',
    'product.shippingRuleDetail':
      'Les adresses de livraison dans l’UE bénéficient de la livraison standard gratuite. Les destinations prises en charge hors UE ajoutent 150 $ US par commande. Les autres pays nécessitent un devis de livraison avant le paiement en ligne. Les droits d’importation, taxes, frais de dédouanement et frais de courtage ne sont pas inclus, sauf mention expresse.',
    'product.shippingQuoteBeforePayment': 'Demander un devis de livraison avant le paiement',
    'product.sharedInventoryNote':
      'Le stock est partagé entre les différentes options de ce produit et est déduit après confirmation du paiement.',
    'product.availableToAdd': '{count} disponibles à ajouter',
    'product.decreaseQuantity': 'Réduire la quantité',
    'product.increaseQuantity': 'Augmenter la quantité',
    'product.stockInCart': 'Stock disponible déjà dans le panier',
    'product.item': 'article',
    'product.items': 'articles',
    'product.customQuoteResponse':
      'Ce produit nécessite un devis personnalisé. JKESS répond généralement sous 24 heures ouvrées.',
    'product.shippingSummary': 'UE gratuite ; régions prises en charge 150 $ US par commande',
    'product.returnsSubjectToPolicy': 'Retours soumis à la politique',
    'product.packageScope': 'Contenu du kit',
    'product.whatsIncluded': 'Éléments inclus',
    'product.whatsNotIncluded': 'Éléments non inclus',
    'product.applications': 'Applications',
    'product.compatibleSystems': 'Systèmes compatibles',
    'product.selectionNotes': 'Conseils de sélection',
    'product.projectFit': 'Adéquation au projet',
    'product.selectionGuidance': 'Guide de sélection pour {name}',
    'product.installationNotes': 'Conseils d’installation',
    'product.procurementNotes': 'Conseils d’achat',
    'product.buyerNotes': 'Informations pour l’acheteur',
    'product.configureForProject': 'Configurer {name} pour votre projet',
    'product.buyerNotesBody':
      'Indiquez la tension cible, la capacité, le modèle d’onduleur ou de PCS, l’environnement d’installation et la quantité prévue afin que JKESS puisse confirmer la configuration appropriée avant la production.',
    'product.requestQuote': 'Demander un devis',
    'product.requestQuoteText': 'Obtenir une aide à la configuration et un prix.',
    'product.checkDocuments': 'Consulter les documents',
    'product.checkDocumentsText': 'Examiner les manuels et les fiches techniques.',
    'product.readInsights': 'Lire les analyses',
    'product.readInsightsText': 'Suivre les actualités des BMS et du stockage d’énergie.',
    'product.faqTitle': 'Questions fréquentes',
    'product.technicalDownloads': 'Téléchargements techniques',
    'product.technicalDownloadsText': 'Fiches techniques, manuels et ressources produit.',
    'product.industryInsights': 'Actualités du secteur',
    'product.industryInsightsText': 'Évolutions du stockage par batterie et de la technologie BMS.',
    'product.projectInquiry': 'Demande de projet',
    'product.projectInquiryText': 'Demander une aide à la configuration ou un devis.',
    'product.relatedProducts': 'Produits associés',
  },
}
