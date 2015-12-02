// page-test.js

var dbURI = 'mongodb://localhost:27017/layout-lasso';
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

    // afterEach('Clear test database', function (done) {
    //     clearDB(done);
    // });

    it('should exist', function () {
        expect(Page).to.be.a('function');
    });

    describe('Perform CRUD properly', function () {

    		var testUser = null,
    			testProj = null,
    			testPage = null;

        beforeEach('Create test User, Project, Page', function(done){
            

    		User.create({
					email: "obama@usa.com",
					password: 'potus'
				})
				.then(function( user ){
					testUser = user;
                    console.log(testUser);
                    return Project.create({
                        name: "ProjectForceOne"
                    })
				})
				.then(function( project ){
					testProj = project;
					testUser.projects.push(project._id);
                    return Page.create({
					      name: "Mele kalikimaka",
					      html: "<div><p> Hi Michelle </p> </div>",
					      css: "p { color: blue }"
                    })
                })
				.then(function( page ){
					testPage = page;
					testProj.pages.push(page._id);
                    done();
                });
		})

        // afterEach('Clear test database', function (done) {
        //     clearDB(done);
        // });


    	it('should PUT an update to a page', function(done){
    		agent.put('/api/pages/' + testPage._id)
    			.send({html: "<div><p> Hi Michelle </p><p> Hey, sup Rocky? </p></div>"})
    			.expect(200)
    			.end(function(err, response){
    				if(err) return done(err);
    				expect(response.body._id).to.equal(testPage._id.toString());
    				expect(response.body.html).to.equal("<div><p> Hi Michelle </p><p> Hey, sup Rocky? </p></div>");
                    done();
    			})
    	})

        it('should DELETE a page', function(done){
            agent.delete('/api/pages/' + testPage._id)
                .send({_id: testPage._id})
                .expect(204)
                .end(function(err, response){
                    if(err) return done(err);
                    done();
                })
        })

        it('should PUT an update to a project', function(done){
            agent.put('/api/projects/' + testProj._id)
                .send({name: "ObamaHair"})
                .expect(200)
                .end(function(err, response){
                    if(err) return done(err);
                    expect(response.body._id).to.equal(testProj._id.toString());
                    expect(response.body.name).to.equal("ObamaHair");
                    done();
                })
        })

        it('should PUT an update to a user', function(done){
            agent.put('/api/users/' + testUser._id)
                .send({email: "hillary@gmail.com"})
                .expect(200)
                .end(function(err, response){
                    if(err) return done(err);
                    expect(response.body._id).to.equal(testUser._id.toString());
                    expect(response.body.email).to.equal("hillary@gmail.com");
                    done();
                })
        })

    });

});

