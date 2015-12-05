
var router = require('express').Router();
module.exports = router;

var Page = require('../../../db/models/page.js');



router.param('id', function (req, res, next, id){
	console.log('req params page id', id)
	Page.findById(id)
	.then(function ( page ){
		req.page = page;
		next();
	})
	.then(null, next);
})

router.get('/', function (req, res, next){
	Page.find()
	.then(function ( pages ){
		res.send(pages);
	})
	.then(null, next);
})

router.get('/:id', function (req, res, next){
	res.status(200).json( req.page );
})

router.put('/:id', function (req, res, next){
	req.page.set(req.body)
	req.page.save()
	.then(function ( page ){
		res.status(200).json( page ); //OB/ND : 200 is default, dont need to set it
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
	Page.findByIdAndRemove(req.page._id)
	.then(function ( page ){
		res.status(204).end();
	})
	.then(null, next);
})




