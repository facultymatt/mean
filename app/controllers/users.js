/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    User = mongoose.model('User'),
    _ = require('underscore');

/**
 * Auth callback
 */
/*
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};
*/

/**
 * Show login form
 */
exports.signin = function(req, res, next, passport) {

    passport.authenticate('local', function(err, user, info) {
        
        console.log(info);
        
        if (err) { return next(err); }
        if (!user) { return res.failure('Problem logging you in: ' + info.message, 401); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          res.ok(user);
        });
    })(req, res, next);

};

/**
 * Show sign up form
 */
/*
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};
*/

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.ok('success, you are now logged out!');
};

/**
 * Session
 */
/*
exports.session = function(req, res) {
    res.redirect('/');
};
*/

/**
 * Create user
 */
exports.create = function(req, res) {
    
    
    var theUser = new User(req.body);

    theUser.save(function(err) {
        if(err) {
            res.failure(err);
        } else {
           res.ok(theUser); 
        }
        
    });
    
    
    /*
    var theUser = new User(req.body);

    theUser.provider = 'local';
    theUser.save(function(err) {
        if (err) {
            return res.render('users/signup', {
                errors: err.errors,
                user: theUser
            });
        }
        req.logIn(theUser, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
*/
};

/**
 *  Show profile
 */
/*
exports.show = function(req, res) {
    var user = req.profile;

    res.render('users/show', {
        title: user.name,
        user: user
    });
};
*/

/**
 * Show an application
 */
exports.show = function(req, res) {
    
    
    
    res.ok(req.theUser);
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.ok(req.theUser || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, theUser) {
            if (err) return next(err);
            if (!theUser) return next(new Error('Failed to load User ' + id));
            req.theUser = theUser;
            next();
        });
};



/**
 * Delete an user
 */
exports.destroy = function(req, res) {
    var theUser = req.theUser;

    theUser.remove(function(err) {
        if (err) {
            res.failure(err);
        } else {
            res.ok(theUser);
        }
    });
};

/**
 * List of Users
 */
exports.all = function(req, res) {
    User.find().sort('-created').populate('programIds').exec(function(err, users) {
        if (err) {
            res.failure(err);
        } else {
            res.ok(users);
        }
    });
};

/**
 * Update a vendor
 */
exports.update = function(req, res) {
    var theUser = req.theUser;

    // we don't want anyone updating roles from here... 
    // this is because users can update them selves
    // note we should also remove other things here, like password, etc. 
    delete req.body.role;
    
    theUser = _.extend(theUser, req.body);

    theUser.save(function(err) {
        res.ok(theUser);
    });
};


/**
 * Update a user role
 * @note this will only update a user role! no other data even if its passed. 
 *
 */
exports.updateRole = function(req, res) {
    var newRole = req.body.role;
    var userId = req.theUser._id;

    User.findById(userId, function (err, doc) {
        if (err) return next(err); 
        doc.role = newRole;
        doc.save(function() {
            res.ok(doc);
        });
    })
};


