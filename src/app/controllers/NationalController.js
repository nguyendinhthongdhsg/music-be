const National = require('../models/National');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class NationalController {
    // [GET] /national
    get(req, res, next) {
        National.find({})
            .then(nationalFind => {
                nationalFind = mutipleMongooseToObject(nationalFind);
                if(nationalFind[0]) {
                    const length = nationalFind.length;
                    let max, temp;
                    for(let i = 0; i < length - 1; i++) {
                        max = i;
                        for(let j = i + 1; j < length; j++) 
                            if(nationalFind[max].listens < nationalFind[j].listens)
                                max = j;
                        if(max !== i) {
                            temp = nationalFind[i];
                            nationalFind[i] = nationalFind[max];
                            nationalFind[max] = temp;
                        }
                    }
                    res.json(nationalFind);
                }
            })
            .catch(next)
    }

    //[PUT] /national/put
    put(req, res, next) {
        National.findOne({ name: req.body.name })
            .then(nationalFind => {
                nationalFind.listens += 1;
                National.updateOne({ name: nationalFind.name }, nationalFind)
                    .then(() => res.sendStatus(200))
                    .catch(next)
            })
            .catch(next)
    }

    // [POST] /national/post
    post(req, res, next) {
        National.findOne({ name: req.body.national})
            .then(nationalFind => {
                if(nationalFind)
                    res.json({ error: `Quốc gia '${nationalFind.name} đã tồn tại` })
                else {
                    const nationalDB = new National({
                        name: req.body.national,
                        linkImg: req.body.nationalImg,
                        listens: 0
                    });
                    nationalDB.save()
                        .then(() => res.json({ message: `Đăng quốc gia '${nationalDB.name}' thành công` }))
                        .catch(next)
                }
            })
            .catch(next)
    }
}

module.exports = new NationalController;

