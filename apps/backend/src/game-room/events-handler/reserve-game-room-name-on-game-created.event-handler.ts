import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DomainEvents } from '../domain';
import { GameRoomNameReservationService } from '../services';

@EventsHandler(DomainEvents.GameRoomCreatedEvent)
export class ReserveGameRoomNameOnGameCreatedEventHandler
    implements IEventHandler<DomainEvents.GameRoomCreatedEvent>
{
    constructor(
        private readonly gameRoomNameReservation: GameRoomNameReservationService,
    ) {}

    async handle(event: DomainEvents.GameRoomCreatedEvent) {
        await this.gameRoomNameReservation.makeReservation({
            gameRoomId: event.id,
            gameRoomName: event.name,
        });
    }
}
