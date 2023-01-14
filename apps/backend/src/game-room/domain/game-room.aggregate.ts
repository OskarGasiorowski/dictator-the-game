/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { CreateGameRoomDto } from './create-game-room.dto';
import { GameRoomCreatedEvent, PlayerJoinGameRoomEvent } from './events';
import { randomUUID } from 'crypto';
import { Aggregate } from 'event-sourcing';

interface GameRoomData {
    name: string;
    password: string;

    players: { id: string; name: string }[];
}

export class GameRoomAggregate extends Aggregate<
    GameRoomCreatedEvent | PlayerJoinGameRoomEvent
> {
    private data: GameRoomData;

    static create(data: CreateGameRoomDto) {
        const createdEvent: GameRoomCreatedEvent = {
            name: data.name,
            password: data.password,
            id: randomUUID(),
        };

        const aggregate = new GameRoomAggregate();
        aggregate.enqueueEvent(createdEvent);
        aggregate.applyGameRoomCreatedEvent(createdEvent);

        return aggregate;
    }

    private applyGameRoomCreatedEvent(event: GameRoomCreatedEvent): void {
        this.data = { ...event, players: [] };
        this._id = event.id;
    }

    playerJoin(playerName: string) {
        const event: PlayerJoinGameRoomEvent = {
            id: randomUUID(),
            name: playerName,
        };

        this.enqueueEvent(event);
        this.applyPlayerJoinGameRoomEvent(event);
    }

    private applyPlayerJoinGameRoomEvent(
        playerJoinGameRoomEvent: PlayerJoinGameRoomEvent,
    ): void {
        this.data.players.push({ ...playerJoinGameRoomEvent });
    }
}
