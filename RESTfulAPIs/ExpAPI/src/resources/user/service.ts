import { PrismaClient } from '@prisma/client';
import { hashPassword } from './helper';
import { User } from './types';

const prisma = new PrismaClient();

export async function createUser(data: User) {
  data.password = await hashPassword(data.password);
  return await prisma.user.create({ data });
}

export async function getUserById(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function updateUser(id: string, data: Partial<User>) {
  if (data.password) data.password = await hashPassword(data.password);
  return await prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: string) {
  return await prisma.user.delete({ where: { id } });
}

export async function getAllUsers() {
  return await prisma.user.findMany();
}