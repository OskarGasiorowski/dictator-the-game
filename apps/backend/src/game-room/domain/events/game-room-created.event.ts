import { IEvent } from '@secret-hitler-the-game/event-sourcing';

export class GameRoomCreatedEvent implements IEvent {
    constructor(
        public eventName: 'GameRoomCreatedEvent',
        public id: string,
        public name: string,
        public password: string,
    ) {}
}
