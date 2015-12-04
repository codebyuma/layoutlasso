
var mongoose = require('mongoose');

var TemplateSchema = new mongoose.Schema({
	name: String,
	grid: [] //OB/ND: Template and Page both have grid?
})

module.exports = mongoose.model('Template', TemplateSchema);