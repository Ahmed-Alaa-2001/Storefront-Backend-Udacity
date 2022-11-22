import { Router } from "express";
import {postSignUp,postLogIn} from '../../controllers/UserControllers/AuthController'
import ShowAllController from '../../controllers/UserControllers/ShowAllController'
import ShowOneController from '../../controllers/UserControllers/ShowOneController'
import DeleteAllController from '../../controllers/UserControllers/DeleteAllController'
import DeleteOneController from '../../controllers/UserControllers/DeleteOneController'
import EditController from '../../controllers/UserControllers/EditController'
import bodyParser from "body-parser";
import requireAuth from "../../tests/middleware/auth";
const router = Router();

router.post('/signup',postSignUp);
router.get('/showall', requireAuth,ShowAllController);
router.get('/show/:id',requireAuth, ShowOneController);
router.delete('/deleteall',requireAuth, DeleteAllController);
router.delete('/delete/:id', requireAuth,DeleteOneController);
router.patch('/edit/:id',requireAuth, EditController);
router.post('/login', postLogIn);
export default router;