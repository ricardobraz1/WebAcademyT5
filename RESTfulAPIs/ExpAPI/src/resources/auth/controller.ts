import { Request, Response } from 'express';
import * as authService from './service';
import { startSession, endSession } from './helper';

export async function signup(req: Request, res: Response) {
  try {
    const user = await authService.signup(req.body);
    startSession(req, user.id, user.userTypeId);
    res.status(201).json({ message: "Usuário registrado com sucesso", user });
  } catch (error) {
    res.status(400).json({ error:"erro" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const user = await authService.login(req.body);
    startSession(req, user.id, user.userTypeId);
    res.json({ message: "Login realizado com sucesso", user });
  } catch (error) {
    res.status(401).json({ error: "Credenciais inválidas" });
  }
}

export function logout(req: Request, res: Response) {
  endSession(req);
  res.json({ message: "Logout realizado com sucesso" });
}