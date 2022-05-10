import { PrismaClient } from '@prisma/client';
import { coffees } from '../mock/coffees';
import { products } from '../mock/products';
import { users } from '../mock/user';
import { flavorsTranserConnectOrCreate } from '../src/coffees/utils/transerConnectOrCreate';
const prisma = new PrismaClient();

async function main() {
  for (const coffee of coffees) {
    const { flavors, ...coffeeData } = coffee;
    await prisma.coffee.create({
      data: {
        ...coffeeData,
        flavors: {
          connectOrCreate: flavorsTranserConnectOrCreate(flavors),
        },
      },
    });
  }
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
  for (const user of users) {
    await prisma.user.create({
      data: user,
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
