'use client'

import { useState, useEffect } from 'react'
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from '@stripe/react-stripe-js'
import { useBooking } from '@/hooks/useBooking'
import { getStripe } from '@/lib/stripe'

import { useSession } from 'next-auth/react'

// ─── Inner form (must be inside <Elements>) ───────────────────────────────
function PaymentForm({ carId }: { carId: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const { data: session } = useSession()
  const { state, setStep, setReservationRef, totalPrice } = useBooking()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!stripe || !elements || !session) return
    setLoading(true)
    setError(null)

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message ?? 'Payment failed.')
      setLoading(false)
      return
    }

    // Confirm payment — redirect_url takes user back after 3DS
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking/confirmed`,
        payment_method_data: {
          billing_details: {
            name: session.user.name || '',
            email: session.user.email || '',
          }
        }
      },
      redirect: 'if_required',
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed.')
      setLoading(false)
      return
    }

    // No redirect needed — payment authorised
    const ref = `UNQ-${Date.now().toString().slice(-8).toUpperCase()}`
    setReservationRef(ref)
    setStep(4)
    setLoading(false)
  }

  return (
    <div className="panel">
      <div className="panel-title">
        Secure <em>payment</em>
      </div>
      <div className="panel-sub">
        Your data is encrypted end-to-end and never stored on our servers
      </div>

      <div className="stripe-element-wrap">
        <PaymentElement
          options={{
            layout: 'tabs',
            wallets: { applePay: 'auto', googlePay: 'auto' },
          }}
        />
      </div>

      {error && (
        <div className="payment-error" role="alert">
          {error}
        </div>
      )}

      <div className="btn-row" style={{ marginTop: '28px' }}>
        <button className="btn-ghost" onClick={() => setStep(2)} disabled={loading}>
          ← Back
        </button>
        <button
          className={`btn-primary ${loading ? 'loading' : ''}`}
          onClick={handleSubmit}
          disabled={!stripe || loading}
          style={{ flex: 1, maxWidth: 320 }}
        >
          {loading
            ? 'Processing…'
            : `Confirm reservation — $${totalPrice.toLocaleString()}`}
        </button>
      </div>
    </div>
  )
}

// ─── Outer wrapper — fetches clientSecret, mounts Elements ────────────────
export function StepPayment({ carId }: { carId: string }) {
  const { data: session } = useSession()
  const { totalPrice, state, setStep, setPaymentIntent } = useBooking()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    if (totalPrice <= 0 || !session) return

    const controller = new AbortController()

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: totalPrice,
        carId,
        customerEmail: session.user.email,
        metadata: {
          userId: session.user.id,
          pickupDate: state.dates.pickup?.toISOString(),
          returnDate: state.dates.return?.toISOString(),
          collectionPoint: state.collectionPoint,
          dropLocation: state.returnPoint,
          addons: [...state.selectedAddons].join(','),
          days: state.days,
          totalPrice: totalPrice.toString(),
        },
      }),
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then(({ clientSecret, paymentIntentId, error }) => {
        if (error) throw new Error(error)
        setClientSecret(clientSecret)
        setPaymentIntent(paymentIntentId)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setFetchError(err.message)
      })

    return () => controller.abort()
  }, [totalPrice, carId, session, state.dates.pickup, state.dates.return, state.collectionPoint, state.returnPoint, state.selectedAddons, state.days, setPaymentIntent])

  if (fetchError) {
    return (
      <div className="panel">
        <p className="payment-error">
          Could not initialise payment: {fetchError}
        </p>
        <button className="btn-ghost" onClick={() => setStep(2)}>← Back</button>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="panel">
        <div className="stripe-loading">
          <div className="stripe-spinner" />
          <p>Preparing secure checkout…</p>
        </div>
      </div>
    )
  }

  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: {
          theme: 'night',
          variables: {
            colorPrimary: '#C4A862',
            colorBackground: '#141414',
            colorText: '#F0EDE6',
            colorDanger: '#E24B4A',
            fontFamily: 'Geist, Helvetica Neue, sans-serif',
            borderRadius: '3px',
            spacingUnit: '4px',
          },
          rules: {
            '.Input': {
              border: '1px solid rgba(240,237,230,0.14)',
              backgroundColor: '#1C1C1C',
            },
            '.Input:focus': {
              border: '1px solid #9A7E44',
              boxShadow: 'none',
            },
            '.Label': {
              color: '#7A7672',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            },
          },
        },
      }}
    >
      <PaymentForm carId={carId} />
    </Elements>
  )
}
