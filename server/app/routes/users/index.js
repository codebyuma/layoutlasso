
var router = require('express').Router();
module.exports = router;

var User = require('mongoose').model('User');
// require('../../../db/models/user.js');


router.param('id', function (req, res, next, id){
	req.id = id;
	next();
})

router.get('/', function (req, res, next){
	User.find()
	.then(function ( users ){
		res.send(users);
	})
	.then(null, next);
})

router.get('/:id', function (req, res, next){
	User.findById(req.id)
	.then(function ( user ){
		res.status(201).send( user );
	})
	.then(null, next);
})

router.put('/:id', function (req, res, next){
	User.findByIdAndUpdate(req.id, req.body, {new: true})
	.then(function ( user ){
		res.status(201).send( user );
	})
	.then(null, next);
})

router.post('/', function (req, res, next){
	User.create(req.body)
	.then(function ( user ){
		res.status(201).send( user );
	})
	.then(null, next);
})

router.delete('/:id', function (req, res, next){
	User.findByIdAndRemove(req.id)
	.then(function ( user ){
		res.status(204).end();
	})
	.then(null, next);
})





