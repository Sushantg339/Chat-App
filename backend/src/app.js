import express from 'express'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import authRoutes from './routes/auth.route.js'
config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())

app.use('/api/auth' , authRoutes)

export default app