import { Router } from "express"
import { validateAuth } from "../middlewares/validateAuth.js"
import { getDataUser, getRanking } from "../controllers/usersControlles.js"

const usersRouter = Router()

usersRouter.get("/users/me", validateAuth, getDataUser)
usersRouter.get("/ranking", getRanking)

export default usersRouter