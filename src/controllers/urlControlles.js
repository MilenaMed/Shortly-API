import { db } from "../database/database.conection.js"
import { nanoid } from "nanoid";

//POST - urls/shorten
export async function postUrlShorten(request, response) {
  const { url } = request.body;
  const shortUrl = nanoid(8);
  const { userId } = response.locals;

  try {
    await db.query(
      `INSERT INTO urls (urls, "shortUrl", "userId") VALUES ($1, $2, $3);`,
      [url, shortUrl, userId]
    );

    const { rows } = await db.query(
      `SELECT * FROM urls WHERE "userId" = $1 AND "shortUrl" = $2;`,
      [userId, shortUrl]
    );
    response.status(201).send({ id: rows[0].id, shortUrl: rows[0].shortUrl });
  } catch (err) {
    response.status(500).send(err);
  }
};

//GET - /urls/:id
export async function getUrlById(request, response){
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
};

//GET - /urls/open/:shortUrl
export async function getOpenShortUrl (request, response) {
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
};

//DELETE -/urls/:id
export async function deleteUrlsByUser (request, response){
    const { id } = request.params
    const { userId } = response.locals
    
    try {
        const url = await db.query(`SELECT * FROM urls WHERE id=$1;`, [id]);
        if (url.rowCount === 0) {
            return response.status(404).send("Url não encontrada")
        }
        if (url.rows[0].userId !== userId) {
            return response.status(401).send("Você não pode deletar esse dado")
        }
        await db.query(`DELETE FROM urls WHERE id=$1;`, [id])
        return response.status(204).send("Url deletada com sucesso")

    } catch (err) {
        response.status(500).send(err)
    }
};