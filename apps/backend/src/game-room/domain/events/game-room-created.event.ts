import { Event } from '../../../lib';

export interface GameRoomCreatedEvent extends Event {
    id: string;
    name: string;
    password: string;
}
