import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import ApiRouter from './routes/index'
import  './routes/reimbursement-router'
import requestLeavesRoutes from './routes/requestLeavesRoutes';

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
app.use('/', requestLeavesRoutes);

app.use(ApiRouter)

app.listen(env.SERVER_PORT, () => {
    console.log(`Listening on port ${env.SERVER_PORT}`)
})