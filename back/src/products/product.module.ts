import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';

@Module({
  controllers: [ProductsController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
