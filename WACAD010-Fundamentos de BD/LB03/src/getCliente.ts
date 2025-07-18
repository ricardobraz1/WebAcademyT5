import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para buscar um cliente por ID
async function getCliente(id: number) {
  const cliente = await prisma.cliente.findUnique({
    where: { id },
    include: { enderecos: true },
  });

  console.log('Cliente encontrado:', cliente);
}

getCliente(1)
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
