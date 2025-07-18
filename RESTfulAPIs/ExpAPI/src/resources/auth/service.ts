import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from './helper';
import { SignupPayload, AuthPayload } from './types';

const prisma = new PrismaClient();

export async function signup(data: SignupPayload) {
  const hashedPassword = await hashPassword(data.password);
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      userTypeId: data.userTypeId,
    },
  });
}

export async function login(data: AuthPayload) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (user && await comparePassword(data.password, user.password)) {
    return user;
  }
  throw new Error("Credenciais inválidas");
}