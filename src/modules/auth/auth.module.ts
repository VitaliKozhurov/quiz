import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BasicAuthGuard } from './guards/basic-auth.guard';
import { BasicAuthStrategy } from './strategies/basic-auth.strategy';

@Module({
  imports: [PassportModule],
  providers: [BasicAuthStrategy, BasicAuthGuard],
  exports: [BasicAuthGuard],
})
export class AuthModule {}
