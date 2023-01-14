import Redis from 'ioredis';
import { Event } from './types';

interface Settings {
    port: number;
    host: string;
    username: string;
    password: string;
}

export class EventStore {
    private readonly client: Redis;

    constructor(settings: Settings) {
        this.client = new Redis({
            ...settings,
        });
    }

    async get(streamId: string): Promise<Event[]> {
        const entries = await this.client.xrange(streamId, '-', '+');

        return entries.map((entry) => ({
            eventName: entry[1][1],
            // ...JSON.parse(entry[1][3]),
        }));
    }

    async add(streamId: string, events: Event[]): Promise<void> {
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
