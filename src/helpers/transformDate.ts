export function transformDate(value: string): string {
  const [day, month, year] = value.split('/').map(Number);

  const normalizedYear = year < 100 ? 2000 + year : year;

  const date = new Date(normalizedYear, month - 1, day);

  if (isNaN(date.getTime())) {
    throw new Error('La fecha ingresada es invalida');
  }

  return date.toISOString();
}
