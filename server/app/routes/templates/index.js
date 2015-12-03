
var router = require('express').Router()
module.exports = router;

var Template = require('mongoose').model('Template')

router.get('/', function (req, res, next){
	Template.find({})
	.then(function ( templates ){
		console.log("=-=-=-=-=-= templates sending -- name of first in group: ", templates[0].name)
		res.status(200).send( templates );
	})
})

router.get('/:id', function (req, res, next){
	Template.findById(req.params.id)
	.then(function ( template ){
		res.status(200).send( template );
	})
	.then(null, next);
})

