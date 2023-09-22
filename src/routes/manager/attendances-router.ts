import express from 'express'
import { index } from '../../controllers/manager/attendances-controller'

const router = express.Router()

router.get('/', index)

export default router