'use client'

import { useBooking } from '@/hooks/useBooking'
import { DateRangePicker } from '../ui/DateRangePicker'
import {
  COLLECTION_POINTS,
  RETURN_POINTS,
  PICKUP_TIMES,
  RETURN_TIMES,
} from '@/types/booking'

export function StepJourney() {
  const {
    state,
    setStep,
    setDates,
    setPickupTime,
    setReturnTime,
    setCollectionPoint,
    setReturnPoint,
  } = useBooking()

  const canContinue = state.dates.pickup !== null && state.dates.return !== null

  return (
    <div className="panel">
      <div className="panel-title">
        Plan your <em>journey</em>
      </div>
      <div className="panel-sub">Select your dates and collection preferences</div>

      <DateRangePicker value={state.dates} onChange={setDates} />

      <div className="date-grid">
        <div className="field-group">
          <label className="field-label" htmlFor="pickup-time">Pickup time</label>
          <select
            id="pickup-time"
            className="field-input"
            value={state.pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          >
            {PICKUP_TIMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="return-time">Return time</label>
          <select
            id="return-time"
            className="field-input"
            value={state.returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
          >
            {RETURN_TIMES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="location-row">
        <div className="field-group">
          <label className="field-label" htmlFor="collection-point">Collection point</label>
          <select
            id="collection-point"
            className="field-input"
            value={state.collectionPoint}
            onChange={(e) => setCollectionPoint(e.target.value)}
          >
            {COLLECTION_POINTS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="return-point">Return point</label>
          <select
            id="return-point"
            className="field-input"
            value={state.returnPoint}
            onChange={(e) => setReturnPoint(e.target.value)}
          >
            {RETURN_POINTS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="btn-row">
        <button
          className="btn-primary"
          onClick={() => setStep(2)}
          disabled={!canContinue}
          aria-disabled={!canContinue}
        >
          Continue to experience →
        </button>
      </div>
    </div>
  )
}
