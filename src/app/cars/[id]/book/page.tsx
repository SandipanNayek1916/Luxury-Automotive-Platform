// app/cars/[id]/book/page.tsx
import { notFound } from 'next/navigation'
import { BookingFlow } from '@/components/booking/BookingFlow'
import { CarListing } from '@/types/booking'

import { prisma } from '@/lib/prisma'

async function getCar(id: string): Promise<CarListing | null> {
  const car = await prisma.car.findUnique({
    where: { id },
    include: {
      media: {
        where: { type: 'thumbnail', isPrimary: true }
      }
    }
  })

  if (!car) return null

  return {
    id: car.id,
    brand: car.brand,
    name: car.name,
    category: car.category,
    dailyRate: car.pricePerDay,
    specs: `${car.engine} · ${car.horsepower}hp · ${car.transmission}`,
    image: car.media[0]?.url || car.mainImage,
    depositAmount: Math.round(car.pricePerDay * 5), // Example deposit calculation
  }
}

interface BookingPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: BookingPageProps) {
  const car = await getCar(params.id)
  if (!car) return {}
  return {
    title: `Reserve ${car.brand} ${car.name} — Unique`,
    description: `Book the ${car.brand} ${car.name} from $${car.dailyRate.toLocaleString()} per day.`,
  }
}

export default async function BookingPage({ params }: BookingPageProps) {
  const car = await getCar(params.id)
  if (!car) notFound()

  return <BookingFlow car={car} />
}
