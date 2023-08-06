import express from "express";
import joi from "joi";
import { db } from "./database/database.conection.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";

const app = express();

//Ferramentas
app.use(express.json())

//joi
const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required()
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

//POST - signup
app.post('/signup', async (request, response) => {
    const { name, password, confirmPassword, email } = request.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const existingUser = await db.query(`SELECT * FROM users WHERE email=$1;`, [email])

    const validation = signUpSchema.validate(request.body)
    if (validation.error) {
        return response.status(422).send("Preencha os dados corretamente")
    }

    if (existingUser.rowCount !== 0) {
        return response.status(409).send("Email já cadastrado")
    }
    if (password !== confirmPassword) {
        return response.status(422).send("Senhas diferentes")
    }

    try {
        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, encryptedPassword])
        return response.status(201).send("Usuário Cadastrado!")
    } catch (err) {
        return response.status(500).send(err.message)
    }
});

//POST - signin
app.post("/signin", async (request, response) => {
    const token = uuid()
    const { email, password } = request.body
    const existingUser = await db.query(`SELECT * FROM users WHERE email=$1;`, [email])
    const validation = loginSchema.validate(request.body)
    if (validation.error) {
        return response.status(422).send("Preencha os dados corretamente")
    }
    if (existingUser.rowCount === 0) {
        return response.status(401).send("usuário não cadastrado")
    }

    const correctPassword = bcrypt.compareSync(password, existingUser.rows[0].password)
    if (!correctPassword) {
        return response.status(401).send("senha incorreta")
    }
    
    try {
        await db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2);`, [existingUser.rows[0].id, token])
        response.status(200).send(token)
    } catch (err) {
        response.status(500).send(err)
    }
});

//Porta
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Running server on port ${PORT}`))