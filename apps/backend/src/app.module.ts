import { Global, Module } from '@nestjs/common';
import { GameModule } from './game';
import { GameRoomModule } from './game-room';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { PublisherAggregateMerger } from '@secret-hitler-the-game/event-sourcing';
import { CqrsModule, EventBus } from '@nestjs/cqrs';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        GameModule,
        GameRoomModule,
        CqrsModule,
    ],
    controllers: [],
    providers: [
        {
            provide: Redis,
            useFactory: (configService: ConfigService) => {
                return new Redis({
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
        {
            provide: PublisherAggregateMerger,
            useFactory: (eventBus: EventBus) =>
                new PublisherAggregateMerger(eventBus),
            inject: [EventBus],
        },
    ],
    exports: [Redis, PublisherAggregateMerger],
})
export class AppModule {}
