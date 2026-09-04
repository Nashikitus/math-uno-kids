import { NextResponse } from 'next/server'

const CHECKOUT_URL = 'https://api.checkout.infinitepay.io/links'
const REDIRECT_URL = 'https://acesso-checkin-reverso.lovable.app'
const WEBHOOK_URL = 'https://checkin-reverso.vercel.app/api/webhooks/infinitepay'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const tracking = body?.tracking && typeof body.tracking === 'object' ? body.tracking : {}
    const orderNsu = new URLSearchParams(
      Object.entries(tracking).filter(([, value]) => typeof value === 'string' && value.length > 0) as [string, string][],
    ).toString()

    const response = await fetch(CHECKOUT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        handle: 'ana-shop',
        items: [{ quantity: 1, price: 3700, description: 'Check-in Reverso' }],
        order_nsu: orderNsu || `checkin-${Date.now()}`,
        redirect_url: REDIRECT_URL,
        webhook_url: WEBHOOK_URL,
      }),
      cache: 'no-store',
    })

    const data = await response.json()
    if (!response.ok) return NextResponse.json({ error: 'Não foi possível criar o checkout.' }, { status: 502 })
    return NextResponse.json({ url: data.url || data.checkout_url || data.link })
  } catch {
    return NextResponse.json({ error: 'Não foi possível criar o checkout.' }, { status: 500 })
  }
}
