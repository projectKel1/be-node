import express from 'express'
import { createData, getAllData } from '../controllers/targets-controller'
import TargetMiddleware from '../middleware/target-middleware'

const router = express.Router()

router.get('/', getAllData)
router.post('/', TargetMiddleware, createData)

export default router