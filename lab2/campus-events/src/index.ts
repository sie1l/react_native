import { events, getOpenEvents } from './events';
import { Attendee } from './attendee';
import { calculateRegistration } from './pricing';

console.log('--- Відкриті події ---');
for (const event of getOpenEvents(events)) {
  console.log(event.title);
}

console.log('\n--- Реєстрація учасника ---');
const student = new Attendee('st-01', 'Соломія');
console.log('Реєстрація на ev-1:', student.register('ev-1'));
console.log('Реєстрація на ev-4:', student.register('ev-4'));
console.log('Повторна реєстрація на ev-1:', student.register('ev-1'));

console.log('\n--- Розрахунок вартості ---');
const receipt = calculateRegistration(events, ['ev-1', 'ev-4'], 10);
console.log(receipt);