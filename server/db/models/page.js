
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var PageSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true},
	html: String,
	css: String,
	grid: {}
})

module.exports = mongoose.model('Page', PageSchema);