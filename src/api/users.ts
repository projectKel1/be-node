import axios from 'axios'
import 'dotenv/config'
import { Request } from 'express'
const env = process.env

axios.create({
    baseURL: env.ENDPOINT_URL
})

export const getAllUsers = async (req: Request) => {

    const data = await axios.get('users', {
        headers: {
            "Authorization": req.user.token
        }
    })

    let newData = {}
    
    data.data.data.map((value: any) => {
        newData = {
            id: value.id,
            fullname: value.fullname
        }
    })

    return newData

}