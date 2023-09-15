import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import ReimburmentRouter from './routes/reimbursment-router'
import AuthMiddleware from './middleware/auth-middleware'

declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}

const app: express.Application = express()
const env = process.env

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/request-reimbursment', AuthMiddleware, ReimburmentRouter)

app.listen(env.SERVER_PORT, () => {
    console.log(`Listening on port ${env.SERVER_PORT}`)
})