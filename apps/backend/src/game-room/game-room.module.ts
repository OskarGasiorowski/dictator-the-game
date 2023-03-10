import { Module } from '@nestjs/common';
import { GameRoomController } from './controllers';
import {
    CreateGameHandler,
    JoinGameHandler,
    StartGameHandler,
} from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import {
    EventStore,
    PublisherAggregateMerger,
} from '@dictator-the-game/event-sourcing';
import { GameRoomRepository } from './domain';
import Redis from 'ioredis';
import { AuthService, GameRoomNameReservationService } from './services';
import {
    ReserveGameRoomNameOnGameCreatedEventHandler,
    NotifyPlayerJoinedEventHandler,
} from './events-handler';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, RolesGuard } from './jwt.strategy';
import { GameRoomPlayersHandler } from './queries';
import { GameRoomGateway } from './gateway';

const CommandHandlers = [CreateGameHandler, JoinGameHandler, StartGameHandler];
const QueryHandlers = [GameRoomPlayersHandler];
const EventHandlers = [
    ReserveGameRoomNameOnGameCreatedEventHandler,
    NotifyPlayerJoinedEventHandler,
];

@Module({
    controllers: [GameRoomController],
    imports: [
        CqrsModule,
        Redis,
        PublisherAggregateMerger,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn:
                        configService.getOrThrow<string>('JWT_EXPIRES_IN'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...EventHandlers,
        AuthService,
        GameRoomRepository,
        GameRoomNameReservationService,
        JwtStrategy,
        GameRoomGateway,
        RolesGuard,
        {
            provide: EventStore,
            useFactory: (redis: Redis) => new EventStore(redis),
            inject: [Redis],
        },
    ],
})
export class GameRoomModule {}
