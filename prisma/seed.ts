import { PrismaClient } from '@prisma/client';
import { coffees } from '../mock/coffees';

const prisma = new PrismaClient();

async function main() {
  for (const product of coffees) {
    await prisma.coffee.create({
      data: product,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
