import { Event } from '@secret-hitler-the-game/event-sourcing';

export interface PlayerJoinGameRoomEvent extends Event {
    name: string;
    id: string;
}
