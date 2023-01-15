/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { CreateGameRoomDto } from './create-game-room.dto';
import { GameRoomCreatedEvent, PlayerJoinGameRoomEvent } from './events';
import { randomUUID } from 'crypto';
import { Aggregate } from '@secret-hitler-the-game/event-sourcing';
import { BadRequestException, ConflictException } from '@nestjs/common';

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
        const createdEvent = new GameRoomCreatedEvent(
            'GameRoomCreatedEvent',
            randomUUID(),
            data.name,
            data.password,
        );

        const aggregate = new GameRoomAggregate();
        aggregate.enqueueEvent(createdEvent);
        aggregate.applyGameRoomCreatedEvent(createdEvent);

        return aggregate;
    }

    private applyGameRoomCreatedEvent(event: GameRoomCreatedEvent): void {
        this.data = { ...event, players: [] };
        this._id = event.id;
    }

    playerJoin(playerName: string, password: string) {
        const playerWithGivenNameAlreadyExists = this.data.players
            .map((player) => player.name)
            .includes(playerName);
        if (playerWithGivenNameAlreadyExists) {
            throw new ConflictException(
                `Player with ${playerName} already joined game`,
            );
        }

        if (this.data.password !== password) {
            throw new BadRequestException('Wrong password.');
        }

        const event: PlayerJoinGameRoomEvent = {
            eventName: 'PlayerJoinGameRoomEvent',
            id: randomUUID(),
            name: playerName,
        };

        this.enqueueEvent(event);
        this.applyPlayerJoinGameRoomEvent(event);
    }

    protected applyPlayerJoinGameRoomEvent(
        playerJoinGameRoomEvent: PlayerJoinGameRoomEvent,
    ): void {
        this.data.players.push({ ...playerJoinGameRoomEvent });
    }

    publishEvents(): void {
        throw new Error('');
    }
}
