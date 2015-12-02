
var mongoose = require('mongoose');

var TemplateSchema = new mongoose.Schema({
	name: String,
	grid: [String]
})

module.exports = mongoose.model('Template', TemplateSchema);