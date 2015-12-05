
var router = require('express').Router()
module.exports = router;

var Template = require('mongoose').model('Template')

router.get('/', function (req, res, next){
	Template.find()
	.then(function ( templates ){
		res.send( templates );
	})
})

router.get('/:id', function (req, res, next){
	Template.findById(req.params.id)
	.then(function ( template ){
		res.send( template );
	})
	.then(null, next);
})

