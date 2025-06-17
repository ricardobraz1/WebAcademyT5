import { Router } from 'express';
import * as produtoController from '../controllers/produtoController';

const router = Router();

router.get('/produto', produtoController.index);
router.get('/produto/create', produtoController.createForm);
router.post('/produto/create', produtoController.create);
router.get('/produto/update/:id', produtoController.editForm);
router.post('/produto/update/:id', produtoController.update);
router.post('/produto/delete/:id', produtoController.remove);

export default router;
