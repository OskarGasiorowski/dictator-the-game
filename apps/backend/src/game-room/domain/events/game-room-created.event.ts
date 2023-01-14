import { Event } from '@secret-hitler-the-game/event-sourcing';

export interface GameRoomCreatedEvent extends Event {
    eventName: 'GameRoomCreatedEvent';
    id: string;
    name: string;
    password: string;
}
