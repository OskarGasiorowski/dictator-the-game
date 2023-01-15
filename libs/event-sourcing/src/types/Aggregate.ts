import { IEvent } from './IEvent';

export abstract class Aggregate<TEvent extends IEvent> {
    private _uncommittedEvents: TEvent[] = [];

    protected _id = '';

    get id(): string {
        return this._id;
    }

    get uncommittedEvents(): TEvent[] {
        return this._uncommittedEvents;
    }

    loadFromHistory(history: IEvent[]): void {
        history.forEach((event) => {
            this.applyChangeInternal(event);
        });
    }

    private applyChangeInternal(event: IEvent): void {
        if (!(this as any)[`apply${event.eventName}`]) {
            throw new Error(
                `No handler found for ${event.constructor.name}. Be sure to define a method called apply${event.constructor.name} on the aggregate.`,
            );
        }

        (this as any)[`apply${event.eventName}`](event);
    }

    protected enqueueEvent(event: TEvent) {
        this._uncommittedEvents.push(event);
    }

    abstract publishEvents(): void;

    commit() {
        this.publishEvents();
        this._uncommittedEvents = [];
    }
}
