import { Module } from '@nestjs/common';
import { UserControler } from './user.controller';

@Module({
  imports: [],
  controllers: [UserControler],
  providers: [],
  exports: [],
})
export class UserModule {}
