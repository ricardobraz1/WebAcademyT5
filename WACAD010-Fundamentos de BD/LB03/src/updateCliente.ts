import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para atualizar o email e celular de um cliente
async function updateCliente(id: number) {
  const clienteAtualizado = await prisma.cliente.update({
    where: { id },
    data: {
      email: 'novoemail@gmail.com',
      celular: '9876543210',
    },
  });

  console.log('Cliente atualizado:', clienteAtualizado);
}

updateCliente(1)
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
