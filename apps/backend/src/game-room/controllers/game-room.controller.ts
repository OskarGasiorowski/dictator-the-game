import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateGameRequest, JoinGameRequest } from './models';
import {
    CreateGameCommand,
    JoinGameCommand,
    StartGameCommand,
} from '../commands';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasRoles, JwtAuthGuard, RolesGuard, User } from '../jwt.strategy';
import { GameRoomPlayersQuery } from '../queries';

@ApiTags('Game room')
@Controller('game-room')
export class GameRoomController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

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
    players(@Request() { user }: { user: User }) {
        return this.queryBus.execute(new GameRoomPlayersQuery(user.gameId));
    }

    @ApiBearerAuth()
    @Patch('start')
    @HasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async start(@Request() { user }: { user: User }) {
        await this.commandBus.execute(new StartGameCommand(user.gameId));
    }
}
