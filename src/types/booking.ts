export type BookingStep = 1 | 2 | 3 | 4

export interface DateRange {
  pickup: Date | null
  return: Date | null
}

export interface AddonId {
  id: 'chauffeur' | 'insurance' | 'delivery' | 'detailing' | 'fuel' | 'track'
}

export interface Addon {
  id: AddonId['id']
  name: string
  description: string
  icon: string
  price: number
  unit: 'day' | 'flat' | 'session'
}

export interface BookingState {
  step: BookingStep
  dates: DateRange
  pickupTime: string
  returnTime: string
  collectionPoint: string
  returnPoint: string
  selectedAddons: Set<AddonId['id']>
  days: number
  paymentIntentId: string | null
  reservationRef: string | null
}

export interface BookingContextType {
  state: BookingState
  setStep: (step: BookingStep) => void
  setDates: (dates: DateRange) => void
  setPickupTime: (t: string) => void
  setReturnTime: (t: string) => void
  setCollectionPoint: (p: string) => void
  setReturnPoint: (p: string) => void
  toggleAddon: (id: AddonId['id']) => void
  setPaymentIntent: (id: string) => void
  setReservationRef: (ref: string) => void
  totalPrice: number
  addonTotal: number
  baseTotal: number
}

export interface CarListing {
  id: string
  name: string
  brand: string
  category: string
  dailyRate: number
  specs: string
  image: string
  depositAmount: number
}

export const ADDONS: Addon[] = [
  {
    id: 'chauffeur',
    name: 'Private Chauffeur',
    description: 'Professional uniformed driver with knowledge of preferred routes and discretion protocols.',
    icon: '🧑‍✈️',
    price: 280,
    unit: 'day',
  },
  {
    id: 'insurance',
    name: 'Elite Protection Plan',
    description: 'Full comprehensive coverage with zero excess. Includes 24/7 roadside assistance and replacement vehicle.',
    icon: '🛡️',
    price: 95,
    unit: 'day',
  },
  {
    id: 'delivery',
    name: 'White-Glove Delivery',
    description: 'Vehicle delivered and collected from any Manhattan address. Includes pre-arrival inspection report.',
    icon: '📍',
    price: 180,
    unit: 'flat',
  },
  {
    id: 'detailing',
    name: 'Detailing Package',
    description: 'Ceramic spray coat, interior perfuming, and bespoke floormats. Returned showroom-ready.',
    icon: '✨',
    price: 140,
    unit: 'flat',
  },
  {
    id: 'fuel',
    name: 'Pre-Paid Fuel',
    description: 'Return the vehicle at any fuel level. No premium fuel surcharges or refuelling fees.',
    icon: '⛽',
    price: 60,
    unit: 'flat',
  },
  {
    id: 'track',
    name: 'Track Day Session',
    description: 'One guided track session at Monticello Motor Club. Includes instructor and timing system access.',
    icon: '🏁',
    price: 350,
    unit: 'session',
  },
]

export const COLLECTION_POINTS = [
  'Manhattan Showroom',
  'JFK International Airport',
  'Hotel delivery (custom)',
  'Private residence',
] as const

export const RETURN_POINTS = [
  'Same as pickup',
  'Manhattan Showroom',
  'JFK International Airport',
] as const

export const PICKUP_TIMES = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM',
]

export const RETURN_TIMES = [
  '10:00 AM', '12:00 PM', '02:00 PM',
  '04:00 PM', '06:00 PM', '08:00 PM',
]
