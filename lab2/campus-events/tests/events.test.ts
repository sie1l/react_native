import { describe, expect, test } from '@jest/globals';
import { events, getOpenEvents, getEventsByCategory, findEventById, getEventTitles } from '../src/events';
import { Attendee } from '../src/attendee';

describe('Модуль подій', () => {
  test('getOpenEvents не повертає подію з нульовою кількістю місць', () => {
    const openEvents = getOpenEvents(events);
    expect(openEvents.every((e) => e.seatsLeft > 0)).toBe(true);
  });

  test('getEventsByCategory повертає лише потрібну категорію', () => {
    const workshops = getEventsByCategory(events, 'workshop');
    expect(workshops.every((e) => e.category === 'workshop')).toBe(true);
  });

  test('findEventById повертає undefined для невідомого ID', () => {
    expect(findEventById(events, 'invalid-id')).toBeUndefined();
  });

  test('getEventTitles повертає масив рядків із назвами', () => {
    const titles = getEventTitles(events);
    expect(titles.length).toBeGreaterThan(0);
    expect(typeof titles[0]).toBe('string');
  });
});

describe('Клас Attendee', () => {
  test('Attendee.register додає новий ID', () => {
    const student = new Attendee('st-test', 'Тест');
    expect(student.register('ev-1')).toBe(true);
    expect(student.isRegisteredFor('ev-1')).toBe(true);
  });

  test('Attendee.register не додає той самий ID двічі', () => {
    const student = new Attendee('st-test', 'Тест');
    student.register('ev-1');
    expect(student.register('ev-1')).toBe(false);
  });
});