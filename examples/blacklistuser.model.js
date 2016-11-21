var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blacklistuser = new Schema ({
	idUser : String,
	createdAt: Date,
	lastMessageAt: Date,
	message: [String]
});

module.exports = mongoose.model('BlacklistUser', blacklistuser);