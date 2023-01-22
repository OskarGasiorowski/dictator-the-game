import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StartGameEvent } from '../../game-room';
import { GameGateway } from '../gateway';

@EventsHandler(StartGameEvent)
export class StartGameEventEventHandler
    implements IEventHandler<StartGameEventEventHandler>
{
    constructor(private readonly gameGateway: GameGateway) {}

    handle(event: StartGameEventEventHandler) {
        this.gameGateway.gameStarted();
    }
}
