'use client'

import { useBooking } from '@/hooks/useBooking'
import { BookingStep } from '@/types/booking'

const STEPS: { id: BookingStep; label: string }[] = [
  { id: 1, label: 'Journey' },
  { id: 2, label: 'Experience' },
  { id: 3, label: 'Payment' },
  { id: 4, label: 'Confirmed' },
]

export function StepProgress() {
  const { state } = useBooking()
  const current = state.step

  return (
    <div className="progress-wrap">
      <div className="step-track" role="list" aria-label="Booking steps">
        {STEPS.map((step, idx) => {
          const isDone = current > step.id
          const isActive = current === step.id

          return (
            <div
              key={step.id}
              className={[
                'step-item',
                isActive ? 'active' : '',
                isDone ? 'done' : '',
              ].join(' ')}
              role="listitem"
              aria-current={isActive ? 'step' : undefined}
            >
              {idx > 0 && <div className="step-connector" aria-hidden="true" />}
              <div className="step-num" aria-hidden="true">
                {isDone ? '✓' : step.id}
              </div>
              <div className="step-label">{step.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
