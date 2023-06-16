const fileMusicRouter = require('./fileMusic');
const genreRouter = require('./genre');
const listMusicRouter = require('./listMusic');
const nationalRouter = require('./national');
const singerRouter = require('./singer');

function routes(app) {
    app.use('/fileMusic', fileMusicRouter)
    app.use('/genre', genreRouter);
    app.use('/listMusic', listMusicRouter);
    app.use('/national', nationalRouter);
    app.use('/singer', singerRouter);
}

module.exports = routes;
