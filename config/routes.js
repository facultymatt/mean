var async = require('async');

module.exports = function(app, passport, auth, user) {
   /*
 //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);
    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);
    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);
    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: 'https://www.google.com/m8/feeds'
    }), users.signin);
    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: 'https://www.google.com/m8/feeds'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);
*/
    

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, user.can('edit'), articles.destroy);


	// vendors
	var vendors = require('../app/controllers/vendors');
    app.get('/vendors', vendors.all);
    app.post('/vendors', vendors.create);
    app.get('/vendors/:vendorId', vendors.show);
    app.put('/vendors/:vendorId', auth.requiresLogin, vendors.update);
    app.del('/vendors/:vendorId', auth.requiresLogin, vendors.destroy);

    //Finish with setting up the articleId param
    app.param('vendorId', vendors.vendor);
    
    
    // Programs
	var programs = require('../app/controllers/programs');
    app.get('/programs', user.is('logged in'), programs.all);
    app.post('/programs', user.is('logged in'), programs.create);
    app.get('/programs/:programId', user.is('admin'), user.can('edit programs'), programs.show);
    app.put('/programs/:programId', user.is('admin'), programs.update);
    app.del('/programs/:programId', user.is('admin'), user.can('delete programs'), programs.destroy);

    //Finish with setting up the articleId param
    app.param('programId', programs.program);
    
    app.get('/private', user.can('view all programs'), function(req, res) {
        res.send('OK PRIVATE...!');
    });
    
    app.get('/fancy',
      // Authenticate using HTTP Basic credentials, with session support disabled.
      passport.authenticate('local'),
       function(req, res){
        res.json({ username: req.user.username, email: req.user.email });
    });
    
    app.get('/out', function(req, res) {
        req.logout();
        res.json({meta: {message: 'success, you are now logged out!'}});
    });
    

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};