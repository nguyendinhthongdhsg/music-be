const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Genre = new Schema (
    {
        name: { type: String, require: true, },
        linkImg: { type: String, require: true, },
        listens : { type: Number, require: true, }, 
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Genre', Genre);