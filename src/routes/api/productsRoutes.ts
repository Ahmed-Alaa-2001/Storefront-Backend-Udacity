import { Router } from "express";
import CreateController from '../../controllers/ProductControllers/CreateController'
import ShowAllController from '../../controllers/ProductControllers/ShowAllController'
import ShowOneController from '../../controllers/ProductControllers/ShowOneController'
import DeleteAllController from '../../controllers/ProductControllers/DeleteAllController'
import DeleteOneController from '../../controllers/ProductControllers/DeleteOneController'
import EditController from '../../controllers/ProductControllers/EditController'
const router = Router();

router.post('/add', CreateController);
router.get('/showall', ShowAllController);
router.get('/show/:id', ShowOneController);
router.delete('/deleteall', DeleteAllController);
router.delete('/delete/:id', DeleteOneController);
router.patch('/edit/:id', EditController);
export default router;