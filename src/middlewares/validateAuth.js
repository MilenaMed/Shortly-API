import { db } from "../database/database.conection.js"

export async function validateAuth(request, response, next) {
    const { authorization } = request.headers
    const token = authorization?.replace('Bearer ', '')
    try {
        if (!token) {
            return response.status(401).send("necessário um token para prosseguir")
        }
        const isLoged = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token])
        if (isLoged.rowCount === 0) {
            return response.status(401).send("Usuário não está logado")
        }
        response.locals.userId = isLoged.rows[0].userId
        next()
        
    } catch (err) {
        response.status(500).send(err)
    }
}
export default validateAuth;