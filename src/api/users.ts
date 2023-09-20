import axios from 'axios'
import 'dotenv/config'
import { Request } from 'express'
import { UserData } from '../services/reimbursement-service'
const env = process.env

export const getAllUsers = async (req: Request, managerId: number) => {

    const request = await axios.get(`${env.ENDPOINT_URL}/users`, {
        headers: {
            "Authorization": req.user.token
        },
        params: {
            manager_id: managerId
        }
    })
    const response = request.data.data
    let user: UserData[] = []

    if(!response) return null
    response.map((value: any) => {
        let data = {
            id: value.id,
            fullname: value.fullname
        }

        user.push(data)
    })

    return user

}