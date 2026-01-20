import {db} from "../config/db.js"

export const categoryModel = {
    create: async(name) => {
        const sql = 'INSERT INTO categories (name) VALUES (?)'
        return db.query(sql, [name])
    },
    findByTitle: async () => {
        const sql = 'SELECT * FROM categories'
        const [rows] = await db.query(sql)
        return rows
    }
}