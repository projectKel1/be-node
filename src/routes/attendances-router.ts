import express from 'express'
import { getData } from '../controllers/attendances-controller'

const router = express.Router()

router.get('/', getData)

export default router