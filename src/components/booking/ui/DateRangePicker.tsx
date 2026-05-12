'use client'

import { useState, useCallback } from 'react'
import { DateRange } from '@/types/booking'

interface DateRangePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [calYear, setCalYear] = useState(today.getFullYear())
  const [calMonth, setCalMonth] = useState(today.getMonth())
  const [selecting, setSelecting] = useState<'pickup' | 'return'>('pickup')

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) }
    else setCalMonth(m => m + 1)
  }

  const handleDayClick = useCallback((date: Date) => {
    if (date < today) return

    if (selecting === 'pickup' || (value.pickup && value.return)) {
      onChange({ pickup: date, return: null })
      setSelecting('return')
    } else {
      const pickup = value.pickup!
      if (date <= pickup) {
        onChange({ pickup: date, return: pickup })
      } else {
        onChange({ pickup, return: date })
      }
      setSelecting('pickup')
    }
  }, [selecting, value, onChange, today])

  const firstDay = new Date(calYear, calMonth, 1).getDay()
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()

  const getDayClass = (date: Date, isPast: boolean): string => {
    const base = 'cal-day'
    if (isPast) return `${base} past`
    if (value.pickup && isSameDay(date, value.pickup)) return `${base} start`
    if (value.return && isSameDay(date, value.return)) return `${base} end`
    if (value.pickup && value.return && date > value.pickup && date < value.return) return `${base} in-range`
    if (isSameDay(date, today)) return `${base} today`
    return base
  }

  const days = value.pickup && value.return
    ? Math.round((value.return.getTime() - value.pickup.getTime()) / 86_400_000)
    : 0

  return (
    <div className="calendar-wrap">
      <div className="cal-header">
        <button className="cal-nav" onClick={prevMonth} aria-label="Previous month">‹</button>
        <div className="cal-month">{MONTHS[calMonth]} {calYear}</div>
        <button className="cal-nav" onClick={nextMonth} aria-label="Next month">›</button>
      </div>

      <div className="cal-weekdays">
        {WEEKDAYS.map(d => (
          <div key={d} className="cal-wd">{d}</div>
        ))}
      </div>

      <div className="cal-days">
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className="cal-day empty" />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const d = i + 1
          const date = new Date(calYear, calMonth, d)
          const isPast = date < today
          return (
            <div
              key={d}
              className={getDayClass(date, isPast)}
              onClick={() => !isPast && handleDayClick(date)}
              role={isPast ? undefined : 'button'}
              aria-label={isPast ? undefined : date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            >
              {d}
            </div>
          )
        })}
      </div>

      <div className="cal-footer">
        {days > 0 ? (
          <div className="duration-badge">
            <span>●</span>
            <span>{days} {days === 1 ? 'day' : 'days'} selected</span>
          </div>
        ) : (
          <p className="cal-hint">
            {selecting === 'pickup' ? 'Click to select pickup date' : 'Now select your return date'}
          </p>
        )}
      </div>
    </div>
  )
}
