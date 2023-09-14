const express = require('express');
const router = express.Router();
const presensiController = require('../controllers/presensiController');

router.get('/', presensiController.getPresensi);
router.get('/my-presensi/:userId', presensiController.getMyPresensi);
router.post('/', presensiController.createPresensi);

module.exports = router;