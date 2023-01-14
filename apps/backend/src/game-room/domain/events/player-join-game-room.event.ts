import { Event } from '@secret-hitler-the-game/event-sourcing';

export interface PlayerJoinGameRoomEvent extends Event {
    eventName: 'PlayerJoinGameRoomEvent',
    name: string;
    id: string;
}
