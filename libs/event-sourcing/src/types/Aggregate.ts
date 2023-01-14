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
        const name = event.constructor.name;
        console.log(name);
        const applyMethod = (this as any)[`apply${name}`];
        if (applyMethod) {
            throw new Error(
                `No handler found for ${event.constructor.name}. Be sure to define a method called apply${event.constructor.name} on the aggregate.`
            );
        }

        applyMethod(event);
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
