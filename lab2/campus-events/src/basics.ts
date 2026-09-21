export function formatEventTitle(title: string, category: string): string {
  return `Подія: ${title} (${category})`;
}

export function isRegistrationOpen(seatsLeft: number): boolean {
  return seatsLeft > 0;
}

export function printEventSummary(title: string, seatsLeft: number): void {
  const isOpen = isRegistrationOpen(seatsLeft);
  console.log(`${title} — ${isOpen ? 'Реєстрація відкрита' : 'Місць немає'}`);
}