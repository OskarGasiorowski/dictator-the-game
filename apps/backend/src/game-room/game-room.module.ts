import { Module } from '@nestjs/common';
import { GameRoomController } from './controllers';
import { CreateGameHandler } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../auth';
import {
    EventStore,
    PublisherAggregateMerger,
} from '@secret-hitler-the-game/event-sourcing';
import { GameRoomRepository } from './domain';
import Redis from 'ioredis';
import { GameRoomNameReservationService } from './services';
import { ReserveGameRoomNameOnGameCreatedEventHandler } from './events-handler';

const CommandHandlers = [CreateGameHandler];
const EventHandlers = [ReserveGameRoomNameOnGameCreatedEventHandler];

@Module({
    controllers: [GameRoomController],
    imports: [CqrsModule, AuthModule, Redis, PublisherAggregateMerger],
    providers: [
        ...CommandHandlers,
        ...EventHandlers,
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
