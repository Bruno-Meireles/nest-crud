import { Module } from '@nestjs/common';
import { UserControler } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserControler],
  providers: [UserService],
  exports: [],
})
export class UserModule {}
