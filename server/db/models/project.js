'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ProjectSchema = new mongoose.Schema({
	name: String,
	pages: [{type: ObjectId, ref: 'Page'}] 
})

module.exports = mongoose.model('Project', ProjectSchema);