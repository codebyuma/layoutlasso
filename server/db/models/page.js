
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var PageSchema = new mongoose.Schema({
	name: { type: String, required: true},
	css: String,
	grid: []
})

module.exports = mongoose.model('Page', PageSchema);