/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Quote = mongoose.model('Quote'),
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




