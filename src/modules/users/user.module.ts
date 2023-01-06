import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UsersService],
  imports: [PrismaModule],
})
export class UserModule {}
