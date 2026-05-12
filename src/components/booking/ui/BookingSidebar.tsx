'use client'

import Image from 'next/image'
import { useBooking } from '@/hooks/useBooking'
import { ADDONS, CarListing } from '@/types/booking'

interface BookingSidebarProps {
  car: CarListing
}

function fmt(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function BookingSidebar({ car }: BookingSidebarProps) {
  const { state, totalPrice, baseTotal, addonTotal } = useBooking()
  const { dates, days, selectedAddons, collectionPoint } = state

  const activeAddons = ADDONS.filter((a) => selectedAddons.has(a.id))

  return (
    <aside className="sidebar">
      <div className="sb-car-image">
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="380px"
          className="sb-car-img"
          priority
        />
      </div>

      <div className="sb-badge">{car.category}</div>
      <div className="sb-car-name">{car.brand}<br />{car.name.replace(car.brand, '').trim()}</div>
      <div className="sb-car-cat">{car.specs}</div>

      <div className="sb-divider" />

      <div className="sb-row">
        <span className="k">Daily rate</span>
        <span className="v">${car.dailyRate.toLocaleString()} / day</span>
      </div>

      {dates.pickup && dates.return && (
        <>
          <div className="sb-row">
            <span className="k">Dates</span>
            <span className="v">{fmt(dates.pickup)} – {fmt(dates.return)}</span>
          </div>
          <div className="sb-row">
            <span className="k">Duration</span>
            <span className="v">{days} {days === 1 ? 'day' : 'days'}</span>
          </div>
          <div className="sb-row">
            <span className="k">Base total</span>
            <span className="v">${baseTotal.toLocaleString()}</span>
          </div>
        </>
      )}

      <div className="sb-row">
        <span className="k">Collection</span>
        <span className="v">{collectionPoint}</span>
      </div>

      {activeAddons.length > 0 && (
        <>
          <div className="sb-divider" />
          <div className="sb-section-label">Add-ons</div>
          {activeAddons.map((addon) => {
            const addonDays = addon.unit === 'day' ? days : 1
            return (
              <div className="sb-row" key={addon.id}>
                <span className="k">{addon.name}</span>
                <span className="v">${(addon.price * addonDays).toLocaleString()}</span>
              </div>
            )
          })}
        </>
      )}

      <div className="sb-divider" style={{ marginTop: 'auto' }} />

      <div className="sb-total-row">
        <span className="sb-total-lbl">Estimated total</span>
        <span className="sb-total-val">
          {totalPrice > 0 ? `$${totalPrice.toLocaleString()}` : '—'}
        </span>
      </div>

      <p className="sb-note">
        Inclusive of all taxes and fees. Security deposit of $
        {car.depositAmount.toLocaleString()} held on card and released
        within 5 business days of return.
      </p>
    </aside>
  )
}
