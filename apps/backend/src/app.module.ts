import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth';
import { GameRoomModule } from './game-room/game-room.module';

@Module({
    imports: [GameModule, AuthModule, GameRoomModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
