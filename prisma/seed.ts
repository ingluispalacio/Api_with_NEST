import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Crear roles
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'SUPERADMIN' },
    update: {},
    create: { name: 'SUPERADMIN', isConfigurator: true },
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'USER' },
    update: {},
    create: { name: 'USER', isConfigurator: false },
  });

  // Crear permisos con la relación directa a roleId
  const permissions = [
    { endpoint: '/users', methods: ['GET', 'POST', 'PACH', 'DELETE'], roleId: superAdminRole.id },
    { endpoint: '/tasks', methods: ['GET', 'POST', 'PACH', 'DELETE'], roleId: superAdminRole.id },
    { endpoint: '/permissions', methods: ['GET', 'POST'], roleId: superAdminRole.id },

    // El rol USER tiene acceso solo a "/tasks"
    { endpoint: '/tasks', methods: ['GET', 'POST'], roleId: userRole.id },
  ];

  // Crear permisos en la base de datos
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { id: permission.roleId },
      update: {},
      create: permission,
    });
  }

  // Crear usuarios
  const adminUser = {
    email: 'adminlp123@yopmail.com',
    name: 'Admin User',
    password: await hash('adminlp123', 10),
    role: {
      connect: { id: superAdminRole.id }, // Relacionar con el rol SUPERADMIN
    },
  };

  await prisma.user.upsert({
    where: { email: adminUser.email },
    update: {},
    create: adminUser,
  });

  const regularUser = {
    email: 'userlp123@yopmail.com',
    name: 'Regular User',
    password: await hash('userlp123', 10),
    role: {
      connect: { id: userRole.id }, // Relacionar con el rol USER
    },
  };

  await prisma.user.upsert({
    where: { email: regularUser.email },
    update: {},
    create: regularUser,
  });

  console.log('Seed data has been inserted!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
