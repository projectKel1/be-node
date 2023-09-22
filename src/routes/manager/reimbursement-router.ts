import express from 'express'
import { index } from '../../controllers/manager/reimbursement-controller'
const router = express.Router()

router.get('/', index)

export default router