# Shared order management

JKESS orders are mirrored into https://www.jkbms.net/admin/orders under the
JKESS source filter. Keep the existing JKBMS administrator credentials.

Redis order history, inventory deduction and JKESS payment emails are preserved.
The central hub does not duplicate JKESS payment notifications. Shipment email
from the hub uses JKESS branding. No customer consent data is invented.

The create route files a signed draft before exposing the PayPal order ID.
The capture route sends a verified payment update. Persisted Redis drafts and
historical paid orders are reconciled through `/api/order-hub/reconcile`, which
requires a fresh HMAC signature with the independent JKESS integration key.
The JKBMS server invokes it every five minutes and verifies historical PayPal
payment references and totals before import. Customer email is not used to
link external orders to JKBMS accounts.

Production environment: `JKBMS_ORDER_HUB_URL`, `JKBMS_ORDER_HUB_SECRET`,
`JKBMS_ORDER_HUB_REQUIRED=true`. The secret is server-only.
Use the shared admin for fulfillment; PayPal trackers for external stores
remain a manual operation in the correct merchant dashboard.

Verification: `scripts/verify-order-hub.ts` mocks network calls and never charges
a card. Deploy the shared hub before activating this source integration.
