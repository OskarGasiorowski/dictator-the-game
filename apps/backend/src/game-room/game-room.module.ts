import { Module } from '@nestjs/common';
import { GameRoomController } from './controllers';
import { CreateGameHandler } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../auth';
import { EventStore } from '@secret-hitler-the-game/event-sourcing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GameRoomRepository } from './domain';

const CommandHandlers = [CreateGameHandler];

@Module({
    controllers: [GameRoomController],
    imports: [CqrsModule, AuthModule],
    providers: [
        ...CommandHandlers,
        GameRoomRepository,
        {
            provide: EventStore,
            useFactory: (configService: ConfigService) => {
                return new EventStore({
                    host: configService.getOrThrow<string>('REDIS_HOST'),
                    port: configService.getOrThrow<number>('REDIS_PORT'),
                    username:
                        configService.getOrThrow<string>('REDIS_USERNAME'),
                    password:
                        configService.getOrThrow<string>('REDIS_PASSWORD'),
                });
            },
            inject: [ConfigService],
        },
    ],
})
export class GameRoomModule {}
