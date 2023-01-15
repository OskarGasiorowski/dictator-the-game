import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class GameRoomNameReservationService {
    private readonly redisKey: string = 'game-room-name';

    constructor(private readonly redis: Redis) {}

    async isReserved(gameRoomName: string) {
        const result = await this.redis.sismember(this.redisKey, gameRoomName);
        return result === 1;
    }

    async makeReservation(gameRoomName: string) {
        await this.redis.sadd(this.redisKey, gameRoomName);
    }

    async removeReservation(gameRoomName: string) {
        await this.redis.srem(this.redisKey, gameRoomName);
    }
}
