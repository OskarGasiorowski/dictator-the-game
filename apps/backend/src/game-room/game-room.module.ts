import { Module } from '@nestjs/common';
import { GameRoomController } from './controllers';
import { CreateGameHandler } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import {
    EventStore,
    PublisherAggregateMerger,
} from '@secret-hitler-the-game/event-sourcing';
import { GameRoomRepository } from './domain';
import Redis from 'ioredis';
import { AuthService, GameRoomNameReservationService } from './services';
import { ReserveGameRoomNameOnGameCreatedEventHandler } from './events-handler';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const CommandHandlers = [CreateGameHandler];
const EventHandlers = [ReserveGameRoomNameOnGameCreatedEventHandler];

@Module({
    controllers: [GameRoomController],
    imports: [
        CqrsModule,
        Redis,
        PublisherAggregateMerger,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.getOrThrow<string>('JWT_EXPIRES_IN'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        ...CommandHandlers,
        ...EventHandlers,
        AuthService,
        GameRoomRepository,
        GameRoomNameReservationService,
        {
            provide: EventStore,
            useFactory: (redis: Redis) => new EventStore(redis),
            inject: [Redis],
        },
    ],
})
export class GameRoomModule {}
