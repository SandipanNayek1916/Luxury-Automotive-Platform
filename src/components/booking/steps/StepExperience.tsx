'use client'

import { useBooking } from '@/hooks/useBooking'
import { AddonCard } from '../ui/AddonCard'
import { ADDONS } from '@/types/booking'

export function StepExperience() {
  const { setStep } = useBooking()

  return (
    <div className="panel">
      <div className="panel-title">
        Elevate your <em>experience</em>
      </div>
      <div className="panel-sub">Every detail, precisely arranged</div>

      <div className="addons-grid">
        {ADDONS.map((addon) => (
          <AddonCard key={addon.id} addon={addon} />
        ))}
      </div>

      <div className="btn-row">
        <button className="btn-ghost" onClick={() => setStep(1)}>← Back</button>
        <button className="btn-primary" onClick={() => setStep(3)}>
          Continue to payment →
        </button>
      </div>
    </div>
  )
}
