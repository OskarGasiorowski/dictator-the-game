import { Event } from 'event-sourcing';

export interface PlayerJoinGameRoomEvent extends Event {
    name: string;
    id: string;
}
