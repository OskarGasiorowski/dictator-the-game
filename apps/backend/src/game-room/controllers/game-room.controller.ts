import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus } from '@nestjs/cqrs';
import { CreateGameRequest, JoinGameRequest } from './models';
import { CreateGameCommand, JoinGameCommand } from '../commands';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt.strategy';

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

    @ApiBearerAuth()
    @Get('players')
    @UseGuards(JwtAuthGuard)
    players(@Request() req) {
        console.log(req.user);
        return req.user;
    }
}
