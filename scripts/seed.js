const { categories } = require('./data');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    categories.map((category) =>
      prisma.category.upsert({ where: { name: category.name }, update: category, create: category })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Failed to seed db:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
