/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Vendor = mongoose.model('Vendor'),
    _ = require('underscore');


/**
 * Find vendor by id
 */
exports.vendor = function(req, res, next, id) {

    Vendor.load(id, function(err, vendor) {
        if (err) return next(err);
        if (!vendor) return next(new Error('Failed to load vendor ' + id));
        req.vendor = vendor;
        next();
    });
};

/**
 * Create a vendor
 */
exports.create = function(req, res) {
    var vendor = new Vendor(req.body);

    vendor.save();
    res.jsonp(vendor);
};

/**
 * Update a vendor
 */
exports.update = function(req, res) {
    var vendor = req.vendor;

    vendor = _.extend(vendor, req.body);

    vendor.save(function(err) {
        res.jsonp(vendor);
    });
};

/**
 * Delete an vendor
 */
exports.destroy = function(req, res) {
    var vendor = req.vendor;

    vendor.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(vendor);
        }
    });
};

/**
 * Show an vendor
 */
exports.show = function(req, res) {
    res.jsonp(req.vendor);
};

/**
 * List of Vendors
 */
exports.all = function(req, res) {
    Vendor.find().sort('-created').populate('programIds').exec(function(err, vendors) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(vendors);
        }
    });
};