import { Module } from '@nestjs/common';
import { GameController } from './controllers';
import { CreateGameHandler } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../auth';

const CommandHandlers = [CreateGameHandler];

@Module({
    controllers: [GameController],
    imports: [CqrsModule, AuthModule],
    providers: [...CommandHandlers],
})
export class GameModule {}
