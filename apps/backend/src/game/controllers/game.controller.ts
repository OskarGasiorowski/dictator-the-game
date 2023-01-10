import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateGameCommand } from '../commands';
import { CreateGameRequest } from './models';

@ApiTags('Game')
@Controller('game')
export class GameController {
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
