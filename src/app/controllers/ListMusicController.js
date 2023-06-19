const ListMusic = require('../models/ListMusic');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const FileMusic = require('../models/FileMusic');

class ListMusicController {
    // [GET] /listMusic/bxh
    getBXH(req, res, next) {
        ListMusic.find({})
            .then(listFind => {
                listFind = mutipleMongooseToObject(listFind);
                if (listFind[0]) {
                    const length = listFind.length;
                    let max, temp;
                    for (let i = 0; i < length - 1; i++) {
                        max = i;
                        for (let j = i + 1; j < length; j++)
                            if (listFind[max].listens < listFind[j].listens)
                                max = j;
                        if (max !== i) {
                            temp = listFind[i];
                            listFind[i] = listFind[max];
                            listFind[max] = temp;
                        }
                    }
                    res.json(listFind);
                }
            })
            .catch(next)
    }

    // [GET] /listMusic/theme
    getTheme(req, res, next) {
        ListMusic.find({ genre: req.query.q })
            .then(listFind => {
                listFind = mutipleMongooseToObject(listFind);
                if (listFind[0]) {
                    const length = listFind.length;
                    let max, temp;
                    for (let i = 0; i < length - 1; i++) {
                        max = i;
                        for (let j = i + 1; j < length; j++)
                            if (listFind[max].listens < listFind[j].listens)
                                max = j;
                        if (max !== i) {
                            temp = listFind[i];
                            listFind[i] = listFind[max];
                            listFind[max] = temp;
                        }
                    }
                    res.json(listFind);
                }
                else {
                    ListMusic.find({ country: req.query.q })
                        .then(listFind => {
                            listFind = mutipleMongooseToObject(listFind);
                            const length = listFind.length;
                            let max, temp;
                            for (let i = 0; i < length - 1; i++) {
                                max = i;
                                for (let j = i + 1; j < length; j++)
                                    if (listFind[max].listens < listFind[j].listens)
                                        max = j;
                                if (max !== i) {
                                    temp = listFind[i];
                                    listFind[i] = listFind[max];
                                    listFind[max] = temp;
                                }
                            }
                            res.json(listFind);
                        })
                        .catch(next)
                }
            })
            .catch(next)
    }

    // [GET] /listMusic/singer
    getSinger(req, res, next) {
        ListMusic.find({})
            .then(listFind => {
                listFind = mutipleMongooseToObject(listFind);
                const listRes = [];                
                const lengthFind = listFind.length;
                for(let i = 0 ; i < lengthFind; i++) {
                    if(listFind[i].singerName.indexOf(req.query.q) !== -1)
                        listRes.push(listFind[i]);
                }
                const lengthRes = listRes.length;            
                    let max, temp;
                    for (let i = 0; i < lengthRes - 1; i++) {
                        max = i;
                        for (let j = i + 1; j < lengthRes; j++)
                            if (listRes[max].listens < listRes[j].listens)
                                max = j;
                        if (max !== i) {
                            temp = listRes[i];
                            listRes[i] = listRes[max];
                            listRes[max] = temp;
                        }
                    }
                res.json(listRes);
            })
            .catch(next)
    }

    // [GET] /listMusic/item
    getItem(req, res, next) {
        ListMusic.find({})
            .then(listFind => {
                listFind = mutipleMongooseToObject(listFind);
                if (listFind[0]) {
                    const listReq = req.query.listMusicJSON;
                    if(listReq) {
                        const listRes = [];
                        const lengthFind = listFind.length;
                        const lengthReq = listReq.length;
                        for (let i = 0; i < lengthFind; i++)
                            for (let j = 0; j < lengthReq; j++)
                                if (listFind[i].musicId === listReq[j])
                                    listRes.push(listFind[i]);
                        const lengthRes = listRes.length;            
                        let max, temp;
                        for (let i = 0; i < lengthRes - 1; i++) {
                            max = i;
                            for (let j = i + 1; j < lengthRes; j++)
                                if (listRes[max].listens < listRes[j].listens)
                                    max = j;
                            if (max !== i) {
                                temp = listRes[i];
                                listRes[i] = listRes[max];
                                listRes[max] = temp;
                            }
                        }
                        res.json(listRes);
                    }
                    else {
                        res.json([]);
                    }
                }
            })
            .catch(next)
    }

    // [GET] /listMusic/search
    getSearch(req, res, next) {
        ListMusic.find({})
            .then(listFind => {
                listFind = mutipleMongooseToObject(listFind);
                const listRes = [];                
                const lengthFind = listFind.length;
                const search = req.query.q.trim().toLocaleLowerCase();
                for(let i = 0 ; i < lengthFind; i++) {
                    if(listFind[i].musicName.toLocaleLowerCase().indexOf(search) !== -1)
                        listRes.push(listFind[i]);
                }
                const lengthRes = listRes.length;            
                    let max, temp;
                    for (let i = 0; i < lengthRes - 1; i++) {
                        max = i;
                        for (let j = i + 1; j < lengthRes; j++)
                            if (listRes[max].listens < listRes[j].listens)
                                max = j;
                        if (max !== i) {
                            temp = listRes[i];
                            listRes[i] = listRes[max];
                            listRes[max] = temp;
                        }
                    }
                res.json(listRes);
            })
            .catch(next)
    }

    //[PUT] /listMusic/put
    put(req, res, next) {
        ListMusic.findOne({ musicId: req.body.musicId })
            .then(listFind => {
                listFind.listens += 1;
                ListMusic.updateOne({ musicId: listFind.musicId }, listFind)
                    .then(() => res.sendStatus(200))
                    .catch(next)
            })
            .catch(next)
    }

    // [POST] /listMusic/post
    post(req, res, next) {
        ListMusic.findOne({ musicName: req.body.musicName })
            .then(listFind => {
                if(listFind)
                    res.json({error: `Bài hát '${listFind.musicName}' đã tồn tại`});
                else {
                    const formReq = req.body;
                    const fileReq = req.file;
                    const formDB = new ListMusic({
                        musicId: fileReq.originalname,
                        musicName: req.body.musicName.trim(),
                        musicImg: req.body.musicImg.trim(),
                        singerName: req.body.singerName.trim(),
                        genre: req.body.genre.trim(),
                        country: req.body.country.trim(),
                        listens: 0
                    });
                    formDB.save()
                        .then(() => {
                            const fileDB = new FileMusic({
                                musicId: fileReq.originalname,
                                data: fileReq.buffer,
                                contentType: fileReq.mimetype
                            });
                            fileDB.save()
                                .then(() => res.json({ message: `Đăng bài hát '${formReq.musicName}' thành công` }))
                                .catch(next)
                        })
                        .catch(next)
                }
            })
            .catch(next)
    }

}

module.exports = new ListMusicController;
