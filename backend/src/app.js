import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import {db} from './config/db.js'

dotenv.config()

const app = express()
app.use(express.json)
db

app.use(cors())
app.use(helmet())

export default app