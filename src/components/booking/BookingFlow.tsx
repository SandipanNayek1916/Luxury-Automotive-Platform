'use client'

import { useBooking, BookingProvider } from '@/hooks/useBooking'
import { StepProgress } from './ui/StepProgress'
import { BookingSidebar } from './ui/BookingSidebar'
import { StepJourney } from './steps/StepJourney'
import { StepExperience } from './steps/StepExperience'
import { StepPayment } from './steps/StepPayment'
import { StepConfirmed } from './steps/StepConfirmed'
import { CarListing } from '@/types/booking'
import './booking.css'

// ─── Inner content (needs context) ────────────────────────────────────────
function BookingContent({ car }: { car: CarListing }) {
  const { state } = useBooking()

  return (
    <div className="booking-shell">
      <header className="topbar">
        <a href="/" className="logo">
          U<span>nique</span>
        </a>
        <div className="topbar-right">
          {car.brand} {car.name} — Reservation
        </div>
      </header>

      <div className="booking-layout">
        <main className="booking-main">
          <StepProgress />

          <div className="panels">
            {state.step === 1 && <StepJourney />}
            {state.step === 2 && <StepExperience />}
            {state.step === 3 && <StepPayment carId={car.id} />}
            {state.step === 4 && <StepConfirmed car={car} />}
          </div>
        </main>

        {state.step !== 4 && <BookingSidebar car={car} />}
      </div>
    </div>
  )
}

// ─── Public export — wraps with provider ──────────────────────────────────
export function BookingFlow({ car }: { car: CarListing }) {
  return (
    <BookingProvider dailyRate={car.dailyRate}>
      <BookingContent car={car} />
    </BookingProvider>
  )
}
