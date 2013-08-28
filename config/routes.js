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
    
    

    
    
    /**
	* USERS / AUTH routes
	* -------------------------
	*/
    var users = require('../app/controllers/users');
    app.post('/auth/login', function(req, res, next) {
        // here we fun a function which calls another function... this gives us access to req, res, and next
        // however there must be a cleaner way to do this
        // @todo refactor
        users.signin(req, res, next, passport); 
    });
    app.get('/auth/logout', users.signout);
    app.post('/auth/logout', users.signout); // makes testing easier with postman

    
    /**
	* USERS / GENERAL routes
	* -------------------------
	*/
	//var users = require('../app/controllers/users');
    app.get('/users', user.is('admin'), users.all);
    app.post('/users', user.is('admin'), users.create);
    app.get('/users/:userId', user.can('view user'), users.show); // @todo check for vendor, is this their approved sales rep? 
    app.put('/users/:userId', user.can('edit user'), users.update); // sales rep and vendor = edit their own info
    app.del('/users/:userId', user.can('delete user'), users.destroy);

    // update usre role
    app.put('/users/:userId/role', user.is('admin'), users.updateRole);

    app.param('userId', users.user);
    
    
    
    /**
	* QUOTES routes
	* -------------------------
	*/
	var quotes = require('../app/controllers/quotes');
    //app.get('/quotes', user.is('logged in'), quotes.all);
    
    app.get('/quotes', user.is('logged in'), function(req, res, next) {
            
        if(req.user.role === 'admin') {
            quotes.all(req, res, next);
        } else if(req.user.role === 'salesRep') {
            
            // @todo support all for vendor
            quotes.getAllForSalesRep(req, res, next);
        } else {
            res.send('Not found', 404);
        }
        
    });
    
    app.post('/quotes', quotes.create);
    app.get('/quotes/:quoteId', quotes.show);
    app.put('/quotes/:quoteId', quotes.update);
    app.del('/quotes/:quoteId', user.is('admin'), quotes.destroy);

    app.param('quoteId', quotes.quote);
    
    
    /**
	* APPLCIATIONS routes
	* -------------------------
	*/
	var applications = require('../app/controllers/applications');
    //app.get('/applications', user.is('admin'), user.is('salesRep'), user.is('vendor'), applications.all);
    
    app.get('/applications', user.is('logged in'), function(req, res, next) {
            
        if(req.user.role === 'admin') {
            applications.all(req, res, next);
        } else if(req.user.role === 'salesRep') {
            applications.getAllForSalesRep(req, res, next);
        } else {
            res.send('Not found', 404);
        }
        
    });
    
    app.post('/applications', applications.create);
    app.get('/applications/:applicationId', applications.show);
    app.put('/applications/:applicationId', applications.update);
    app.del('/applications/:applicationId', user.is('admin'), applications.destroy);

    app.param('applicationId', applications.application);


	/**
	* VENDORS routes
	* -------------------------
	*
	*/
	var vendors = require('../app/controllers/vendors');
    //app.get('/vendors', user.is('admin'), vendors.all);
    // show all vendors, or just users vendors based on role
    app.get('/vendors', user.is('logged in'), function(req, res, next) {
            
        if(req.user.role === 'admin') {
            vendors.all(req, res, next);
        } else if(req.user.role === 'salesRep') {
            vendors.allForSalesRep(req, res, next);
        } else {
            res.send('Not found', 404);
        }
        
    });
    
    app.post('/vendors', user.is('admin'), vendors.create);
    app.get('/vendors/:vendorId', vendors.show);
    app.put('/vendors/:vendorId', user.is('admin'), vendors.update);
    app.del('/vendors/:vendorId', user.is('admin'), vendors.destroy);

    app.param('vendorId', vendors.vendor);
    
    
    /**
	* PROGRAMS routes
	* -------------------------
	*
	* Current Rules
	* - Logged in = view all programs, view single program
	* - Admin = CRUD programs
	* 
	* @todo vendors should only be able to view their programs
	* 
	*/
	var programs = require('../app/controllers/programs');
    app.get('/programs', user.is('logged in'), programs.all);
    app.post('/programs', user.is('admin'), programs.create);
    app.get('/programs/:programId', programs.show);
    app.put('/programs/:programId', user.is('admin'), programs.update);
    app.del('/programs/:programId', user.is('admin'), programs.destroy);

    app.param('programId', programs.program);
    
    
    /**
	* DEV / TESTING routes
	* -------------------------
	*/
    /*
app.get('/private', user.can('view all programs'), function(req, res) {
        res.send('OK PRIVATE...!');
    });
*/
   /*
 
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
    
*/
    
    
    
    // Catch all for non-existant routes
/*
    app.all('*', function(req, res, next) {
        res.failure('Resource not found', 404);
    });
*/
    
};