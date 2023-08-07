import express from "express";
import joi from "joi";
import { db } from "./database/database.conection.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";
import { nanoid } from "nanoid";

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

const urlsSchema = joi.object({
    url: joi.string().uri().required(),
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
        response.status(200).send({ token: token })
    } catch (err) {
        response.status(500).send(err)
    }
});

//POST - urls/shorten
app.post("/urls/shorten", async (request, response) => {
    const { authorization } = request.headers
    const token = authorization?.replace('Bearer ', '')
    const { url } = request.body
    const shortUrl = nanoid(8)

    const validation = urlsSchema.validate(request.body)
    if (validation.error) {
        return response.status(422).send("Preencha os dados corretamente")
    }

    if (!token) {
        return response.status(401).send("necessário um token para prosseguir")
    }
    const isLoged = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
    if (isLoged.rowCount === 0) {
        return response.status(401).send("Usuário não está logado")
    }

    try {
        await db.query(`INSERT INTO urls (urls, "shortUrl", "userId")
       VALUES ($1, $2, $3);`, [url, shortUrl, isLoged.rows[0].userId])

        const { rows } = await db.query(`SELECT * FROM urls WHERE "userId"= $1 AND "shortUrl" = $2;`, [isLoged.rows[0].id, shortUrl])
        response.status(200).send({ id: rows[0].id, shortUrl: rows[0].shortUrl })
    } catch (err) {
        response.status(500).send(err)
    }
});

//GET - /urls/:id

app.get("/urls/:id", async (request, response) => {
    const { id } = request.params

    try {
        const url = await db.query(`SELECT * FROM urls WHERE id=$1;`, [id]);
        if (url.rowCount === 0) {
            return response.status(404).send("Url não encontrada")
        }

        return response.status(200).send({ id: url.rows[0].id, url: url.rows[0].urls, shortUrl: url.rows[0].shortUrl });

    } catch (err) {
        response.status(500).send(err)
    }
});

//GET - /urls/open/:shortUrl
app.get("/urls/open/:shortUrl", async (request, response) => {
    const { shortUrl } = request.params

    try {
        const chosenShortUrl = await db.query(`SELECT * FROM urls WHERE "shortUrl"=$1;`, [shortUrl]);
        if (chosenShortUrl.rowCount === 0) {
            return response.status(404).send("Url não encontrada")
        }

        await db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"=$1;`, [shortUrl])

        return response.redirect(chosenShortUrl.rows[0].urls)

    } catch (err) {
        response.status(500).send(err)
    }
});
//DELETE -/urls/:id
app.delete("/urls/:id", async (request, response) => {
    const { id } = request.params
    const { authorization } = request.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) {
        return response.status(401).send("necessário um token para prosseguir")
    }
    const isLoged = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
    if (isLoged.rowCount === 0) {
        return response.status(401).send("Usuário não está logado")
    }

    try {
        const url = await db.query(`SELECT * FROM urls WHERE id=$1;`, [id]);
        if (url.rowCount === 0) {
            return response.status(404).send("Url não encontrada")
        }
        if (url.rows[0].userId !== isLoged.rows[0].userId) {
            return response.status(401).send("Você não pode deletar esse dado")
        }
        await db.query(`DELETE FROM urls WHERE id=$1;`, [id])
        return response.status(204).send("Url deletada com sucesso")

    } catch (err) {
        response.status(500).send(err)
    }
});

//GET - /users/me
app.get("/users/me", async (request, response) => {
    const { authorization } = request.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) {
        return response.status(401).send("necessário um token para prosseguir")
    }
    const isLoged = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
    if (isLoged.rowCount === 0) {
        return response.status(401).send("Usuário não está logado")
    }
    try {
        const { rows: [user] } = await db.query(`
                SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount"
                FROM users
                JOIN urls ON users.id = urls."userId"
                WHERE users.id=$1
                GROUP BY users.id, users.name;
            `, [isLoged.rows[0].userId]);


        const { rows: shortenedUrls } = await db.query(`SELECT id, urls, "shortUrl", "visitCount" FROM urls WHERE "userId"=$1;`,
            [isLoged.rows[0].userId])

        //console.log({user, shortenedUrls: [...urls] })

        return response.status(200).send({ ...user, shortenedUrls: [...shortenedUrls] })

    } catch (err) {
        response.status(500).send(err)
    }
});

//GET - /ranking
app.get("/ranking", async (request, response) => {
    try {
        const racking = await db.query(`
        SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", SUM(urls."visitCount") AS "visitCount"
        FROM users 
        LEFT JOIN urls ON users.id = urls."userId"
        GROUP BY users.id, users.name
        ORDER BY "visitCount" DESC NULLS LAST
        LIMIT 10;`);

        return response.status(200).send(racking.rows)

    } catch (err) {
        response.status(500).send(err)
    }
});

//Porta
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Running server on port ${PORT}`))