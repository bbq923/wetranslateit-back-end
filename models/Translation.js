var mongoose = require('mongoose');

module.exports = mongoose.model('Translation', {
    articleid: String,
    uniqueselector: String,
    text: String
})