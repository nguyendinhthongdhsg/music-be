const express = require('express');
const router = express.Router();
const upload = require('../util/upload');

const genreController = require('../app/controllers/GenreController');

router.get('/', genreController.get);
router.put('/put', genreController.put);
router.post('/post', upload.single('file'), genreController.post);

module.exports = router;
