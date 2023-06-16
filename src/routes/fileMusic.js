const express = require('express');
const router = express.Router();

const fileMusicController = require('../app/controllers/FileMusicController');

router.get('/:musicId', fileMusicController.get);

module.exports = router;
