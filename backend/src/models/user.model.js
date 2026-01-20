import { db } from "../config/db.js"

export const findUserByEmail = async (email) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', 
            [email])

        return rows[0];

    } catch (error) {
        console.error('Erreur dans findUserByEmail', error.message)
        throw error; 
    }
};

export const createUser = async ({ email, password, avatar }) => {
    try {
        await db.query('INSERT INTO users (email, password, avatar) VALUES (?,?,?)',
        [email, password, avatar])
    } catch (error) {
        console.error('Erreur dans findUserByEmail', error.message)
        throw error;
    }
};