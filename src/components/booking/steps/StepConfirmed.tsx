'use client'

import { useBooking } from '@/hooks/useBooking'
import { ADDONS, CarListing } from '@/types/booking'

function fmt(d: Date) {
  return d.toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

export function StepConfirmed({ car }: { car: CarListing }) {
  const { state, totalPrice } = useBooking()
  const { dates, collectionPoint, selectedAddons, reservationRef } = state

  const activeAddons = ADDONS.filter((a) => selectedAddons.has(a.id))

  return (
    <div className="panel">
      <div className="confirm-wrap">
        <div className="confirm-icon" aria-hidden="true">✦</div>

        <div className="confirm-ref">
          Reservation #{reservationRef ?? 'UNQ-PENDING'}
        </div>

        <h1 className="confirm-title">
          {"You're all set,"}<br />
          <em>welcome aboard.</em>
        </h1>

        <p className="confirm-sub">
          A confirmation has been dispatched to your registered email.
          Your dedicated concierge will contact you within 30 minutes.
        </p>

        <div className="confirm-details">
          <div className="confirm-row">
            <span className="lbl">Vehicle</span>
            <span className="val">{car.brand} {car.name}</span>
          </div>

          {dates.pickup && dates.return && (
            <div className="confirm-row">
              <span className="lbl">Dates</span>
              <span className="val">{fmt(dates.pickup)} – {fmt(dates.return)}</span>
            </div>
          )}

          <div className="confirm-row">
            <span className="lbl">Collection</span>
            <span className="val">{collectionPoint}</span>
          </div>

          {activeAddons.length > 0 && (
            <div className="confirm-row">
              <span className="lbl">Add-ons</span>
              <span className="val">{activeAddons.map((a) => a.name).join(', ')}</span>
            </div>
          )}

          <div className="confirm-row">
            <span className="lbl">Total charged</span>
            <span className="val total">
              {totalPrice > 0 ? `$${totalPrice.toLocaleString()}` : 'To be confirmed'}
            </span>
          </div>
        </div>

        <div className="confirm-actions">
          <button className="btn-outline">Download itinerary</button>
          <a href="/cars" className="btn-outline">Browse more cars</a>
        </div>
      </div>
    </div>
  )
}
