import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGameCommand } from './create-game.command';
import { AuthService } from '../../../auth';
import { GameRoomAggregate, GameRoomRepository } from '../../domain';

@CommandHandler(CreateGameCommand)
export class CreateGameHandler implements ICommandHandler<CreateGameCommand> {
    constructor(
        private readonly authService: AuthService,
        private readonly gameRoomRepository: GameRoomRepository,
    ) {}

    async execute(command: CreateGameCommand): Promise<any> {
        const gameRoom = GameRoomAggregate.create({
            name: command.gameRoomName,
            password: command.gamePassword,
        });
        gameRoom.playerJoin(command.playerName);

        await this.gameRoomRepository.save(gameRoom);

        return this.authService.anonymous({
            gameId: 'brand-new-game',
            role: 'admin',
            name: command.playerName,
        });
    }
}
