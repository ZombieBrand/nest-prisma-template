import { PrismaClient } from '@prisma/client';
import { coffees } from '../mock/coffees';
import { products } from '../mock/products';
const prisma = new PrismaClient();

async function main() {
  for (const coffee of coffees) {
    await prisma.coffee.create({
      data: coffee,
    });
  }
  for (const product of products) {
    await prisma.product.create({
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
