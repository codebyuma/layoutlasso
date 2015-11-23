
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var PageSchema = new mongoose.Schema({
	project: {type: ObjectId, ref: "Project", required: true},
	name: { type: String, unique: true, required: true},
	html: String,
	css: String
})

mongoose.model('Page', PageSchema);