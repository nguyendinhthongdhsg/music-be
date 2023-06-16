const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileMusic = new Schema (
    {
        musicId: { type: String, require: true, },
        data: {type: Buffer, require: true},
        contentType: { type: String, require: true, }, 
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('FileMusic', FileMusic);
