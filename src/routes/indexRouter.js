import { Router } from "express"
import usersRouter from "./usersRouter.js"
import authRouter from "./AuthRouter.js"
import urlRouter from "./urlRouter.js"

const router = Router()

router.use(authRouter)
router.use(usersRouter)
router.use(urlRouter)

export default router