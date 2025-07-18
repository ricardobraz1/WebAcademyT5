import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para deletar um cliente e suas dependências por ID + Cascade
async function deleteCliente(id: number) {
  // Deletar endereços associados ao cliente
  await prisma.endereco.deleteMany({
    where: { clienteId: id },
  });

  // Deletar compras associadas ao cliente (se houver)
  await prisma.compra.deleteMany({
    where: { clienteId: id },
  });

  // Deletar o cliente
  const clienteDeletado = await prisma.cliente.delete({
    where: { id },
  });

  console.log('Cliente deletado:', clienteDeletado);
}

deleteCliente(1)
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
