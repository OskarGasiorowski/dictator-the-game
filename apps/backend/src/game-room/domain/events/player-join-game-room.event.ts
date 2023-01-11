import { Event } from '../../../lib';

export interface PlayerJoinGameRoomEvent extends Event {
    name: string;
    id: string;
}
