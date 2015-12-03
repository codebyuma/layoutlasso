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
            name: "Grid squares 4 x 4 with navbar",
            grid: [
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
            ]
        },

// =-=-=-=-=-=-=-=-=-=-=-=-= NEXT TEMPLATE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

        {
            "name": "Content field - side columns - nav bar - large cover image",
            "grid": [
                {
                  "id": "1",
                  "parentId": "main-grid",
                  "x": 0,
                  "y": 1,
                  "width": 12,
                  "height": 4,
                  "content": "Your content here"
                },
                {
                  "id": "2",
                  "parentId": "main-grid",
                  "x": 0,
                  "y": 5,
                  "width": 2,
                  "height": 8,
                  "content": "Your content here"
                },
                {
                  "id": "10",
                  "parentId": "grid2",
                  "x": 1,
                  "y": 1,
                  "width": 10,
                  "height": 2,
                  "content": "Your content here"
                },
                {
                  "id": "11",
                  "parentId": "grid2",
                  "x": 1,
                  "y": 3,
                  "width": 10,
                  "height": 2,
                  "content": "Your content here"
                },
                {
                  "id": "12",
                  "parentId": "grid2",
                  "x": 1,
                  "y": 5,
                  "width": 10,
                  "height": 2,
                  "content": "Your content here"
                },
                {
                  "id": "5",
                  "parentId": "main-grid",
                  "x": 2,
                  "y": 5,
                  "width": 8,
                  "height": 8,
                  "content": "Your content here"
                },
                {
                  "id": "6",
                  "parentId": "main-grid",
                  "x": 10,
                  "y": 5,
                  "width": 2,
                  "height": 8,
                  "content": "Your content here"
                },
                {
                  "id": "13",
                  "parentId": "grid6",
                  "x": 1,
                  "y": 5,
                  "width": 10,
                  "height": 2,
                  "content": "Your content here"
                },
                {
                  "id": "14",
                  "parentId": "grid6",
                  "x": 1,
                  "y": 3,
                  "width": 10,
                  "height": 2,
                  "content": "Your content here"
                },
                {
                  "id": "15",
                  "parentId": "grid6",
                  "x": 1,
                  "y": 1,
                  "width": 10,
                  "height": 2,
                  "content": "Your content here"
                },
                {
                  "id": "8",
                  "parentId": "main-grid",
                  "x": 0,
                  "y": 0,
                  "width": 12,
                  "height": 1,
                  "content": "<nav class=\"navbar navbar-default\">        <div class=\"container-fluid\">          <div class=\"navbar-header\">            <a class=\"navbar-brand\" href=\"#\">              <p>Navbar</p>            </a>          </div>        </div>      </nav>"
                }
            ]
        },

// =-=-=-=-=-=-=-=-=-=-=-=-= NEXT TEMPLATE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

        {
            name: "Simple gallery - 3 x 3 square grid",
            grid: [ 
                 { id: '1',
                   parentId: 'main-grid',
                   x: 0,
                   y: 0,
                   width: 4,
                   height: 4,
                   content: 'Your content here' },
                 { id: '2',
                   parentId: 'main-grid',
                   x: 0,
                   y: 5,
                   width: 4,
                   height: 4,
                   content: 'Your content here' },
                 { id: '3',
                   parentId: 'main-grid',
                   x: 4,
                   y: 5,
                   width: 4,
                   height: 4,
                   content: 'Your content here' },
                 { id: '4',
                   parentId: 'main-grid',
                   x: 8,
                   y: 0,
                   width: 4,
                   height: 4,
                   content: 'Your content here' },
                 { id: '5',
                   parentId: 'main-grid',
                   x: 4,
                   y: 0,
                   width: 4,
                   height: 4,
                   content: 'Your content here' },
                 { id: '6',
                   parentId: 'main-grid',
                   x: 0,
                   y: 10,
                   width: 4,
                   height: 4,
                   content: 'Your content here' },
                 { id: '7',
                   parentId: 'main-grid',
                   x: 4,
                   y: 10,
                   width: 4,
                   height: 4,
                   content: 'Your content here' },
                 { id: '8',
                   parentId: 'main-grid',
                   x: 8,
                   y: 10,
                   width: 4,
                   height: 4,
                   content: 'Your content here' },
                 { id: '9',
                   parentId: 'main-grid',
                   x: 8,
                   y: 5,
                   width: 4,
                   height: 4,
                   content: 'Your content here' } 
                ] 
        }
         

// =-=-=-=-=-=-=-=-=-=-=-=-= NEXT TEMPLATE =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    // if adding grid use this format 
    /*
        {
            name: 'template name - description',
            grid: [ { grid item }, { grid item }, { grid item } ]  
        }
    */

    ] // <----- closing templates array

    return Template.createAsync(templates);

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

    seedTemplates()
    .then(function(){
        console.log(chalk.yellow('Seeded templates!'))
    })

});




