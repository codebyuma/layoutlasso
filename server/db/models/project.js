
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ProjectSchema = new mongoose.Schema({
	name: String,
	user: { type: ObjectId, ref: 'User'},
	pages: [{type: ObjectId, ref: 'Page'}] 
})

mongoose.model('Project', ProjectSchema);