import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@delivery.com' },
    update: {},
    create: {
      email: 'admin@delivery.com',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  // Create cozinha user
  const cozinha = await prisma.user.upsert({
    where: { email: 'cozinha@delivery.com' },
    update: {},
    create: {
      email: 'cozinha@delivery.com',
      name: 'Cozinha User',
      role: 'COZINHA',
    },
  })

  // Create sample products
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Marmita Frango',
        description: 'Marmita com frango grelhado e legumes',
        price: 25.00,
        image: '/frango.jpg',
      },
      {
        name: 'Marmita Carne',
        description: 'Marmita com carne assada e arroz',
        price: 28.00,
        image: '/carne.jpg',
      },
      {
        name: 'Marmita Vegetariana',
        description: 'Marmita vegetariana com quinoa e vegetais',
        price: 22.00,
        image: '/vegetariana.jpg',
      },
    ],
  })

  console.log({ admin, cozinha, products })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
