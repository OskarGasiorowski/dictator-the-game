import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { GameModule } from './game';
import { GameRoomModule } from './game-room';

@Module({
    imports: [GameModule, AuthModule, GameRoomModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
