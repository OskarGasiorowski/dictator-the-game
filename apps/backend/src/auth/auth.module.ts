import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { constants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';

@Module({
    imports: [
        JwtModule.register({
            secret: constants.jwtSecret,
            signOptions: { expiresIn: constants.jwtExpiresIn },
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
