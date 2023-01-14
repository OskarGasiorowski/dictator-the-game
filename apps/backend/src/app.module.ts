import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { GameModule } from './game';
import { GameRoomModule } from './game-room';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        GameModule,
        AuthModule,
        GameRoomModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
