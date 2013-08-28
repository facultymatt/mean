/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Program = mongoose.model('Program'),
    _ = require('underscore');


/**
 * Find program by id
 */
exports.program = function(req, res, next, id) {

    Program.load(id, function(err, program) {
        if (err) return next(err);
        if (!program) return res.failure('Failed to load program ' + id, 404);
        req.program = program;
        next();
    });
};

/**
 * Create a program
 */
exports.create = function(req, res) {
    var program = new Program(req.body);

    program.save();
    res.ok(program);
};

/**
 * Update a program
 */
exports.update = function(req, res) {
    var program = req.program;

    program = _.extend(program, req.body);

    program.save(function(err) {
        res.ok(program);
    });
};

/**
 * Delete an program
 */
exports.destroy = function(req, res) {
    var program = req.program;

    program.remove(function(err) {
        if (err) {
            res.failure(err);
        } else {
            res.ok(program);
        }
    });
};

/**
 * Show an program
 */
exports.show = function(req, res) {
    res.ok(req.program);
};

/**
 * List of Programs
 */
exports.all = function(req, res) {
    Program.find().sort('-created').exec(function(err, programs) {
        if (err) {
            res.faulure(error);
        } else {
            res.ok(programs);
        }
    });
};




