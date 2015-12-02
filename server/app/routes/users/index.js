
var router = require('express').Router();
module.exports = router;

var User = require('mongoose').model('User');
// require('../../../db/models/user.js');


router.param('id', function (req, res, next, id){
	User.findById(id)
	.then(function ( user ){
		req.user = user;
		next();
	})
	.then(null, next);
})

router.get('/', function (req, res, next){
	User.find()
	.then(function ( users ){
		res.send(users);
	})
	.then(null, next);
})

router.get('/:id', function (req, res, next){
 	res.status(200).json(req.user);
})

router.put('/:id', function (req, res, next){
	req.user.set(req.body);
	req.user.save()
		.then(function ( user ){
		res.status(200).send( user );
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
	User.findByIdAndRemove(req.user._id)
	.then(function ( user ){
		res.status(204).end();
	})
	.then(null, next);
})





