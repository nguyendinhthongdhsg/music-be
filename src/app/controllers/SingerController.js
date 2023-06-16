const Singer = require('../models/Singer');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SingerController {
    // [GET] /singer
    get(req, res, next) {
        Singer.find({})
            .then(singerFind => {
                singerFind = mutipleMongooseToObject(singerFind);
                if(singerFind[0]) {
                    const length = singerFind.length;
                    let max, temp;
                    for(let i = 0; i < length - 1; i++) {
                        max = i;
                        for(let j = i + 1; j < length; j++) 
                            if(singerFind[max].listens < singerFind[j].listens)
                                max = j;
                        if(max !== i) {
                            temp = singerFind[i];
                            singerFind[i] = singerFind[max];
                            singerFind[max] = temp;
                        }
                    }
                    res.json(singerFind);
                }
            })
            .catch(next)
    }

    //[PUT] /singer/put
    put(req, res, next) {
        Singer.findOne({ name: req.body.name })
            .then(singerFind => {
                singerFind.listens += 1;
                Singer.updateOne({ name: singerFind.name }, singerFind)
                    .then(() => res.sendStatus(200))
                    .catch(next)
            })
            .catch(next)
    }

    // [POST] /singer/post
    post(req, res, next) {
        Singer.findOne({ name: req.body.singer})
            .then(singerFind => {
                if(singerFind)
                    res.json({ error: `Nghệ sĩ '${singerFind.name} đã tồn tại` })
                else {
                    const singerDB = new Singer({
                        name: req.body.singer,
                        linkImg: req.body.singerImg,
                        listens: 0
                    });
                    singerDB.save()
                        .then(() => res.json({ message: `Đăng nghệ sĩ '${singerDB.name}' thành công` }))
                        .catch(next)
                }
            })
            .catch(next)
    }
}

module.exports = new SingerController;
