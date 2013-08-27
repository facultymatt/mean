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
        if (!quote) return next(new Error('Failed to load quote ' + id));
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
    res.jsonp(quote);
};

/**
 * Update a quote
 */
exports.update = function(req, res) {
    var quote = req.quote;

    quote = _.extend(quote, req.body);

    quote.save(function(err) {
        res.jsonp(quote);
    });
};

/**
 * Delete an quote
 */
exports.destroy = function(req, res) {
    var quote = req.quote;

    quote.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(quote);
        }
    });
};

/**
 * Show an quote
 */
exports.show = function(req, res) {
    res.jsonp(req.quote);
};

/**
 * List of Quotes
 */
exports.all = function(req, res) {
    Quote.find().sort('-created').exec(function(err, quotes) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(quotes);
        }
    });
};



/**
 * List of Quotes
 */
exports.getAllForSalesRep = function(req, res) {
 
    Vendor
    .where('salesRep')
    .equals(req.user._id)
    .find()
    .select('_id')
    .exec(function(err, vendors) {
        if (err) {
            res.send(500);
        } else {
    
            // extrct the vendor ids from the results
            // this will be all vendors the user is associated with NOW! 
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
                res.render('error', {
                    status: 500
                });
            } else {
                res.json({
                    
                    meta: {
                        message: 'Getting quotes for salesRep ' + req.user.fullName  
                    },
                    results: quotes
                    
                });
            }
        });
        
    }
    
    
/*
var o = {};
o.map = function () { emit(this.salesRep, 1) }
o.reduce = function (salesRep, vendor) { 
    return vendor;
}
Vendor.mapReduce(o, function (err, results) {
  console.log(results);
})
*/
    
/*
    
var o = {};
o.map = function () { emit(this.salesRep, 1) }
o.reduce = function (k, vals) { return vals.length }
Vendor.mapReduce(o, function (err, results) {
  console.log(results)
})  
*/  
    
    
/*
    
    
*/
};


