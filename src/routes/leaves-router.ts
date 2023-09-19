import express from 'express';
import { createData, deleteData, detailsData, getAllData, updateData } from '../controllers/leaves-controller';
import LeavesMiddleware from '../middleware/leave-middleware'

const router = express.Router()

router.get('/', getAllData);
router.post('/', LeavesMiddleware, createData);
router.get('/:id', detailsData);
router.put('/:id', LeavesMiddleware, updateData);
router.delete('/:id', deleteData);

export default router;