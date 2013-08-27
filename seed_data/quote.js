var mongo = require('mongodb');
var BSON = mongo.BSONPure;

exports.seed = function() {
    return data;
};

// dummy data
var data = [{
    _id: new BSON.ObjectID('51e71518ed32080ffc000017'),
    totalCost: 1000,
    status: 'Open',
    vendorId: '51e71518ed32080ffc000023',
    description: 'I need new rockets for my space shuttle booster.',
    company: {
        name: 'NASA',
        address1: '123 Company Lane',
        phone: '556-669-4444',
        city: 'Philadelphia',
        state: 'PA'
    }
},
{
    _id: new BSON.ObjectID('51e71518ed32080ffc000018'),
    totalCost: 9900,
    status: 'Open',
    vendorId: '51e71518ed32080ffc000024',
    description: 'Manaquins for my art project in the SkyBox',
    company: {
        name: 'Art Manaquins',
        address1: '123 Company Lane',
        phone: '556-669-4444',
        city: 'Philadelphia',
        state: 'PA'
    }
},
{
    _id: new BSON.ObjectID('51e71518ed32080ffc000019'),
    totalCost: 2000,
    status: 'Archived',
    vendorId: '51e71518ed32080ffc000025',
    description: 'Cookies for lunch for everyone!',
    company: {
        name: 'C is for Cookie',
        address1: '123 Company Lane',
        phone: '556-669-4444',
        city: 'Philadelphia',
        state: 'PA'
    }
},
{
    _id: new BSON.ObjectID('51e71518ed32080ffc000020'),
    totalCost: 28000,
    status: 'Archived',
    vendorId: '51e71518ed32080ffc000025',
    description: 'Security system for my office.',
    company: {
        name: 'NSA',
        address1: '123 Company Lane',
        phone: '556-669-4444',
        city: 'Philadelphia',
        state: 'PA'
    }
}];