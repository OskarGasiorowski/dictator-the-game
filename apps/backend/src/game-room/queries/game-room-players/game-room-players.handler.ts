import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GameRoomPlayersQuery } from './game-room-players.query';
import { GameRoomRepository } from '../../domain';

@QueryHandler(GameRoomPlayersQuery)
export class GameRoomPlayersHandler
    implements IQueryHandler<GameRoomPlayersQuery>
{
    constructor(private readonly gameRoomRepository: GameRoomRepository) {}

    async execute(query: GameRoomPlayersQuery) {
        const gameRoom = await this.gameRoomRepository.get(query.gameRoomId);
        return gameRoom.data.players;
    }
}
