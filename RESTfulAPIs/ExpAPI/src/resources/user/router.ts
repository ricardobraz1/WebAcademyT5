import { Router } from 'express';
import * as userController from './controller';
import validate from '../../middlewares/validate';
import { userSchema } from './schema';

const router = Router();

router.post('/', validate(userSchema), userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', validate(userSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;