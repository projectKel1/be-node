import express from 'express'
import RequestReimbursement from './reimbursement-router'
import RequestLeaves from './leaves-router'
import Attendances from './attendances-router'
import Targets from './targets-router'
import AuthMiddleware from '../middleware/auth-middleware'
import LevelMiddleware from '../middleware/level-middleware'

import ManagerRoute from './manager/index'

const router = express.Router()

router.use('/request-leaves', AuthMiddleware, RequestLeaves)
router.use('/request-reimbursement', AuthMiddleware, RequestReimbursement)
router.use('/attendances', AuthMiddleware, Attendances)
router.use('/targets', AuthMiddleware, LevelMiddleware(["manager", "c-level"]), Targets)

// Manager
router.use('/managers', AuthMiddleware, LevelMiddleware(["manager", "c-level"]), ManagerRoute)

export default router