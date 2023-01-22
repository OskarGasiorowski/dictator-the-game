import { IEvent } from '@dictator-the-game/event-sourcing';

export class PlayerJoinGameRoomEvent implements IEvent {
    constructor(
        public readonly eventName: 'PlayerJoinGameRoomEvent',
        public readonly name: string,
        public readonly id: string,
    ) {}
}
