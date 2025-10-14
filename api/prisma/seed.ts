import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.userRole.create({
    data: { role_name: 'admin' },
  });

  const userRole = await prisma.userRole.create({
    data: { role_name: 'user' },
  });

  const userCompte = await prisma.userRole.create({
    data: { role_name: 'student' },
  });

  const adminUser = await prisma.users.create({
    data: {
      fullname: 'Admin User',
      username: 'admin',
      password: await argon.hash('password'),
      role: { connect: { role_id: adminRole.role_id } },
    },
  });

  console.log({ adminUser });
}

main()
  .catch((e: unknown) => {
    if (e instanceof Error) {
      console.error('Seeding failed:', e.message);
    } else {
      console.error('Seeding failed with unknown error:', e);
    }
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect().then(() => {
      console.log('Disconnected from DB');
    });
  });
