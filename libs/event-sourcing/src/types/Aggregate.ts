import { Event } from './Event';

export abstract class Aggregate<TEvent extends Event> {
    private uncommittedEvents: TEvent[] = [];

    protected _id = '';

    get id(): string {
        return this._id;
    }

    loadFromHistory(history: Event[]): void {
        history.forEach((event) => {
            this.applyChangeInternal(event);
        });
    }

    private applyChangeInternal(event: Event): void {
        if (!(this as any)[`apply${event.eventName}`]) {
            throw new Error(
                `No handler found for ${event.constructor.name}. Be sure to define a method called apply${event.constructor.name} on the aggregate.`
            );
        }

        (this as any)[`apply${event.eventName}`](event);
    }

    protected enqueueEvent(event: TEvent) {
        this.uncommittedEvents.push(event);
    }

    public popAllEvents(): TEvent[] {
        const events = [...this.uncommittedEvents];
        this.uncommittedEvents = [];
        return events;
    }
}
