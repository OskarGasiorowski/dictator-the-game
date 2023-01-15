import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateGameRequest, JoinGameRequest } from './models';
import { CreateGameCommand } from '../commands';
import { ApiTags } from '@nestjs/swagger';
import { JoinGameCommand } from '../commands/join-game/join-game.command';

@ApiTags('Game room')
@Controller('game-room')
export class GameRoomController {
    constructor(private commandBus: CommandBus) {}

    @Post()
    create(@Body() body: CreateGameRequest) {
        return this.commandBus.execute(
            new CreateGameCommand(
                body.playerName,
                body.gameRoomPassword,
                body.gameRoomName,
            ),
        );
    }

    @Patch('join')
    join(@Body() body: JoinGameRequest) {
        return this.commandBus.execute(
            new JoinGameCommand(
                body.playerName,
                body.gameRoomPassword,
                body.gameRoomName,
            ),
        );
    }
}
