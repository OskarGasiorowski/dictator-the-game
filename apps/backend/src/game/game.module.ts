import { Module } from '@nestjs/common';
import { GameController } from './controllers';

@Module({
    controllers: [GameController],
})
export class GameModule {}
