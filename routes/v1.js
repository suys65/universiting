const express = require('express');

const { verifyToken, deprecated } = require('../middlewares');
const { createToken, tokenTest } = require('../controllers/v1');

const router = express.Router();

router.use(deprecated);

// POST /v1/token
router.post('/token', createToken);

// POST /v1/test
router.get('/test', verifyToken, tokenTest);

module.exports = router;
