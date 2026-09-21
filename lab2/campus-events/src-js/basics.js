function formatEventTitle(title, category) {
  return `Подія: ${title} (${category})`;
}

function isRegistrationOpen(seatsLeft) {
  return seatsLeft > 0;
}

function printEventSummary(title, seatsLeft) {
  const isOpen = isRegistrationOpen(seatsLeft);
  console.log(`${title} — ${isOpen ? 'Реєстрація відкрита' : 'Місць немає'}`);
}

module.exports = { formatEventTitle, isRegistrationOpen, printEventSummary };