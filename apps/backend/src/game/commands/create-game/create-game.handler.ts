import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateGameCommand } from './create-game.command';
import { AuthService } from '../../../auth';

@CommandHandler(CreateGameCommand)
export class CreateGameHandler implements ICommandHandler<CreateGameCommand> {
    constructor(private readonly authService: AuthService) {}

    execute(command: CreateGameCommand): Promise<any> {
        return this.authService.anonymous({
            gameId: 'brand-new-game',
            role: 'admin',
            name: command.playerName,
        });
    }
}
