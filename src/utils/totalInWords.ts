const ones: string[] = ['zero', 'jeden', 'dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć']
const teens: string[] = ['dziesięć', 'jedenaście', 'dwanaście', 'trzynaście', 'czternaście', 'piętnaście', 'szesnaście', 'siedemnaście', 'osiemnaście', 'dziewiętnaście']
const tens: string[] = ['', '', 'dwadzieścia', 'trzydzieści', 'czterdzieści', 'pięćdziesiąt', 'sześćdziesiąt', 'siedemdziesiąt', 'osiemdziesiąt', 'dziewięćdziesiąt']
const hundreds: string[] = ['', 'sto', 'dwieście', 'trzysta', 'czterysta', 'pięćset', 'sześćset', 'siedemset', 'osiemset', 'dziewięćset']
const thousands: string[] = ['tysiąc', 'tysiące', 'tysięcy']

export function convertToWords(num: number): string {
  if (num < 10) return ones[num]
  if (num >= 10 && num < 20) return teens[num - 10]
  if (num < 100) return `${tens[Math.floor(num / 10)]} ${ones[num % 10]}`.trim()
  if (num < 1000) return `${hundreds[Math.floor(num / 100)]} ${convertToWords(num % 100)}`.trim()

  let remainder = num % 1000
  let thousandCount = Math.floor(num / 1000)
  let thousandWord = thousandCount === 1 ? thousands[0] : thousandCount < 5 ? thousands[1] : thousands[2]
  return `${convertToWords(thousandCount)} ${thousandWord} ${convertToWords(remainder)}`.trim()
}

// Helper to format the full amount in złotych and groszy
export function convertTotalToPolishWords(amount: number): string {
  const whole = Math.floor(amount)
  const fraction = Math.round((amount - whole) * 100) // Grosze (cents)

  const wholePart = convertToWords(whole)
  const fractionPart = fraction > 0 ? `${convertToWords(fraction)} groszy` : ''

  return `${wholePart} złotych ${fractionPart}`.trim()
}
