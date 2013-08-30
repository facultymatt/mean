/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    Schema = mongoose.Schema;


/*
var subProgramSchema = new Schema({
    type: Schema.ObjectId,
    ref: 'Program'
});
*/

/**
 * Vendor Schema
 */
var VendorSchema = new Schema({
    "created": { type: Date, default: Date.now },
    "name": {type: String, default: '', trim: true},
    "contactPerson": {
      "name": {type: String, default: '', trim: true},
      "email": {type: String, default: '', trim: true},
      "phone": {type: String, default: '', trim: true}
    },
    "salesRep" : {
        type: Schema.ObjectId,
        ref: 'User'
    },
    "logo": {
      "original": {type: String, default: '', trim: true}
    },
    "website": {type: String, default: '', trim: true},
    "legalTerms": {type: String, default: '', trim: true},
    "businessPhone": {type: String, default: '', trim: true},
    "businessAddress": {
      "address1": {type: String, default: '', trim: true},
      "address2": {type: String, default: '', trim: true},
      "city": {type: String, default: '', trim: true},
      "state": {type: String, default: '', trim: true},
      "zip": {type: String, default: '', trim: true}
    },
    "geo": {
      "latitude": {type: Number, default: null},
      "longitude": {type: Number, default: null}
    },
    "locatorEnabled": Boolean,
    "programs": [{
        type: Schema.ObjectId,
        ref: 'Program',
        displayName: String
    }],
    "customField": {
        required: {type: Boolean, default: false},
        enabled: {type: Boolean, default: false},
        displayName: {type: String, default: '', trim: true}
    }
});

/**
 * Statics
 */
VendorSchema.statics = {
    
    // this gets called when a vendorId is present in the req.params
    // its a clever way to be able to access req.vendor in the next middlewares
    //
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('programIds programs salesRep').exec(cb);
    }
};

mongoose.model('Vendor', VendorSchema);




