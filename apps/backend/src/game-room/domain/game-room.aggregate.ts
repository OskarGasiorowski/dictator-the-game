/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { CreateGameRoomDto } from './create-game-room.dto';
import { Aggregate } from '../../lib';
import { GameRoomCreatedEvent, PlayerJoinGameRoomEvent } from './events';
import { randomUUID } from 'crypto';

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
        aggregate.apply(createdEvent);

        return aggregate;
    }

    private apply(event: GameRoomCreatedEvent): void {
        this.data = { ...event, players: [] };
        this._id = event.id;
    }

    playerJoin(playerName: string) {
        const event: PlayerJoinGameRoomEvent = {
            id: randomUUID(),
            name: playerName,
        };

        this.enqueueEvent(event);
        this.apply(event);
    }

    private apply(playerJoinGameRoomEvent: PlayerJoinGameRoomEvent): void {
        this.data.players.push({ ...playerJoinGameRoomEvent });
    }
}
