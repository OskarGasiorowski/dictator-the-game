import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateGameRequest } from './models';
import { CreateGameCommand } from '../commands';
import { ApiTags } from '@nestjs/swagger';

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
}
