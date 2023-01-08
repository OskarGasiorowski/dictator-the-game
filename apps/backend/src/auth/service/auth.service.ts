import { Injectable } from '@nestjs/common';
import { AnonymousLoginDto } from './models';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async anonymous(user: AnonymousLoginDto) {
        const jwt = this.jwtService.sign({
            username: user.name,
            sub: randomUUID(),
        });

        return jwt;
    }
}
