'use strict';
var router = require('express').Router();
module.exports = router;

var Project = require('mongoose').model('Project');


router.param('id', function ( req, res, next, id ){
	Project.findById(id).populate("pages").exec()
	.then(function(project){
		req.project = project;
		next();
	})
	.then(null, next);
})

router.get('/', function (req, res, next){
	Project.find()
	.then(function ( projects ){
		res.send(projects);
	})
	.then(null, next);
})

router.get('/:id', function (req, res, next){
	res.send( req.project );
})

router.put('/:id', function (req, res, next){
	req.project.set(req.body);
	req.project.save()
	.then(function ( project ){
		res.send( project );
	})
	.then(null, next);
})

router.post('/', function (req, res, next){
	Project.create(req.body)
	.then(function(project){
		res.status(201).send(project);
	})
	.then(null, function(err){
		err.status = 400;
		next(err);
	})
})

router.delete('/:id', function (req, res, next){
	Project.findByIdAndRemove( req.project._id)
	.then(function ( project ){
		res.status(204).end();
	})
	.then(null, next);
})
