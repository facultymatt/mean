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
        if (!vendor) {
            return res.failure('No results', 404);
        }
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
    res.ok(vendor);
};

/**
 * Update a vendor
 */
exports.update = function(req, res) {
    var vendor = req.vendor;

    vendor = _.extend(vendor, req.body);

    vendor.save(function(err) {
        res.ok(vendor);
    });
};

/**
 * Delete an vendor
 */
exports.destroy = function(req, res) {
    var vendor = req.vendor;

    vendor.remove(function(err) {
        if (err) {
            res.failure(err);
        } else {
            res.ok(vendor);
        }
    });
};

/**
 * Show an vendor
 */
exports.show = function(req, res) {
    res.jsonp(req.vendor);
};


exports.allForSalesRep = function(req, res) {
    
    var userId = req.user._id;
    
    Vendor
        .where('salesRep')
        .equals(userId)
        .find()
        .sort('-created')
        .populate('programIds programs salesRep')
        .exec(function(err, vendors) {
        if (err) {
            res.failure(err);
        } else {
            res.ok(vendors);
        }
    });
    
};


/**
 * List of Vendors
 */
exports.all = function(req, res) {
    Vendor.find().sort('-created').populate('programIds programs salesRep').exec(function(err, vendors) {
        if (err) {
            res.failure(err);
        } else {
            res.ok(vendors);
        }
    });
};



/**
 * List of Vendors
 */
exports.getAllNames = function(req, res) {
    Vendor.find().select('_id name').sort('-created').populate('programIds salesRep programs').exec(function(err, vendors) {
        if (err) {
            res.failure(err);
        } else {
            res.ok(vendors);
        }
    });
};


/**
* Get programs for a vendor
*
*/
var Program = mongoose.model('Program');

exports.getCurrentVendorPrograms = function(req, res) {
     res.ok(req.vendor.programIds);
};


exports.getAvailableVendorPrograms = function(req, res) {
     var theIds = _.pluck(req.vendor.programIds, '_id');
     console.log(theIds);
     Program.find().where('_id').nin(theIds).sort('-created').exec(function(err, programs) {
        if (err) {
            res.failure(err);
        } else {
            res.ok(programs);
        }
    });
};

