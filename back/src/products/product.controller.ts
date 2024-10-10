import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
    const createProductDto = new CreateProductDto();
    createProductDto.name = body.name;
    createProductDto.description = body.description;
    createProductDto.price = parseFloat(body.price);

    createProductDto.imageUrl = file ? `uploads/${file.filename}` : null;

    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deletedProduct = await this.productsService.remove(id);

    this.eventEmitter.emit('product.deleted', deletedProduct);

    return deletedProduct;
  }
}
