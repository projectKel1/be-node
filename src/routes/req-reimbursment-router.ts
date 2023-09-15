import express from 'express'
import { createData, getAllData } from '../controllers/req-reimbursment-controller'
import reimbursmentMiddleware from '../middleware/reimbursment-middleware'

const router = express.Router()

router.get('/', getAllData)
router.post('/', reimbursmentMiddleware, createData)

export default router