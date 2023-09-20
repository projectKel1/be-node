import express from 'express'
import { createData, deleteData, detailsData, getAllData, updateData } from '../controllers/targets-controller'
import TargetMiddleware from '../middleware/target-middleware'
const router = express.Router()

router.get('/', getAllData)
router.post('/', TargetMiddleware, createData)
router.get('/:id', detailsData)
router.put('/:id', TargetMiddleware, updateData)
router.delete('/:id', deleteData)

export default router