import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateGameCommand } from './create-game.command';
import { GameRoomAggregate, GameRoomRepository } from '../../domain';
import { AuthService, GameRoomNameReservationService } from '../../services';
import { ConflictException } from '@nestjs/common';
import { PublisherAggregateMerger } from '@secret-hitler-the-game/event-sourcing';

@CommandHandler(CreateGameCommand)
export class CreateGameHandler implements ICommandHandler<CreateGameCommand> {
    constructor(
        private readonly authService: AuthService,
        private readonly gameRoomRepository: GameRoomRepository,
        private readonly gameRoomNameReservation: GameRoomNameReservationService,
        private readonly merger: PublisherAggregateMerger,
    ) {}

    async execute(command: CreateGameCommand): Promise<any> {
        const isNameReserved = await this.gameRoomNameReservation.isReserved(
            command.gameRoomName,
        );

        if (isNameReserved) {
            throw new ConflictException(
                `Game rooom - '${command.gameRoomName}' is already created.`,
            );
        }

        const gameRoom = this.merger.mergeObjectContext(
            GameRoomAggregate.create({
                name: command.gameRoomName,
                password: command.gamePassword,
            }),
        );
        gameRoom.playerJoin(command.playerName, command.gamePassword);
        await this.gameRoomRepository.save(gameRoom);
        gameRoom.commit();

        return this.authService.anonymous({
            gameId: gameRoom.id,
            role: 'admin',
            name: command.playerName,
        });
    }
}
