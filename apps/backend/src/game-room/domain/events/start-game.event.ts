import { IEvent } from '@dictator-the-game/event-sourcing';

export class StartGameEvent implements IEvent {
    constructor(
        public readonly eventName: 'StartGameEvent',
        public readonly gameId: string,
        public readonly players: { id: string; name: string }[],
    ) {}
}
