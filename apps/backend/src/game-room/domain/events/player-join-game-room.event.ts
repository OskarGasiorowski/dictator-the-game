import { IEvent } from '@dictator-the-game/event-sourcing';

export interface PlayerJoinGameRoomEvent extends IEvent {
    eventName: 'PlayerJoinGameRoomEvent';
    name: string;
    id: string;
}
