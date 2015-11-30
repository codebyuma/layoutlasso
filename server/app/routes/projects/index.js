'use strict';
var router = require('express').Router();
module.exports = router;

var Project = require('../../../db/models/project.js'); // @OB/ND alternative is to do mongoose.model('Project')


// @OB/ND dead code below...though actually why not use a router.param
// router.param('id', function (req, res, next, id){
// 	req.id = req.params.id;
// 	next();
// })

router.get('/', function (req, res, next){
	Project.find()
	.then(function ( projects ){
		res.send(projects);
	})
	.then(null, next);
})

router.get('/:id', function (req, res, next){
	Project.findById( req.params.id)
	.then(function ( project ){
		res.status(201).send( project ); // @OB/ND 201 is non-standard here
	})
	.then(null, next);
})

router.put('/:id', function (req, res, next){
	Project.findByIdAndUpdate( req.params.id, req.body, {new: true}) // @OB/ND some hooks won't fire
	.then(function ( project ){
		res.status(201).send( project ); // @OB/ND 201 is non-standard here
	})
	.then(null, next);
})

router.post('/', function (req, res, next){
	Project.create(req.body)
	.then(function(project){
		res.status(201).send(project);
	})
	.then(null, function(err){
		console.log("in post project router fail") // @OB/ND dead code
		err.status = 400;
		next(err);
	})
})


router.delete('/:id', function (req, res, next){
	Project.findByIdAndRemove( req.params.id)
	.then(function ( project ){
		res.status(204).end();
	})
	.then(null, next);
})
