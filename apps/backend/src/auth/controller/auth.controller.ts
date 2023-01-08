import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service';
import { AnonymousLoginRequest } from './models';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('anonymous')
    async anonymous(@Body() body: AnonymousLoginRequest) {
        return this.authService.anonymous({
            name: body.userName,
            gameId: body.gameNameId,
        });
    }
}
