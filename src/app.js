import express from "express";
import router from "./routes/indexRouter.js";

const app = express();

//Ferramentas
app.use(express.json())
app.use(router)


//Porta
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Running server on port ${PORT}`))