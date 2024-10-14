import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto'; 

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email }, 
    });
  }

  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const user = await this.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

 
    if (user.password !== loginDto.password) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    return user;
  }

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
