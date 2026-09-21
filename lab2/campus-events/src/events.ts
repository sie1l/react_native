export type EventCategory = 'lecture' | 'workshop' | 'meetup';

export interface CampusEvent {
  id: string;
  title: string;
  startsAt: Date;
  seatsLeft: number;
  category: EventCategory;
  price: number;
}

export const events: CampusEvent[] = [
  {
    id: 'ev-1',
    title: 'Відкрита лекція: Мобільний UX',
    startsAt: new Date('2026-10-01T16:00'),
    seatsLeft: 20,
    category: 'lecture',
    price: 100,
  },
  {
    id: 'ev-2',
    title: 'Майстер-клас із React Native',
    startsAt: new Date('2026-10-05T18:00'),
    seatsLeft: 0,
    category: 'workshop',
    price: 300,
  },
  {
    id: 'ev-3',
    title: 'Зустріч студентської ради',
    startsAt: new Date('2026-10-10T14:00'),
    seatsLeft: 50,
    category: 'meetup',
    price: 0,
  },
  {
    id: 'ev-4',
    title: 'Воркшоп: Доступність UI',
    startsAt: new Date('2026-10-15T10:00'),
    seatsLeft: 15,
    category: 'workshop',
    price: 200,
  }
];

export function getOpenEvents(events: CampusEvent[]): CampusEvent[] {
  return events.filter((event) => event.seatsLeft > 0);
}

export function getEventsByCategory(events: CampusEvent[], category: EventCategory): CampusEvent[] {
  return events.filter((event) => event.category === category);
}

export function findEventById(events: CampusEvent[], id: string): CampusEvent | undefined {
  return events.find((event) => event.id === id);
}

export function getEventTitles(events: CampusEvent[]): string[] {
  return events.map((event) => event.title);
}