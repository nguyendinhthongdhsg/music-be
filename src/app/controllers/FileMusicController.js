const FileMusic = require('../models/FileMusic');

class FileMusicController {
    // [GET] /fileMusic
    get(req, res, next) {
        FileMusic.findOne({musicId: req.params.musicId})
            .then(fileFind => res.send(fileFind.data))
            .catch(next)
    }
}

module.exports = new FileMusicController;
