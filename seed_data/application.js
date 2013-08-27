var mongo = require('mongodb');
var BSON = mongo.BSONPure;

exports.seed = function() {
    return data;
};

// dummy data
var data = [{
    _id: new BSON.ObjectID('51e71518ed32080ffc000021'),
    name: 'Application 1',
    status: 'Open',
    quoteId: '51e71518ed32080ffc000018',
    vendorId: '51e71518ed32080ffc000023',
    vendor: {},
    quote: {
       totalCost: 9900,
       description: 'Manaquins for my art project in the SkyBox',
       termInMonths: 12
    },
    leasee: {
        fullLegalBusineessName: 'Smith Medical',
        contactPerson: {
            name: 'John Smith',
            email: 'john@smith.com',
            phone: '556-669-4444',
            contactMethod:'phone'
        },
        businessAddress: {
            address1: '2424 York Street',
            address2: '',
            city: 'Philadelphia',
            state: 'PA',
            zip: '19125'
        },
        yearsInBusiness: 1,
        soleProp: 0
    },
    guarantorInfo: {
        name: 'Jane Smith',
        email: 'jane@smith.com',
        phone: '556-669-4444',
        socialSecurityNumber: '111-111-1122',
        homeAddress: {
            address1: '123 Home Lane',
            address2: '',
            city: 'Philadelphia',
            state: 'PA',
            zip: '19125'
        }
    },
    notes: {}
},
{
    _id: new BSON.ObjectID('51e71518ed32080ffc000022'),
    name: 'Application 2',
    status: 'Open',
    quoteId: '51e71518ed32080ffc000018',
    vendorId: '51e71518ed32080ffc000024',
    vendor: {},
    quote: {
       totalCost: 9900,
       description: 'Manaquins for my art project in the SkyBox',
       termInMonths: 12
    },
    leasee: {
        fullLegalBusineessName: 'Max Fridge',
        contactPerson: {
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '556-669-4444'
        },
        businessAddress: {
            address1: '2424 York Street',
            address2: '',
            city: 'Philadelphia',
            state: 'PA',
            zip: '19125'
        },
        yearsInBusiness: 1,
        soleProp: 0
    },
    guarantorInfo: {
        name: 'John Doe',
        email: 'jane@doe.com',
        phone: '556-669-4444',
        socialSecurityNumber: '111-111-1122',
        homeAddress: {
            address1: '123 Home Lane',
            address2: '',
            city: 'Philadelphia',
            state: 'PA',
            zip: '19125'
        }
    },
    notes: {}
}
];