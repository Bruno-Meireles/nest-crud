import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './products/product.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule, ProductModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
  exports: [AppService],
})
export class AppModule {}
