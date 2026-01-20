import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import authRouter from './routes/auth.route.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())

app.use('/auth', authRouter)

export default app