import express from "express";
import { loginSchema, registerSchema, subscriptionSchema } from "../schemas/usersSchemas.js";
import validateBody from "../helpers/validateBody.js";
import auth from "../controllers/auth.js";
import authenticate from "../helpers/authenticate.js";



const authRouter = express.Router();


authRouter.post("/register", validateBody(registerSchema), auth.register)
authRouter.post("/login", validateBody(loginSchema), auth.login)
authRouter.post("/logout", authenticate, auth.logOut)
authRouter.get("/current", authenticate, auth.getCurrent)
authRouter.patch("/", authenticate, validateBody(subscriptionSchema), auth.updateSub)

export default authRouter;