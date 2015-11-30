
var router = require('express').Router();
module.exports = router;

var Page = require('../../../db/models/page.js'); // @OB/ND alternative is to do mongoose.model('Project')



router.param('id', function (req, res, next, id){
	req.id = req.params.id; // @OB/ND does not seem all that useful
	next();
})

router.get('/', function (req, res, next){
	Page.find()
	.then(function ( pages ){
		res.send(pages);
	})
	.then(null, next);
})

router.get('/:id', function (req, res, next){
	Page.findById(req.id)
	.then(function ( page ){
		res.status(201).send( page ); // @OB/ND 201 is non-standard here
	})
	.then(null, next);
})

router.put('/:id', function (req, res, next){
	Page.findByIdAndUpdate(req.id, req.body, {new: true})
	.then(function ( page ){
		res.status(201).send( page ); // @OB/ND 201 is non-standard here
	})
	.then(null, next);
})

router.post('/', function (req, res, next){
	Page.create(req.body)
	.then(function ( page ){
		res.status(201).send( page );
	})
	.then(null, next);
})

router.delete('/:id', function (req, res, next){
	Page.findByIdAndRemove(req.id)
	.then(function ( page ){
		res.status(204).end();
	})
	.then(null, next);
})