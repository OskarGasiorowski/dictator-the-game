import { Event } from 'event-sourcing';

export interface GameRoomCreatedEvent extends Event {
    id: string;
    name: string;
    password: string;
}
