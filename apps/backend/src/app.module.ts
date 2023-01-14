import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { GameModule } from './game';
import { GameRoomModule } from './game-room';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        GameModule,
        AuthModule,
        GameRoomModule,
        ConfigModule.forRoot({
            envFilePath: '.development.env',
            isGlobal: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
