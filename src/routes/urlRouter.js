import validateAuth from "../middlewares/validateAuth.js";
import urlsSchema from "../schemas/UrlSchemas.js";
import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { postUrlShorten, getUrlById, getOpenShortUrl, deleteUrlsByUser} from "../controllers/urlControlles.js";

const urlRouter = Router()

urlRouter.post("/urls/shorten", validateSchema(urlsSchema), validateAuth, postUrlShorten)
urlRouter.get("/urls/:id", getUrlById)
urlRouter.get("/urls/open/:shortUrl", getOpenShortUrl)
urlRouter.delete("/urls/:id", validateAuth, deleteUrlsByUser)

export default urlRouter