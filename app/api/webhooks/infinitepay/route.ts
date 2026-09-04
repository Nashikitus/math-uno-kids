import { NextResponse } from 'next/server'

const UTMIFY_URL = 'https://api.utmify.com.br/api-credentials/orders'
const TRACKING_KEYS = ['src', 'sck', 'utm_source', 'utm_campaign', 'utm_medium', 'utm_content', 'utm_term'] as const

function formatUtc(date: Date) {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}

export async function POST(request: Request) {
  try {
    const payload = await request.json()
    const params = new URLSearchParams(payload.order_nsu || '')
    const trackingParameters = Object.fromEntries(TRACKING_KEYS.map((key) => [key, params.get(key) || null]))
    const createdAt = formatUtc(new Date())
    const approvedDate = createdAt
    const priceInCents = Number(payload.amount || payload.paid_amount || 3700)
    const paymentMethod = payload.capture_method === 'credit_card' ? 'credit_card' : 'pix'

    if (process.env.UTMIFY_API_KEY) {
      await fetch(UTMIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-token': process.env.UTMIFY_API_KEY },
        body: JSON.stringify({
          orderId: payload.order_nsu || payload.transaction_nsu,
          platform: 'InfinitePay',
          paymentMethod,
          status: 'paid',
          createdAt,
          approvedDate,
          refundedAt: null,
          customer: { name: 'Cliente', email: 'cliente@checkout.local', phone: null, document: null, country: 'BR' },
          products: [{ id: 'checkin-reverso', name: 'Check-in Reverso', planId: null, planName: null, quantity: 1, priceInCents }],
          trackingParameters,
          commission: { totalPriceInCents: priceInCents, gatewayFeeInCents: 0, userCommissionInCents: priceInCents, currency: 'BRL' },
        }),
      })
    }

    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json({ received: false }, { status: 400 })
  }
}
