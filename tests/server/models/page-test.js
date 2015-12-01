// page-test.js

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models');

var Page = mongoose.model('Page');
var Project = mongoose.model('Project');
var User = mongoose.model('User');


var supertest = require('supertest')
var app = require('../../../server/app/index')
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

    	beforeEach('Create test User, Project, Page', function(done){
    		
    		var testUser = null,
    			testProj = null,
    			testPage = null;

    		User.create({
    						email: "obama@usa.com",
    						password: 'potus'
    					})
    					.then(function( user ){
    						testUser = user;
    					})
 
    		Project.create({
    						name: "ProjectForceOne"
    					})
    					.then(function( project ){
    						testProj = project;
    						testUser.projects.push(project._id);
    					})
 
    		Page.create({
    						name: "Mele kalikimaka",
    						html: "<div><p> Hi Michelle </p> </div>",
    						css: "p { color: blue }"
    					})
    					.then(function( page ){
    						testPage = page;
    						testProj.pages.push(page._id);
    					});
    	 	done();
		})

    	it('should PUT an update to a page', function(done){
    		agent.put('/pages/' + testPage._id)
    			.send({html: "<div><p> Hi Michelle </p><p> Hey, sup Rocky? </p></div>"})
    			.expect(200)
    			.end(function(err, response){
    				if(err) return done(err);
    				expect(response.body._id).to.equal(testPage._id.toString());
    				expect(response.body.html).to.equal("<div><p> Hi Michelle </p><p> Hey, sup Rocky? </p></div>");
                    done();
    			})

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