import { MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinGameRequest {
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty()
    playerName: string;

    @MinLength(5)
    @MaxLength(20)
    @ApiProperty()
    gameRoomPassword: string;

    @MinLength(3)
    @MaxLength(20)
    @ApiProperty()
    gameRoomName: string;
}
