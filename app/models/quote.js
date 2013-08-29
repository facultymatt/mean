/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    Schema = mongoose.Schema;


/**
 * Quote Schema
 */
var QuoteSchema = new Schema({
    created: { type: Date, default: Date.now },
    totalCost: { type: Number, default: 0 },
    status: {type: String, default: 'Open', trim: true},
    vendorId: {
        type: Schema.ObjectId,
        ref: 'Vendor'
    },
    description: {type: String, default: '', trim: true},
    company: {
       "name": {type: String, default: '', trim: true},
       "address1": {type: String, default: '', trim: true},
       "address2": {type: String, default: '', trim: true},
       "city": {type: String, default: '', trim: true},
       "state": {type: String, default: '', trim: true},
       "zip": {type: String, default: '', trim: true}
    },
    customField: {
        displayName: String,
        value: String
    }
});

/**
 * Statics
 */
QuoteSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

mongoose.model('Quote', QuoteSchema);




