import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

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

export const HasRoles = (role: 'player' | 'admin') => SetMetadata('role', role);

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<
            'player' | 'admin'
        >('role', [context.getHandler(), context.getClass()]);

        const { user } = context.switchToHttp().getRequest();
        return requiredRoles === user?.role;
    }
}
