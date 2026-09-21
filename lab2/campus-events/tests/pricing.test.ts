import { describe, expect, test } from '@jest/globals';
import { events } from '../src/events';
import { calculateRegistration } from '../src/pricing';

describe('Розрахунок вартості', () => {
  test('calculateRegistration правильно рахує суму без знижки', () => {
    const result = calculateRegistration(events, ['ev-1'], 2);
    expect(result.subtotal).toBe(200);
    expect(result.discount).toBe(0);
    expect(result.total).toBe(200);
  });

  test('calculateRegistration застосовує 10% знижку для групи з 10 людей', () => {
    const result = calculateRegistration(events, ['ev-1'], 10);
    expect(result.subtotal).toBe(1000);
    expect(result.discount).toBe(100);
    expect(result.total).toBe(900);
  });

  test('кидає помилку, якщо події не існує або немає місць', () => {
    expect(() => calculateRegistration(events, ['unknown-id'], 1)).toThrow('не знайдено або місць немає');
  });

  test('кидає помилку для недопустимого groupSize', () => {
    expect(() => calculateRegistration(events, ['ev-1'], 50)).toThrow('від 1 до 30');
  });
});