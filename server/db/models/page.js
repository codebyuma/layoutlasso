
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var PageSchema = new mongoose.Schema({
	project: {type: ObjectId, ref: "Project", required: true},
	name: { type: String, unique: true, required: true}, // @OB/ND could be problematic
	html: String,
	css: String,
	grid: {} // @OB/ND what is this for?
})

module.exports = mongoose.model('Page', PageSchema);