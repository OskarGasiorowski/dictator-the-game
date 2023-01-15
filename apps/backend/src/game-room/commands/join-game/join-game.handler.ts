import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JoinGameCommand } from './join-game.command';
import { GameRoomRepository } from '../../domain';
import { AuthService, GameRoomNameReservationService } from '../../services';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(JoinGameCommand)
export class JoinGameHandler implements ICommandHandler<JoinGameCommand> {
    constructor(
        private gameRoomRepository: GameRoomRepository,
        private gameRoomNameReservation: GameRoomNameReservationService,
        private authService: AuthService
    ) {}

    async execute(command: JoinGameCommand): Promise<any> {
        const reservation = await this.gameRoomNameReservation.get(
            command.gameRoomName,
        );
        if (!reservation) {
            throw new BadRequestException(
                `Game room with ${command.gameRoomName} name does not exist`,
            );
        }

        const gameRoom = await this.gameRoomRepository.get(
            reservation.gameRoomId,
        );
        gameRoom.playerJoin(command.playerName, command.gamePassword);
        await this.gameRoomRepository.save(gameRoom);
        gameRoom.commit();

        return this.authService.anonymous({
            gameId: gameRoom.id,
            role: 'player',
            name: command.playerName,
        });
    }
}
