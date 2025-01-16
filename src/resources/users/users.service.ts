import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Crear un usuario
  async create(user: CreateUserDto) {
    try {
      const { email, password } = user;
      const exist = await this.prisma.user.findUnique({
        where: { email },
      });
      if (exist) throw new NotFoundException(`User with email ${email} exist`);
      const platinToHash = await hash(password, 10);
      user = { ...user, password: platinToHash };
      return await this.prisma.user.create({
        data: user,
        select: {
          id: true,
          email: true,
          name: true,
          role: {
            select: {
              id: true,
              name: true,
              isConfigurator: true,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        'Error creating user. Ensure the data is valid.',
      );
    }
  }

  // Obtener todos los usuarios con paginación
  async findAll(skip: number = 0, take: number = 10) {
    const users= await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: {
          select: {
            id: true,
            name: true,
            isConfigurator: true,
          },
        },
      },
      where: { deletedAt: null }, // Filtra usuarios "no eliminados"
      skip,
      take,
    });
    return {data: users, message:"User List"};
  }

  // Obtener un usuario por id
  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        role: {
          select: {
            id: true,
            name: true,
            isConfigurator: true,
          },
        },
      },
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // Obtener un usuario por email
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  // Actualizar un usuario
  async update(id: string, user: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: user,
      });
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  // Borrado suave de un usuario
  async remove(id: string) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
