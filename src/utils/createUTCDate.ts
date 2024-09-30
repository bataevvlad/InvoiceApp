export const createUTCDate = (dateString: string): Date | null => {
  if (!dateString) return null
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}
