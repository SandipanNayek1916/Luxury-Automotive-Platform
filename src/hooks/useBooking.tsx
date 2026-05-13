'use client'

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  ReactNode,
} from 'react'
import {
  BookingState,
  BookingStep,
  BookingContextType,
  DateRange,
  AddonId,
  ADDONS,
} from '@/types/booking'

// ─── Initial state ─────────────────────────────────────────────────────────
const initialState: BookingState = {
  step: 1,
  dates: { pickup: null, return: null },
  pickupTime: '10:00 AM',
  returnTime: '12:00 PM',
  collectionPoint: 'Manhattan Showroom',
  returnPoint: 'Same as pickup',
  selectedAddons: new Set(),
  days: 0,
  paymentIntentId: null,
  reservationRef: null,
}

// ─── Action types ──────────────────────────────────────────────────────────
type Action =
  | { type: 'SET_STEP'; payload: BookingStep }
  | { type: 'SET_DATES'; payload: DateRange }
  | { type: 'SET_PICKUP_TIME'; payload: string }
  | { type: 'SET_RETURN_TIME'; payload: string }
  | { type: 'SET_COLLECTION_POINT'; payload: string }
  | { type: 'SET_RETURN_POINT'; payload: string }
  | { type: 'TOGGLE_ADDON'; payload: AddonId['id'] }
  | { type: 'SET_PAYMENT_INTENT'; payload: string }
  | { type: 'SET_RESERVATION_REF'; payload: string }

// ─── Reducer ───────────────────────────────────────────────────────────────
function bookingReducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.payload }

    case 'SET_DATES': {
      const { pickup, return: ret } = action.payload
      const days =
        pickup && ret
          ? Math.round((ret.getTime() - pickup.getTime()) / 86_400_000)
          : 0
      return { ...state, dates: action.payload, days }
    }

    case 'SET_PICKUP_TIME':
      return { ...state, pickupTime: action.payload }

    case 'SET_RETURN_TIME':
      return { ...state, returnTime: action.payload }

    case 'SET_COLLECTION_POINT':
      return { ...state, collectionPoint: action.payload }

    case 'SET_RETURN_POINT':
      return { ...state, returnPoint: action.payload }

    case 'TOGGLE_ADDON': {
      const next = new Set(state.selectedAddons)
      next.has(action.payload) ? next.delete(action.payload) : next.add(action.payload)
      return { ...state, selectedAddons: next }
    }

    case 'SET_PAYMENT_INTENT':
      return { ...state, paymentIntentId: action.payload }

    case 'SET_RESERVATION_REF':
      return { ...state, reservationRef: action.payload }

    default:
      return state
  }
}

// ─── Context ───────────────────────────────────────────────────────────────
const BookingContext = createContext<BookingContextType | null>(null)

export function BookingProvider({
  children,
  dailyRate,
}: {
  children: ReactNode
  dailyRate: number
}) {
  const [state, dispatch] = useReducer(bookingReducer, initialState)

  const baseTotal = state.days * dailyRate

  const addonTotal = useMemo(() => {
    return ADDONS.filter((a) => state.selectedAddons.has(a.id)).reduce((sum, a) => {
      const days = a.unit === 'day' ? state.days : 1
      return sum + a.price * days
    }, 0)
  }, [state.selectedAddons, state.days])

  const totalPrice = baseTotal + addonTotal

  const value: BookingContextType = useMemo(() => ({
    state,
    setStep: (step: BookingStep) => dispatch({ type: 'SET_STEP', payload: step }),
    setDates: (dates: DateRange) => dispatch({ type: 'SET_DATES', payload: dates }),
    setPickupTime: (t: string) => dispatch({ type: 'SET_PICKUP_TIME', payload: t }),
    setReturnTime: (t: string) => dispatch({ type: 'SET_RETURN_TIME', payload: t }),
    setCollectionPoint: (p: string) => dispatch({ type: 'SET_COLLECTION_POINT', payload: p }),
    setReturnPoint: (p: string) => dispatch({ type: 'SET_RETURN_POINT', payload: p }),
    toggleAddon: (id: AddonId['id']) => dispatch({ type: 'TOGGLE_ADDON', payload: id }),
    setPaymentIntent: (id: string) => dispatch({ type: 'SET_PAYMENT_INTENT', payload: id }),
    setReservationRef: (ref: string) => dispatch({ type: 'SET_RESERVATION_REF', payload: ref }),
    totalPrice,
    addonTotal,
    baseTotal,
  }), [state, totalPrice, addonTotal, baseTotal])

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

// ─── Hook ──────────────────────────────────────────────────────────────────
export function useBooking(): BookingContextType {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
