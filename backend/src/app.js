import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import {db} from './config/db.js'
import catRoutes from './routes/category.route.js'
dotenv.config()

const app = express()
app.use(express.json())
db

app.use(cors())
app.use(helmet())

app.use('/categories', catRoutes)


export default app