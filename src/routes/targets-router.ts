import express from 'express'
import { getAllData } from '../controllers/targets-controller'

const router = express.Router()

router.get('/', getAllData)

export default router