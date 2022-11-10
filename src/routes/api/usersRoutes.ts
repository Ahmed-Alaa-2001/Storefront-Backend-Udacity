import { Router } from "express";
import CreateController from '../../controllers/UserControllers/CreateController'
import ShowAllController from '../../controllers/UserControllers/ShowAllController'
import ShowOneController from '../../controllers/UserControllers/ShowOneController'
import DeleteAllController from '../../controllers/UserControllers/DeleteAllController'
import DeleteOneController from '../../controllers/UserControllers/DeleteOneController'
import EditController from '../../controllers/UserControllers/EditController'
import AuthenticateController from '../../controllers/UserControllers/AuthenticateController';
const router = Router();

router.post('/', CreateController);
router.get('/', ShowAllController);
router.get('/:id', ShowOneController);
router.delete('/',DeleteAllController)
router.delete('/:id',DeleteOneController)
router.patch('/:id',EditController)
router.post('/authenticate', AuthenticateController);
export default router;