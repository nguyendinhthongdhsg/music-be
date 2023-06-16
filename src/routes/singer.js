const express = require('express');
const router = express.Router();
const upload = require('../util/upload');

const singerController = require('../app/controllers/SingerController');

router.get('/', singerController.get);
router.put('/put', singerController.put);
router.post('/post', upload.single('file'), singerController.post);

module.exports = router;
