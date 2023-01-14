import { Injectable } from '@nestjs/common';
import { EventStore } from '@secret-hitler-the-game/event-sourcing';
import { GameRoomAggregate } from './game-room.aggregate';

const STREAM_PREFIX = 'game-room';

@Injectable()
export class GameRoomRepository {
    constructor(private eventStore: EventStore) {}

    save(gameRoom: GameRoomAggregate) {
        return this.eventStore.add(
            `${STREAM_PREFIX}-${gameRoom.id}`,
            gameRoom.popAllEvents(),
        );
    }

    async get(gameRoomId: string) {
        const events = await this.eventStore.get(
            `${STREAM_PREFIX}-${gameRoomId}`,
        );
        const gameRoom = new GameRoomAggregate();
        gameRoom.loadFromHistory(events);

        return gameRoom;
    }
}
