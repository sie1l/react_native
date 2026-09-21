class Attendee {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.registeredEventIds = [];
  }

  register(eventId) {
    if (this.registeredEventIds.includes(eventId)) {
      return false;
    }
    this.registeredEventIds.push(eventId);
    return true;
  }

  cancel(eventId) {
    const index = this.registeredEventIds.indexOf(eventId);
    if (index !== -1) {
      this.registeredEventIds.splice(index, 1);
      return true;
    }
    return false;
  }

  isRegisteredFor(eventId) {
    return this.registeredEventIds.includes(eventId);
  }
}

module.exports = { Attendee };