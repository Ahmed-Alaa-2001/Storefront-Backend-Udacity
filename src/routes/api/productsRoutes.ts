import { Router } from "express";
import CreateController from '../../controllers/ProductControllers/CreateController'
import ShowAllController from '../../controllers/ProductControllers/ShowAllController'
import ShowOneController from '../../controllers/ProductControllers/ShowOneController'
import DeleteAllController from '../../controllers/ProductControllers/DeleteAllController'
import DeleteOneController from '../../controllers/ProductControllers/DeleteOneController'
import EditController from '../../controllers/ProductControllers/EditController'
import requireAuth from "../../tests/middleware/auth";
const router = Router();

router.post('/add', requireAuth,CreateController);
router.get('/showall',ShowAllController);
router.get('/show/:id', ShowOneController);
router.delete('/deleteall',requireAuth, DeleteAllController);
router.delete('/delete/:id',requireAuth, DeleteOneController);
router.patch('/edit/:id',requireAuth, EditController);
export default router;