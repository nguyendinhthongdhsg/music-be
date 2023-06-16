const express = require('express');
const router = express.Router();
const upload = require('../util/upload');

const nationalController = require('../app/controllers/NationalController');

router.get('/', nationalController.get);
router.put('/put', nationalController.put);
router.post('/post', upload.single('file'), nationalController.post);

module.exports = router;
