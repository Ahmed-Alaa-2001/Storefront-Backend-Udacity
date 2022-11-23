import { Router } from "express";
import { CreateController } from '../../controllers/ProductController'
import { ShowAllController } from '../../controllers/ProductController'
import { ShowOneController } from '../../controllers/ProductController'
import { DeleteOneController } from '../../controllers/ProductController'
import { EditController } from '../../controllers/ProductController'
import { DeleteAllController } from '../../controllers/ProductController'
import requireAuth from "../../tests/middleware/auth";
const router = Router();

router.post('/add', requireAuth,CreateController);
router.get('/showall',ShowAllController);
router.get('/show/:id', ShowOneController);
router.delete('/deleteall',requireAuth, DeleteAllController);
router.delete('/delete/:id',requireAuth, DeleteOneController);
router.patch('/edit/:id',requireAuth, EditController);
export default router;