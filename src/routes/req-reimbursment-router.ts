import express from 'express'
import { getAllData } from '../controllers/req-reimbursment-controller'
const router = express.Router()

router.get('/', getAllData)

export default router