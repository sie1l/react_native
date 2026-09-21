const { events, getOpenEvents } = require('./events');
const { Attendee } = require('./attendee');
const { calculateRegistration } = require('./pricing');

console.log('Відкриті події');
for (const event of getOpenEvents(events)) {
  console.log(event.title);
}

console.log('\nРеєстрація учасника');
const student = new Attendee('st-01', 'Соломія');
console.log('Реєстрація на ev-1:', student.register('ev-1'));
console.log('Реєстрація на ev-4:', student.register('ev-4'));
console.log('Повторна реєстрація на ev-1:', student.register('ev-1'));

console.log('\nРозрахунок вартості');
const receipt = calculateRegistration(events, ['ev-1', 'ev-4'], 10);
console.log(receipt);