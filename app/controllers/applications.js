/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Application = mongoose.model('Application'),
    _ = require('underscore');


/**
 * Find application by id
 */
exports.application = function(req, res, next, id) {

    Application.load(id, function(err, application) {
        if (err) return next(err);
        if (!application) return next(new Error('Failed to load application ' + id));
        req.application = application;
        next();
    });
};

/**
 * Create a application
 */
exports.create = function(req, res) {
    var application = new Application(req.body);

    application.save();
    res.jsonp(application);
};

/**
 * Update a application
 */
exports.update = function(req, res) {
    var application = req.application;

    application = _.extend(application, req.body);

    application.save(function(err) {
        res.jsonp(application);
    });
};

/**
 * Delete an application
 */
exports.destroy = function(req, res) {
    var application = req.application;

    application.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(application);
        }
    });
};

/**
 * Show an application
 */
exports.show = function(req, res) {
    res.jsonp(req.application);
};

/**
 * List of Applications
 */
exports.all = function(req, res) {
    Application.find().sort('-created').exec(function(err, applications) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(applications);
        }
    });
};




