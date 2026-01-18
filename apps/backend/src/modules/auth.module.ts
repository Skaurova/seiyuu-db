import { Module } from '@nestjs/common';
import { AuthService } from '../infrastructure/http/services/auth.service';
import { AuthController } from '../infrastructure/http/controllers/auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FakeAuthService } from '../faker/auth/fake-auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [FakeAuthService],
})
export class AuthModule {}
