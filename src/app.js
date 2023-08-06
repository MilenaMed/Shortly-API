import express from "express";
import dotenv from "dotenv";
import pg from "pg"

const app = express();

//Ferramentas
app.use(express.json())
dotenv.config()

//SQL
const { Pool } = pg

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
};

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

export const db = new Pool(configDatabase);

//Porta
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})