import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { PrismaService } from 'src/common/database/prisma.service';
import { CacheManagerService } from 'src/common/cache-manager/cache-manager.service';
import { CACHE_TTL } from 'src/common/constants';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cacheManager: CacheManagerService,
  ) {}

  // Crear un usuario
  async create(user: CreateUserDto) {
    try {
      const { email, password } = user;
      const exist = await this.prisma.user.findUnique({
        where: { email },
      });
      if (exist) throw new NotFoundException(`User with email ${email} exist`);

      const roleExists = await this.prisma.role.findUnique({ where: { id: user.roleId } });
      if (!roleExists) throw new NotFoundException(`Role with id ${user.roleId} not found`);

      const platinToHash = await hash(password, 10);
      user = { ...user, password: platinToHash };
      const newUser= await this.prisma.user.create({
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
      await this.cacheManager.delCache(`users:*`);
      return newUser;
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
    const cacheKey = `users:skip:${skip}:take:${take}`;

    const cachedData = await this.cacheManager.getCache<{ data: any[], total: number }>(cacheKey);
    if (cachedData) return cachedData;

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
      where: { deletedAt: null }, 
      skip,
      take,
    });
    const total = await this.prisma.user.count({ where: { deletedAt: null } });
    const result = { data: users, total, message: "User List" };
    await this.cacheManager.setCache(cacheKey, result, CACHE_TTL);
    return result;
  }

  // Obtener un usuario por id
  async findById(id: string) {
    const cacheKey = `user:${id}`;

    const cachedUser = await this.cacheManager.getCache<any>(cacheKey);
    if (cachedUser) return cachedUser;

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
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    
    await this.cacheManager.setCache(cacheKey, user, CACHE_TTL);
    return user;
  }

  // Obtener un usuario por email
  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new NotFoundException(`User with email ${email} not found`);

    return user;
  }

  // Actualizar un usuario
  async update(id: string, user: UpdateUserDto) {
    try {
      const updatedUser =  await this.prisma.user.update({
        where: { id },
        data: user,
      });
      await this.cacheManager.delCache(`user:${id}`);
      return updatedUser;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  // Borrado suave de un usuario
  async remove(id: string) {
    try {
      const deletedUser = await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
      await this.cacheManager.delCache(`user:${id}`);
      return deletedUser;
    } catch (error) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
