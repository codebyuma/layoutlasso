/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Template = Promise.promisifyAll(mongoose.model('Template'))

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

var seedTemplates = function() {
    
    var templates = [
        {
            name: "4 x 4 Grid with Navbar",
            grid: '[
              {
                "id": "0",
                "parentId": "main-grid",
                "x": 0,
                "y": 0,
                "width": 12,
                "height": 1,
                "content": "<nav class=\"navbar navbar-default\">        <div class=\"container-fluid\">          <div class=\"navbar-header\">            <a class=\"navbar-brand\" href=\"#\">              <p>Navbar<\/p>            <\/a>          <\/div>        <\/div>      <\/nav>"
              },
              {
                "id": "2",
                "parentId": "main-grid",
                "x": 0,
                "y": 4,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "3",
                "parentId": "main-grid",
                "x": 3,
                "y": 4,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "4",
                "parentId": "main-grid",
                "x": 6,
                "y": 4,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "6",
                "parentId": "main-grid",
                "x": 0,
                "y": 7,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "7",
                "parentId": "main-grid",
                "x": 3,
                "y": 7,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "8",
                "parentId": "main-grid",
                "x": 9,
                "y": 7,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "9",
                "parentId": "main-grid",
                "x": 9,
                "y": 4,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "10",
                "parentId": "main-grid",
                "x": 6,
                "y": 7,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "11",
                "parentId": "main-grid",
                "x": 0,
                "y": 10,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "12",
                "parentId": "main-grid",
                "x": 3,
                "y": 10,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "13",
                "parentId": "main-grid",
                "x": 9,
                "y": 10,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "14",
                "parentId": "main-grid",
                "x": 6,
                "y": 10,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "15",
                "parentId": "main-grid",
                "x": 0,
                "y": 1,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "16",
                "parentId": "main-grid",
                "x": 3,
                "y": 1,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "17",
                "parentId": "main-grid",
                "x": 6,
                "y": 1,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              },
              {
                "id": "18",
                "parentId": "main-grid",
                "x": 9,
                "y": 1,
                "width": 3,
                "height": 3,
                "content": "Your content here"
              }
            ]'
        },
        {
            name: '',
            grid: ''  
        },
        {
            name: '',
            grid: ''  
        },
        {
            name: '',
            grid: ''  
        },
        {
            name: '',
            grid: ''  
        },

    ]


}

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
