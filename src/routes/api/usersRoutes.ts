import { Router } from "express";
import {postSignUp,postLogIn} from '../../controllers/UserControllers/AuthController'
import ShowAllController from '../../controllers/UserControllers/ShowAllController'
import ShowOneController from '../../controllers/UserControllers/ShowOneController'
import DeleteAllController from '../../controllers/UserControllers/DeleteAllController'
import DeleteOneController from '../../controllers/UserControllers/DeleteOneController'
import EditController from '../../controllers/UserControllers/EditController'
import bodyParser from "body-parser";
const router = Router();

router.post('/signup',postSignUp);
router.get('/showall', ShowAllController);
router.get('/show/:id', ShowOneController);
router.delete('/deleteall', DeleteAllController);
router.delete('/delete/:id', DeleteOneController);
router.patch('/edit/:id', EditController);
router.post('/login', postLogIn);
export default router;