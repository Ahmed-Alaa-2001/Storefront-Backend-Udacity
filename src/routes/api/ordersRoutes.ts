import { Router } from "express";
import CreateController from '../../controllers/OrderControllers/CreateController'
import ShowAllController from '../../controllers/OrderControllers/ShowAllController'
import ShowOneController from '../../controllers/OrderControllers/ShowOneController'
import DeleteOneController from '../../controllers/OrderControllers/DeleteOneController'
import EditController from '../../controllers/OrderControllers/EditController'
const router = Router();

router.post('/add', CreateController);
router.get('/showall', ShowAllController);
router.get('/show/:id', ShowOneController);
router.delete('/delete/:id', DeleteOneController);
router.patch('/edit/:id', EditController);
export default router;