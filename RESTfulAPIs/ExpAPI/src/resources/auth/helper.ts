import { Request } from 'express';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10; //o número de saltos 

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function startSession(req: Request, userId: string, userType: string) {
  req.session.uid = userId;
  req.session.tipoUsuario = userType;
}

export function endSession(req: Request) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao destruir a sessão:", err);
    }
  });
}

export function getSessionUserId(req: Request): string | undefined {
  return req.session.uid;
}

export function getSessionUserType(req: Request): string | undefined {
  return req.session.tipoUsuario;
}