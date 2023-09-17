import express from 'express'
import { getData, createData, detailsData } from '../controllers/attendances-controller'

const router = express.Router()

router.get('/', getData)
router.post('/', createData)
router.get('/:id', detailsData)

export default router