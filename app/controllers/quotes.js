/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Quote = mongoose.model('Quote'),
    Vendor = mongoose.model('Vendor'),
    _ = require('underscore');


/**
 * Find quote by id
 */
exports.quote = function(req, res, next, id) {
    Quote.load(id, function(err, quote) {
        if (err) return next(err);
        if (!quote) return res.failure('Failed to load quote ' + id, 404);
        req.quote = quote;
        next();
    });
};


/**
 * Create a quote
 */
exports.create = function(req, res) {
    var quote = new Quote(req.body);

    quote.save();
    res.ok(quote);
};


/**
 * Update a quote
 */
exports.update = function(req, res) {
    var quote = req.quote;

    quote = _.extend(quote, req.body);

    quote.save(function(err) {
        res.ok(quote);
    });
};


/**
 * Delete an quote
 */
exports.destroy = function(req, res) {
    var quote = req.quote;

    quote.remove(function(err) {
        if (err) {
            res.failure(err);
        } else {
            res.ok(quote);
        }
    });
};


/**
 * Show an quote
 */
exports.show = function(req, res) {
    res.ok(req.quote);
};


/**
 * List of Quotes
 */
exports.all = function(req, res) {
    Quote.find().sort('-created').exec(function(err, quotes) {
        if (err) {
            res.failure(err);
        } else {
            res.ok(quotes);
        }
    });
};


/**
 * Get quotes for a sales rep. 
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
            res.failure(err);
        } else {
    
            // extract the vendor ids from the results
            // this will be all vendors the user is associated with NOW! 
            // @note we don't store user ids with the quotes... because if at any point the vendor gets
            // a new sales rep, things would be out of sync. 
            var vendorIds = [];
            _.each(vendors, function(item) {
                 vendorIds.push(item._id);
            });
            getQuotes(vendorIds);
    
        }
    });
    
    var getQuotes = function(vendorIds) {
        
        Quote
        .find()
        .where('vendorId')
        .in(vendorIds)
        .sort('-created')
        .exec(function(err, quotes) {
            if (err) {
                 res.failure(err);
            } else {
               res.ok(quotes, 'Getting quotes for salesRep ' + req.user.fullName);
            }
        });
    }
};