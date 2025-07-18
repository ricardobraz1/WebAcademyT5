import { Router } from 'express';
import validate from '../../middlewares/validate';
import { changeLanguage } from './controller';
import { changeLanguageSchema } from './schema';

const router = Router();

router.post('/', validate(changeLanguageSchema), changeLanguage);

export default router;
