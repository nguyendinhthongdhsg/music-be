const express = require('express');
const router = express.Router();
const upload = require('../util/upload');

const listMusicController = require('../app/controllers/ListMusicController');

router.get('/bxh', listMusicController.getBXH);
router.get('/theme', listMusicController.getTheme);
router.get('/singer', listMusicController.getSinger);
router.get('/item', listMusicController.getItem);
router.get('/search', listMusicController.getSearch);
router.put('/put', listMusicController.put);
router.post('/post', upload.single('file'), listMusicController.post);

module.exports = router;
