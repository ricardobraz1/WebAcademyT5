import { Request, Response } from 'express';
import * as userService from './service';

export async function createUser(req: Request, res: Response) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: "error"});
  }
}

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const data = req.body;
  const user = await userService.updateUser(id, data);
  res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  await userService.deleteUser(id);
  res.status(204).send();
}

export async function getAllUsers(req: Request, res: Response) {
  const users = await userService.getAllUsers();
  res.json(users);
}