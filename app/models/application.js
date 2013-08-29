/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    Schema = mongoose.Schema;


/**
 * Sub-Schemas 
 */
var noteSchema = new Schema({
    "created": { type: Date, default: Date.now },
    note: String
});


/**
 * Application Schema
 */
var ApplicationSchema = new Schema({
    "created": { type: Date, default: Date.now },
    name: { type: String, default: '', trim: true },
    status: { type: String, default: 'Open', trim: true },
    quoteId: {
        type: Schema.ObjectId,
        ref: 'Quote'
    },
    vendorId: {
        type: Schema.ObjectId,
        ref: 'Vendor'
    },
    vendor: {},
    quote: {},
    leasee: {
        fullLegalBusineessName: {type: String, default: '', trim: true},
        contactPerson: {
            name: {type: String, default: '', trim: true},
            email: {type: String, default: '', trim: true},
            phone: {type: String, default: '', trim: true},
            contactMethod:{type: String, default: '', trim: true}
        },
        businessAddress: {
          "address1": {type: String, default: '', trim: true},
          "address2": {type: String, default: '', trim: true},
          "city": {type: String, default: '', trim: true},
          "state": {type: String, default: '', trim: true},
          "zip": {type: Number}
        },
        yearsInBusiness: {type: Number, default: 0},
        soleProp: {type: Boolean, default: false}
    },
    guarantorInfo: {
        name: {type: String, default: '', trim: true},
        email: {type: String, default: '', trim: true},
        phone: {type: String, default: '', trim: true},
        socialSecurityNumber: {type: String, default: '', trim: true},
        homeAddress: {
          "address1": {type: String, default: '', trim: true},
          "address2": {type: String, default: '', trim: true},
          "city": {type: String, default: '', trim: true},
          "state": {type: String, default: '', trim: true},
          "zip": {type: Number}
        }
    },
    notes: [noteSchema]
});

/**
 * Statics
 */
ApplicationSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

mongoose.model('Application', ApplicationSchema);




