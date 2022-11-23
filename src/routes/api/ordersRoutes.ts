import { Router } from "express";
import { CreateController } from '../../controllers/OrderControllers'
import { ShowAllController } from '../../controllers/OrderControllers'
import { ShowOneController } from '../../controllers/OrderControllers'
import { DeleteOneController } from '../../controllers/OrderControllers'
import { EditController } from '../../controllers/OrderControllers'
const router = Router();

router.post('/add', CreateController);
router.get('/showall', ShowAllController);
router.get('/show/:id', ShowOneController);
router.delete('/delete/:id', DeleteOneController);
router.patch('/edit/:id', EditController);
export default router;