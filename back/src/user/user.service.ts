import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({ email, name, password }: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  async readAll() {
    return this.prisma.user.findMany();
  }

  async readOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: UpdatePutUserDto) {
    await this.existisId(id);
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
  async updatePartial(id: number, data: UpdatePatchUserDto) {
    await this.existisId(id);

    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }
  async delete(id: number) {
    await this.existisId(id);
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async existisId(id: number) {
    if (!(await this.readOne(id))) {
      throw new NotFoundException(` O usuário ${id} Não existe.`);
    }
  }
}
