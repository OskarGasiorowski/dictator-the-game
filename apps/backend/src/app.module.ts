import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GameModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
