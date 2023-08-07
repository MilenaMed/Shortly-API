import { db } from "../database/database.conection.js";

//GET - /users/me
export async function getDataUser(request, response) {
    const { userId } = response.locals

    try {
        const { rows: [user] } = await db.query(`
                SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount"
                FROM users
                JOIN urls ON users.id = urls."userId"
                WHERE users.id=$1
                GROUP BY users.id, users.name;
            `, [userId]);


        const { rows: shortenedUrls } = await db.query(`SELECT id, urls AS "url", "shortUrl", "visitCount" FROM urls WHERE "userId" = $1;`,
            [userId])

        //console.log({user, shortenedUrls: [...urls] })

        return response.status(200).send({ ...user, shortenedUrls: [...shortenedUrls] })

    } catch (err) {
        response.status(500).send(err)
    }
}

//GET - /ranking
export async function getRanking (request, response){
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
};