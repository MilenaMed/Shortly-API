import { Router } from "express"
import { validateSchema } from "../middlewares/validateSchema.js"
import { postLogin, postSignUp } from "../controllers/AuthControlles.js"
import { loginSchema, signUpSchema } from "../schemas/AuthSchemas.js"

const authRouter = Router()

authRouter.post("/signup", validateSchema(signUpSchema), postSignUp)
authRouter.post("/signin", validateSchema(loginSchema), postLogin)

export default authRouter