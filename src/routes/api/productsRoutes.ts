import { Router } from "express";
import CreateController from '../../controllers/ProductControllers/CreateController'
import ShowAllController from '../../controllers/ProductControllers/ShowAllController'
import ShowOneController from '../../controllers/ProductControllers/ShowOneController'
import DeleteAllController from '../../controllers/ProductControllers/DeleteAllController'
import DeleteOneController from '../../controllers/ProductControllers/DeleteOneController'
import EditController from '../../controllers/ProductControllers/EditController'
const router = Router();

router.post('/', CreateController);
router.get('/', ShowAllController);
router.get('/:id', ShowOneController);
router.delete('/',DeleteAllController)
router.delete('/:id',DeleteOneController)
router.patch('/:id',EditController)
export default router;