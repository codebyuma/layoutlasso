
var mongoose = require('mongoose');

var TemplateSchema = new mongoose.Schema({
	name: String,
	grid: [],
	gridCount: { type: Number, default: 0}
})

module.exports = mongoose.model('Template', TemplateSchema);