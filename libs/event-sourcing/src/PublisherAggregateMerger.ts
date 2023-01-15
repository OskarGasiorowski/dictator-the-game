import { Constructor } from '@nestjs/cqrs/dist/event-publisher';
import { Aggregate, IEvent } from './types';
import { EventBus } from '@nestjs/cqrs';

export class PublisherAggregateMerger {
    constructor(private readonly eventBus: EventBus) {}

    mergeClassContext<T extends Constructor<Aggregate<IEvent>>>(type: T): T {
        const eventBus = this.eventBus;
        return class extends type {
            override publishEvents() {
                eventBus.publishAll(this.uncommittedEvents);
            }
        };
    }

    mergeObjectContext<T extends Aggregate<IEvent>>(object: T): T {
        const eventBus = this.eventBus;

        object.publishEvents = () => {
            eventBus.publishAll(object.uncommittedEvents);
        };

        return object;
    }
}
