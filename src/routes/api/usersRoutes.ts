import { Router } from "express";
import { postSignUp } from '../../controllers/UserController'
import { ShowAllController } from '../../controllers/UserController'
import { ShowOneController } from '../../controllers/UserController'
import { DeleteOneController } from '../../controllers/UserController'
import { EditController } from '../../controllers/UserController'
import { DeleteAllController } from '../../controllers/UserController'
import { postLogIn } from '../../controllers/UserController'
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