import { IEvent } from '@dictator-the-game/event-sourcing';

export class GameRoomCreatedEvent implements IEvent {
    constructor(
        public eventName: 'GameRoomCreatedEvent',
        public id: string,
        public name: string,
        public password: string,
    ) {}
}
