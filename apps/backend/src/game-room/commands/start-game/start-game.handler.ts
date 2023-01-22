import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StartGameCommand } from './start-game.command';
import { GameRoomRepository } from '../../domain';

@CommandHandler(StartGameCommand)
export class StartGameHandler implements ICommandHandler<StartGameCommand> {
    constructor(private readonly gameRoomRepository: GameRoomRepository) {}

    async execute(command: StartGameCommand) {
        const gameRoom = await this.gameRoomRepository.get(command.gameId);
        gameRoom.startGame();
        await this.gameRoomRepository.save(gameRoom);
        gameRoom.commit();
    }
}
