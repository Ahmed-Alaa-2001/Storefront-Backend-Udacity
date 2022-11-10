import {Router} from 'express';
import ordersRoutes from './api/ordersRoutes'
import usersRoutes from './api/usersRoutes'
import productsRoutes from './api/productsRoutes'
const router = Router();

router.use('users',usersRoutes);
router.use('products',productsRoutes);
router.use('orders',ordersRoutes);

export default router;
