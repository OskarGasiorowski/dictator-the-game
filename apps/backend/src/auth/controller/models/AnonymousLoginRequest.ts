import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength } from 'class-validator';

export class AnonymousLoginRequest {
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty()
    userName: string;

    @MinLength(1)
    @ApiProperty()
    gameNameId: string;

    @MinLength(1)
    @ApiProperty()
    gameRoomPassword: string;
}
