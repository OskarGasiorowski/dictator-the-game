import { Injectable } from '@nestjs/common';
import {
    EventStore,
    PublisherAggregateMerger,
} from '@secret-hitler-the-game/event-sourcing';
import { GameRoomAggregate } from './game-room.aggregate';

const STREAM_PREFIX = 'game-room';

@Injectable()
export class GameRoomRepository {
    constructor(
        private eventStore: EventStore,
        private readonly merger: PublisherAggregateMerger,
    ) {}

    save(gameRoom: GameRoomAggregate) {
        return this.eventStore.add(
            `${STREAM_PREFIX}-${gameRoom.id}`,
            gameRoom.uncommittedEvents,
        );
    }

    async get(gameRoomId: string) {
        const GameRoomAggregateModel =
            this.merger.mergeClassContext(GameRoomAggregate);

        const events = await this.eventStore.get(
            `${STREAM_PREFIX}-${gameRoomId}`,
        );
        const gameRoom = new GameRoomAggregateModel();
        gameRoom.loadFromHistory(events);

        return gameRoom;
    }
}
