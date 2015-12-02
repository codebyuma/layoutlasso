
var router = require('express').Router()
module.exports = router;

var Template = require('mongoose').model('Template')



router.get('/', function (req, res, next){
	Template.find({})
})


router.get('/:id', function (req, res, next){
	Template.findById(req.params.id)
	.then(function ( template ){
		res.send( template );
	})
})



// do we want to be able to create/update templates, or only use them from the seed?