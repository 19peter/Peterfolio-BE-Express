const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');
const auth = require('../middleware/auth');

router.get('/', cvController.getCvData);
router.put('/', auth, cvController.updateCvData);

module.exports = router;
