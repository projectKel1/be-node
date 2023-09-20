import express from 'express';
import { validateUserRole } from '../middleware/report-middleware';
import {
    getAllData,
    createData,
    detailsData,
    updateData,
    deleteData,
} from '../controllers/report-controller';

const router = express.Router();

router.get('/target_reports', validateUserRole, getAllData);
router.post('/target_reports', validateUserRole, createData);
router.get('/target_reports/:id', detailsData);
router.put('/target_reports/:id', updateData);
router.delete('/target_reports/:id', deleteData);

export default router;
