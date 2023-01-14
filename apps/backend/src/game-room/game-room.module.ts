import { Module } from '@nestjs/common';
import { GameRoomController } from './controllers';
import { CreateGameHandler } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../auth';
import { EventStore } from '@secret-hitler-the-game/event-sourcing';
import { ConfigService } from '@nestjs/config';

const CommandHandlers = [CreateGameHandler];

@Module({
    controllers: [GameRoomController],
    imports: [CqrsModule, AuthModule],
    providers: [
        ...CommandHandlers,
        {
            provide: EventStore,
            useFactory: (configService: ConfigService) =>
                new EventStore({
                    host: configService.get<string>('REDIS_HOST'),
                    port: configService.get<number>('REDIS_PORT'),
                    username: configService.get<string>('REDIS_USERNAME'),
                    password: configService.get<string>('REDIS_PASSWORD'),
                }),
            inject: [ConfigService],
        },
    ],
})
export class GameRoomModule {}
