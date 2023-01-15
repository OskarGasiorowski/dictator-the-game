import Redis from 'ioredis';
import { IEvent } from './types';

interface Settings {
    port: number;
    host: string;
    username: string;
    password: string;
}

export class EventStore {
    constructor(private readonly client: Redis) {}

    async get(streamId: string): Promise<IEvent[]> {
        const entries = await this.client.xrange(streamId, '-', '+');

        return entries.map((entry) => ({
            eventName: entry[1][1],
            ...JSON.parse(entry[1][3]),
        }));
    }

    async add(streamId: string, events: IEvent[]): Promise<void> {
        const promises = events.map(({ eventName, ...content }) => {
            return this.client.xadd(
                streamId,
                '*',
                'EventName',
                eventName,
                'Content',
                JSON.stringify(content),
            );
        });

        await Promise.all(promises);
    }
}
