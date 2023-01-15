import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

interface GameRoomReservationDto {
    gameRoomName: string;
    gameRoomId: string;
}

@Injectable()
export class GameRoomNameReservationService {
    private readonly redisKey: string = 'game-room-name';

    constructor(private readonly redis: Redis) {}

    async get(
        gameRoomName: string,
    ): Promise<GameRoomReservationDto | undefined> {
        const result = await this.redis.hget(this.redisKey, gameRoomName);
        if (!result) {
            return undefined;
        }

        return {
            gameRoomName: gameRoomName,
            gameRoomId: result,
        };
    }

    async isReserved(gameRoomName: string) {
        const result = await this.redis.hexists(this.redisKey, gameRoomName);
        return result === 1;
    }

    async makeReservation(gameRoom: GameRoomReservationDto) {
        await this.redis.hset(
            this.redisKey,
            gameRoom.gameRoomName,
            gameRoom.gameRoomId,
        );
    }

    async removeReservation(gameRoomName: string) {
        await this.redis.hdel(this.redisKey, gameRoomName);
    }
}
