import express from 'express'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import path from 'path'
import authRoutes from './routes/auth.route.js'

config()
const app = express()

const __dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))

    app.get('*splat', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend','dist','index.html'))
    })
}


export default app
