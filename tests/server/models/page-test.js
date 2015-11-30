// page-test.js

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models');

var Page = mongoose.model('Page');

var supertest = require('supertest')
var app = require('../../../server/index')
var agent = supertest.agent(app);



describe('Page model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Page).to.be.a('function');
    });

    describe('Perform CRUD properly', function () {

    	beforeEach('Create test pages', function(done){
    		Page.create()
    	})


    });

});



/*

    it('PUT a specific review ', function (done) {
    	var newReview = {
            text: "One two three four five six seven eight nine ten"
    	}
    	
            agent.put('/api/reviews/' + reviewId)
                .send(newReview)
                .expect(200)
                .end(function(err, response){
                    if(err) return done(err);
                    expect(response.body._id).to.equal(reviewId.toString());
                    expect(response.body.text).to.equal("One two three four five six seven eight nine ten");
                    done();
                })
        
    })


*/