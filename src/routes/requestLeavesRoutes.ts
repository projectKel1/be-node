import express from 'express';
import * as requestLeavesController from '../controllers/requestLeavesController';

const router = express.Router();

router.get('/request-leaves', requestLeavesController.getAllRequestLeaves);

router.post('/request-leaves', requestLeavesController.createRequestLeave);

router.get('/request-leaves/:user_id', requestLeavesController.getRequestLeaveByUserId);

router.put('/request-leaves/:leaves_id', requestLeavesController.updateRequestLeaveById);

router.delete('/request-leaves/:leaves_id', requestLeavesController.deleteRequestLeaveById);

export default router;