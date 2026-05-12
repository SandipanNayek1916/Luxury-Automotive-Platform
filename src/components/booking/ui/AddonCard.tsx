'use client'

import { Addon } from '@/types/booking'
import { useBooking } from '@/hooks/useBooking'

interface AddonCardProps {
  addon: Addon
}

export function AddonCard({ addon }: AddonCardProps) {
  const { state, toggleAddon } = useBooking()
  const isSelected = state.selectedAddons.has(addon.id)
  const days = state.days

  const displayPrice =
    addon.unit === 'day'
      ? `$${addon.price} / day${days > 1 ? ` ($${addon.price * days} total)` : ''}`
      : `$${addon.price} ${addon.unit}`

  return (
    <div
      className={`addon-card ${isSelected ? 'selected' : ''}`}
      onClick={() => toggleAddon(addon.id)}
      role="checkbox"
      aria-checked={isSelected}
      aria-label={`${addon.name} — ${displayPrice}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleAddon(addon.id)
        }
      }}
    >
      {isSelected && (
        <div className="addon-check" aria-hidden="true">✓</div>
      )}
      <span className="addon-icon" aria-hidden="true">{addon.icon}</span>
      <div className="addon-name">{addon.name}</div>
      <div className="addon-desc">{addon.description}</div>
      <div className="addon-price">
        ${addon.price}{' '}
        <span>/ {addon.unit}</span>
      </div>
    </div>
  )
}
