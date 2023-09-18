import express from 'express'
import { getData, createData, detailsData, updateData } from '../controllers/attendances-controller'

const router = express.Router()

router.get('/', getData)
router.post('/', createData)
router.get('/:id', detailsData)
router.put('/:id', updateData)

export default router