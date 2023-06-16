const Genre = require('../models/Genre');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class GenreController {
    // [GET] /genre
    get(req, res, next) {
        Genre.find({})
            .then(genreFind => {
                genreFind = mutipleMongooseToObject(genreFind);
                if(genreFind[0]) {
                    const length = genreFind.length;
                    let max, temp;
                    for(let i = 0; i < length - 1; i++) {
                        max = i;
                        for(let j = i + 1; j < length; j++) 
                            if(genreFind[max].listens < genreFind[j].listens)
                                max = j;
                        if(max !== i) {
                            temp = genreFind[i];
                            genreFind[i] = genreFind[max];
                            genreFind[max] = temp;
                        }
                    }
                    res.json(genreFind);
                }
            })
            .catch(next)
    }

    //[PUT] /genre/put
    put(req, res, next) {
        Genre.findOne({ name: req.body.name })
            .then(genreFind => {
                genreFind.listens += 1;
                Genre.updateOne({ name: genreFind.name }, genreFind)
                    .then(() => res.sendStatus(200))
                    .catch(next)
            })
            .catch(next)
    }

    // [POST] /genre/post
    post(req, res, next) {
        Genre.findOne({ name: req.body.genre})
            .then(genreFind => {
                if(genreFind)
                    res.json({ error: `Thể loại '${genreFind.name} đã tồn tại` })
                else {
                    const genreDB = new Genre({
                        name: req.body.genre,
                        linkImg: req.body.genreImg,
                        listens: 0
                    });
                    genreDB.save()
                        .then(() => res.json({ message: `Đăng thể loại '${genreDB.name}' thành công` }))
                        .catch(next)
                }
            })
            .catch(next)
    }
}

module.exports = new GenreController;
