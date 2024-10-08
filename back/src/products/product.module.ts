import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './public/uploads', 
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${uniqueSuffix}${ext}`);
        },
      }),
    }),
    PrismaModule, 
  ],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {}
