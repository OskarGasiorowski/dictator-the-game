import { Event } from "./Event";

export class Aggregate<TEvent extends Event> {
    protected _id: string

  get id(): string {
    return this._id;
  }

  private uncommittedEvents: TEvent[] = [];

  protected enqueueEvent(event: TEvent) {
    this.uncommittedEvents.push(event);
  }

  public popAllEvents(): TEvent[] {
    const events = [...this.uncommittedEvents];
    this.uncommittedEvents = [];
    return events;
  }
}
