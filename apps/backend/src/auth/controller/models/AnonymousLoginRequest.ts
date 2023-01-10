import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsUUID } from 'class-validator';

export class AnonymousLoginRequest {
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty()
    userName: string;

    @ApiProperty()
    gameNameId: string;
}
