import express from 'express'
import 'dotenv/config'

const app: express.Application = express()
const env = process.env

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(env.SERVER_PORT, () => {
    console.log(`Listening on port ${env.SERVER_PORT}`)
})