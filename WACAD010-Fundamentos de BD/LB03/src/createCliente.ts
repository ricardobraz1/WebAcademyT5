import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Função para criar um novo cliente
async function createCliente() {
  const novoCliente = await prisma.cliente.create({
    data: {
      nome: 'João Silva',
      cpf: '12345678910',
      celular: '1234567890',
      email: 'joao@gmail.com',
      dataNascimento: new Date('1990-05-15'),
      enderecos: {
        create: [
          {
            logradouro: 'Rua Exemplo, 123',
            cidade: 'São Paulo',
            estado: 'SP',
            cep: '01234-567',
          },
        ],
      },
    },
  });

  console.log('Cliente criado:', novoCliente);
}

createCliente()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
