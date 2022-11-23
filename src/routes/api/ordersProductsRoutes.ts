import { Router } from "express";
import { CreateController } from '../../controllers/OrdersProductsController'
import { ShowAllController } from '../../controllers/OrdersProductsController'
import { ShowOneController } from '../../controllers/OrdersProductsController'
import { DeleteOneController } from '../../controllers/OrdersProductsController'
import { EditController } from '../../controllers/OrdersProductsController'

const router = Router();

router.post('/add/:id', CreateController);
router.get('/showall/:id/products', ShowAllController);
router.get('/show/:id/products/:id', ShowOneController);
router.delete('/delete/:id/products/:id', DeleteOneController);
router.patch('/edit/:id/products/:id', EditController);
export default router;