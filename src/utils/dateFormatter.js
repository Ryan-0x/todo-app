export function formatDate(dateString) {
  if (!dateString) return 'N/A'

  const date = new Date(dateString)
  const gmt8Date = new Date(date.getTime() + 8 * 60 * 60 * 1000)

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Singapore',
  }).format(gmt8Date)
}