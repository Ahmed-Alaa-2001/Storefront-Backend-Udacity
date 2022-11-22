import { Router } from "express";
import CreateController from '../../controllers/OrdersProductsController/CreateController'
import ShowAllController from '../../controllers/OrdersProductsController/ShowAllController'
import ShowOneController from '../../controllers/OrdersProductsController/ShowOneController'
import DeleteOneController from '../../controllers/OrdersProductsController/DeleteOneController'
import EditController from '../../controllers/OrdersProductsController/EditController'
const router = Router();

router.post('/add/:id', CreateController);
router.get('/showall/:id/products', ShowAllController);
router.get('/show/:id/products/:id', ShowOneController);
router.delete('/delete/:id/products/:id', DeleteOneController);
router.patch('/edit/:id/products/:id', EditController);
export default router;