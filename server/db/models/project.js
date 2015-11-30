'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ProjectSchema = new mongoose.Schema({
	name: String,
	user: { type: ObjectId, ref: 'User'},
	pages: [{type: ObjectId, ref: 'Page'}] 
})

module.exports = mongoose.model('Project', ProjectSchema);