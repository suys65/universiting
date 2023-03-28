const express = require('express');
const room = require('../controllers/room_ctr')
const router = express.Router();


router.post('/roommaker', room.roommaker)




module.exports = router;