import { Router } from "express";
import productController from "./controller";
import { productSchema } from "./schema";
import validate from "../../middlewares/validate";
import checkAdmin from "../../middlewares/checkAdmin";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.get('/',checkAuth,productController.index);
router.post('/',checkAuth,checkAdmin,validate(productSchema), productController.create);
router.get('/:id',checkAuth,productController.read);
router.put('/:id',checkAuth,checkAdmin,validate(productSchema), productController.update);
router.delete('/:id',checkAuth,checkAdmin,productController.remove);

export default router;
