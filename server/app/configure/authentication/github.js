'use strict';

var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy; 
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports = function (app) {

    var githubConfig = app.getValue('env').GITHUB;

    var githubCredentials = {
        clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: githubConfig.callbackURL
    };

    var verifyCallback = function (accessToken, refreshToken, profile, done) {
        console.log("in the github verify callback", typeof profile.emails[0].value);
        
        UserModel.findOne({ 
            $or: [
                { 'github.id': profile.id },
                { email: profile.emails[0].value }
            ]
        }).exec() 
            .then(function (user) {
                if (user) {
                    if (user.email === profile.emails[0].value && user.github.id === profile.id)
                        return user;
                    else {
                        throw new Error ("User with this email address already exists")
                    }
                } else {
                    return UserModel.create({
                        email: profile.emails[0].value,
                        github: {
                            id: profile.id
                        }
                    });
                }

            }).then(function (userToLogin) {
                done(null, userToLogin);
            }, function (err) {
                console.error('Error creating user from Github authentication', err);
                done(err);
            });
    };

    passport.use(new GitHubStrategy (githubCredentials, verifyCallback));

    app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function (req, res) {
            res.redirect('/');
        });

};
