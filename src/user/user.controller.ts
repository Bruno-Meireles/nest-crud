import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserControler {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get()
  async readAll() {
    return this.userService.readAll();
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.readOne(id);
  }

  @Put(':id')
  async update(
    @Body() data: UpdatePutUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(id, data);
  }
  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
