import {Router} from 'express';
import { loginController, registerUserController } from '../controllers/controllers.js';


const router = Router();



router
.route("/register")
.post(registerUserController)

router
.route("/login")
.post(loginController)




export default router;