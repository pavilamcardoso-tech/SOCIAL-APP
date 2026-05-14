'use client'

function formatPtBR(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  if (seconds < 60) return 'agora'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `há ${minutes} min`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `há ${hours} h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `há ${days} d`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `há ${weeks} sem`
  const months = Math.floor(days / 30)
  if (months < 12) return `há ${months} mês${months > 1 ? 'es' : ''}`
  const years = Math.floor(days / 365)
  return `há ${years} ano${years > 1 ? 's' : ''}`
}

export default function TimeAgo({ date, className = '' }) {
  return (
    <time dateTime={date} className={`text-xs text-neutral-500 ${className}`}>
      {formatPtBR(date)}
    </time>
  )
}
