import { ApiProperty } from '@nestjs/swagger';

export class AnonymousLoginRequest {
    @ApiProperty()
    userName: string;

    @ApiProperty()
    gameNameId: string;
}
