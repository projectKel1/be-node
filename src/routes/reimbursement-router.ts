import express from 'express'
import { createData, deleteData, detailsData, getAllData, updateData } from '../controllers/reimbursement-controller'
import ReimbursementMiddleware from '../middleware/reimbursement-middleware'

const router = express.Router()

router.get('/', getAllData)
router.post('/', ReimbursementMiddleware, createData)
router.get('/:id', detailsData)
router.put('/:id', ReimbursementMiddleware, updateData)
router.delete('/:id', deleteData)

export default router