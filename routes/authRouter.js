import express from "express";
import { loginSchema, registerSchema, subscriptionSchema, emailSchema } from "../schemas/usersSchemas.js";
import validateBody from "../middleware/validateBody.js";
import auth from "../controllers/auth.js";
import authenticate from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";



const authRouter = express.Router();


authRouter.post("/register", validateBody(registerSchema), auth.register)
authRouter.post("/login", validateBody(loginSchema), auth.login)
authRouter.post("/logout", authenticate, auth.logOut)
authRouter.get("/current", authenticate, auth.getCurrent)
authRouter.patch("/", authenticate, validateBody(subscriptionSchema), auth.updateSub)
authRouter.patch("/avatars", authenticate, upload.single("avatar"), auth.updateAvatar)

authRouter.post("/verify", validateBody(emailSchema), auth.resendVerification)


export default authRouter;