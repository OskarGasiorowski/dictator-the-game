import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DomainEvents } from '../domain';
import { PlayerJoinGameRoomEvent } from '../domain/events';
import { GameRoomGateway } from '../gateway';

@EventsHandler(DomainEvents.PlayerJoinGameRoomEvent)
export class NotifyPlayerJoinedEventHandler
    implements IEventHandler<PlayerJoinGameRoomEvent>
{
    constructor(private readonly gameRoomGateway: GameRoomGateway) {}

    handle(event: PlayerJoinGameRoomEvent) {
        this.gameRoomGateway.playerJoined({
            name: event.name,
            id: event.id,
        });
    }
}
