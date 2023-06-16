const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListMusic = new Schema (
    {
        musicId: { type: String, require: true, },
        musicName: { type: String, require: true, },
        musicImg: { type: String, require: true, },
        singerName: { type: String, require: true, },
        genre: { type: String, require: true, },
        country: { type: String, require: true, },
        listens : { type: Number, require: true, }, 
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('ListMusic', ListMusic);
