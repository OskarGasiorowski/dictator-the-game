import { Module } from '@nestjs/common';
import { GameController } from './controllers';
import { StartGameEventEventHandler } from './event-handlers';
import { GameGateway } from './gateway';

const EventHandlers = [StartGameEventEventHandler];

@Module({
    controllers: [GameController],
    providers: [...EventHandlers, GameGateway],
})
export class GameModule {}
