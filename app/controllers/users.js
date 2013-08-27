/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res) {
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
    
    
    
    res.jsonp(req.theUser);
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.theUser || null);
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
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(theUser);
        }
    });
};

/**
 * List of Users
 */
exports.all = function(req, res) {
    User.find().sort('-created').populate('programIds').exec(function(err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(users);
        }
    });
};

/**
 * Update a vendor
 */
exports.update = function(req, res) {
    var theUser = req.theUser;

    theUser = _.extend(theUser, req.body);

    theUser.save(function(err) {
        res.jsonp(theUser);
    });
};



