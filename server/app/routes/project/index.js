'use strict';
var router = require('express').Router();
module.exports = router;

var Project = require('../../../db/models/project.js');



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
		res.status(201).send( project );
	})
	.then(null, next);
})

router.put('/:id', function (req, res, next){
	Project.findByIdAndUpdate( req.params.id, req.body, {new: true})
	.then(function ( project ){
		res.status(201).send( project );
	})
	.then(null, next);
})

router.post('/', function (req, res, next){
	Project.create(req.body)
	.then(function ( project ){
		res.status(201).send( project );
	})
	.then(null, next);
})

router.delete('/:id', function (req, res, next){
	Project.findByIdAndRemove( req.params.id)
	.then(function ( project ){
		res.status(204).end();
	})
	.then(null, next);
})
