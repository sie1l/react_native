const { findEventById } = require('./events');

function calculateRegistration(events, selectedIds, groupSize) {
  if (!Number.isInteger(groupSize) || groupSize < 1 || groupSize > 30) {
    throw new Error('Кількість учасників має бути цілим числом від 1 до 30');
  }

  let subtotal = 0;

  for (const id of selectedIds) {
    const event = findEventById(events, id);
    if (!event || event.seatsLeft === 0) {
      throw new Error(`Подію з ID ${id} не знайдено або місць немає`);
    }
    subtotal += event.price * groupSize;
  }

  let discountRate = 0;
  if (groupSize >= 5 && groupSize <= 9) discountRate = 0.05;
  else if (groupSize >= 10 && groupSize <= 30) discountRate = 0.10;

  const discount = subtotal * discountRate;
  const total = subtotal - discount;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2))
  };
}

module.exports = { calculateRegistration };