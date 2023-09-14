const express = require('express');
const router = express.Router();
const cutiController = require('../controllers/requestCutiController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', cutiController.createCuti);
router.get('/', cutiController.getCuti);
router.put('/:id', cutiController.updateCuti);
router.put('/edit/:id', cutiController.editCuti);
router.delete('/:id', cutiController.deleteCuti);

module.exports = router;