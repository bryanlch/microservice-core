import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt/jwt.config';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@guard/auth.guard';

@Global()
@Module({
  imports: [JwtModule.registerAsync(jwtConfig)],
  providers: [AuthGuard, Reflector],
  exports: [JwtModule, AuthGuard],
})
export class GlobalAuthModule {}
