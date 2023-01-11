import { Module } from '@nestjs/common';
import { GameRoomController } from './controllers';
import { CreateGameHandler } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../auth';

const CommandHandlers = [CreateGameHandler];

@Module({
    controllers: [GameRoomController],
    imports: [CqrsModule, AuthModule],
    providers: [...CommandHandlers],
})
export class GameRoomModule {}
