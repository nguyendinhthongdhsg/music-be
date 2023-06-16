const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://nguyendinhthongdhsg:anhladuado1@database1.zxzprrz.mongodb.net/MusicDatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect Successly!')
    }
    catch (error){
        console.log('Connect Failure!')
    }
}

module.exports = { connect };