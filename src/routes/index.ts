import {Router} from 'express';
import ordersRoutes from './api/ordersRoutes'
import usersRoutes from './api/usersRoutes'
import productsRoutes from './api/productsRoutes'
import ordersProductsRoutes from './api/ordersProductsRoutes'
import tst from '../controllers/tst';

const router = Router();

router.get('/',tst)
router.use('/users',usersRoutes);
router.use('/products',productsRoutes);
router.use('/orders',ordersRoutes);
router.use('/orders-products',ordersProductsRoutes);

export default router;
