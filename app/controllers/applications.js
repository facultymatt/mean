/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Application = mongoose.model('Application'),
    Vendor = mongoose.model('Vendor'),
    _ = require('underscore');


/**
 * Find application by id
 */
exports.application = function(req, res, next, id) {

    Application.load(id, function(err, application) {
        if (err) return res.failure(err);
        if (!application) return res.failure('No application was found', 404);
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


/**
 * Get applications for a sales rep. 
 *
 * @note This can be used to limit quotes when a user is logged in, or 
 *       it can be used for a resource/:id/children instance (if we modify the way we get user id)
 *
 */
exports.getAllForSalesRep = function(req, res) {
 
    // First get all vendors for this sales rep.
    Vendor
    .where('salesRep')
    .equals(req.user._id)
    .find()
    .select('_id')
    .exec(function(err, vendors) {
        if (err) {
            res.send(500);
        } else {
    
            // extract the vendor ids from the results
            // this will be all vendors the user is associated with NOW! 
            // @note we don't store user ids with the quotes... because if at any point the vendor gets
            // a new sales rep, things would be out of sync. 
            var vendorIds = [];
            _.each(vendors, function(item) {
                 vendorIds.push(item._id);
            });
            getApplications(vendorIds);
    
        }
    });
    
    var getApplications = function(vendorIds) {
        
        Application
        .find()
        .where('vendorId')
        .in(vendorIds)
        .sort('-created')
        .exec(function(err, quotes) {
            if (err) {
                 res.send(500);
            } else {
                res.ok({
                    meta: {
                        message: 'Getting applications for salesRep ' + req.user.fullName,
                    },
                    results: quotes
                });
            }
        });
    }
};

