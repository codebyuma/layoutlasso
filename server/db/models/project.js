
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ProjectSchema = new mongoose.Schema({
	name: String,
	user: { type: ObjectId, ref: 'User'},
	pages: [{
		name: { type: String, unique: true, required: true},
		html: String,
		css: String
	}] 
})

mongoose.model('Project', ProjectSchema);