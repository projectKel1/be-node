import express, { Request, Response } from 'express'
import 'dotenv/config'
import RequestReimburmentRouter from './routes/req-reimbursment-router'

const app: express.Application = express()
const env = process.env

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/request-reimbursment', RequestReimburmentRouter)

app.listen(env.SERVER_PORT, () => {
    console.log(`Listening on port ${env.SERVER_PORT}`)
})