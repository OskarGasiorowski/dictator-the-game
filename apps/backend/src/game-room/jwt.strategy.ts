import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

export interface User {
    userId: string;
    gameId: string;
    userName: string;
    role: 'admin' | 'player';
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        console.log(payload);
        return {
            userId: payload.sub,
            gameId: payload.gameId,
            userName: payload.username,
            role: payload.role,
        };
    }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
