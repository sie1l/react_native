export class Attendee {
  id: string;
  name: string;
  registeredEventIds: string[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.registeredEventIds = [];
  }

  register(eventId: string): boolean {
    if (this.registeredEventIds.includes(eventId)) {
      return false;
    }
    this.registeredEventIds.push(eventId);
    return true;
  }

  cancel(eventId: string): boolean {
    const index = this.registeredEventIds.indexOf(eventId);
    if (index !== -1) {
      this.registeredEventIds.splice(index, 1);
      return true;
    }
    return false;
  }

  isRegisteredFor(eventId: string): boolean {
    return this.registeredEventIds.includes(eventId);
  }
}