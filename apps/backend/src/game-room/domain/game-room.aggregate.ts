/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { CreateGameRoomDto } from './create-game-room.dto';
import {
    GameRoomCreatedEvent,
    PlayerJoinGameRoomEvent,
    StartGameEvent,
} from './events';
import { randomUUID } from 'crypto';
import { Aggregate } from '@dictator-the-game/event-sourcing';
import { BadRequestException, ConflictException } from '@nestjs/common';

interface GameRoomData {
    name: string;
    password: string;

    gameStatus: 'lobby' | 'in-game';

    players: { id: string; name: string }[];
}

export class GameRoomAggregate extends Aggregate<
    GameRoomCreatedEvent | PlayerJoinGameRoomEvent | StartGameEvent
> {
    private _data: GameRoomData;

    get data() {
        return this._data;
    }

    publishEvents(): void {
        throw new Error('');
    }

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

    private applyGameRoomCreatedEvent({
        eventName,
        ...event
    }: GameRoomCreatedEvent): void {
        this._data = { ...event, players: [], gameStatus: 'lobby' };
        this._id = event.id;
    }

    playerJoin(playerName: string, password: string) {
        // TODO this check should comes from strategy pattern or something
        if (this._data.players.length > 10) {
            throw new BadRequestException(`Game room is full.`);
        }

        const playerWithGivenNameAlreadyExists = this._data.players
            .map((player) => player.name)
            .includes(playerName);
        if (playerWithGivenNameAlreadyExists) {
            throw new ConflictException(
                `Player with ${playerName} already joined game`,
            );
        }

        if (this._data.password !== password) {
            throw new BadRequestException('Wrong password.');
        }

        const event = new PlayerJoinGameRoomEvent(
            'PlayerJoinGameRoomEvent',
            playerName,
            randomUUID(),
        );

        this.enqueueEvent(event);
        this.applyPlayerJoinGameRoomEvent(event);
    }

    protected applyPlayerJoinGameRoomEvent({
        eventName,
        ...payload
    }: PlayerJoinGameRoomEvent): void {
        this._data.players.push({ ...payload });
    }

    startGame() {
        if (this._data.gameStatus !== 'lobby') {
            throw new BadRequestException('Game is already started');
        }

        const event = new StartGameEvent(
            'StartGameEvent',
            this.id,
            this._data.players,
        );

        this.enqueueEvent(event);
        this.applyStartGameEvent(event);
    }

    protected applyStartGameEvent(event: StartGameEvent) {
        this._data.gameStatus = 'in-game';
    }
}
