var mongo = require('mongodb');
var BSON = mongo.BSONPure;

exports.seed = function() {
    return data;
};

// dummy data
var data = [
{
    // 1
    _id: new BSON.ObjectID('51e71518ed32080ffc000008'),
    name: {
        first: 'Brian',
        last: 'Walsh'
    },
    fullname: 'Brian Walsh',
    email: 'bwalsh@marlinfinance.com',
    username: 'bwalsh',
    password: 'bwalsh',
    phoneNumber: '111-111-1111',
    avatar: {
        original: 'https://www.filepicker.io/api/file/Lzt97D7RaaMqubCiiRUw'
    },
    status: 'Active',
    groups: [1]
},
{
    // 2
    _id: new BSON.ObjectID('51e71518ed32080ffc000009'),
    name: {
        first: 'Stu',
        last: 'Sable'
    },
    fullname: 'Stu Sable',
    email: 'ssable@marlinfinance.com',
    username: 'ssable',
    password: 'ssable',
    phoneNumber: '856-505-4280',
    avatar: {
        original: 'https://www.filepicker.io/api/file/5Ur9llgFTkSpz1PlV4g9'
    },
    status: 'Active',
    groups: [2]
},
{
    // 3
    _id: new BSON.ObjectID('51e71518ed32080ffc000010'),
    name: {
        first: 'Joseph',
        last: 'Campbell'
    },
    phoneNumber: '856-505-4117',
    avatar: {
        original: 'https://www.filepicker.io/api/file/sFBGJPRRRYmAhCpIi2Ea'
    }, 
    fullname: 'Joseph Campbell',
    email: 'jcampbell@marlinfinance.com',
    username: 'jcampbell',
    password: 'jcampbell',
    status: 'Active',
    groups: [2]
},
{
    // 4
    _id: new BSON.ObjectID('51e71518ed32080ffc000011'),
    name: {
        first: 'Chris',
        last: 'Barraro'
    },
    avatar: {
        original: 'https://www.filepicker.io/api/file/d3HTcvmERA2zcoXw5YGM'
    }, 
    phoneNumber: ' 856-505-4366',
    fullname: 'Chris Barraro',
    email: 'cbarraro@marlinfinance.com',
    username: 'cbarraro',
    password: 'cbarraro',
    status: 'Active',
    groups: [2]
},
{
    // 5
    _id: new BSON.ObjectID('51e71518ed32080ffc000012'),
    name: {
        first: 'Brian',
        last: 'McMahon'
    },
    avatar: {
        original: 'https://www.filepicker.io/api/file/xWYKDkrTT4eylsVMmYHj'
    }, 
    phoneNumber: '856-505-4414',
    fullname: 'Brian McMahon',
    email: 'bmcmahon@marlinfinance.com',
    username: 'bmcmahon',
    password: 'bmcmahon',
    status: 'Active',
    groups: [2]
},
{
    // 6
    _id: new BSON.ObjectID('51e71518ed32080ffc000013'),
    name: {
        first: 'Nicole',
        last: 'Ara'
    },
    phoneNumber: '856-505-4143',
    avatar: {
        original: 'https://www.filepicker.io/api/file/DPcI8ofcTai1AHEbMf2Y'
    }, 
    fullname: 'Nicole Ara',
    email: 'nara@marlinfinance.com',
    username: 'nara',
    password: 'nara',
    status: 'Active',
    groups: [2]
},
{
    // 7
    _id: new BSON.ObjectID('51e71518ed32080ffc000014'),
    name: {
        first: 'Cherie',
        last: 'Cole'
    },
    phoneNumber: '856-505-4224',
    avatar: {
        original: 'https://www.filepicker.io/api/file/jIiQqlDfRgCppZPdy44k'
    }, 
    fullname: 'Cherie Cole',
    email: 'ccole@marlinfinance.com',
    username: 'ccole',
    password: 'ccole',
    status: 'Active',
    groups: [2]
},
{
    // 8
    _id: new BSON.ObjectID('51e71518ed32080ffc000015'),
    name: {
        first: 'Joseph',
        last: 'Fortune'
    },
    phoneNumber: '856-505-4430',
    avatar: {
        original: 'https://www.filepicker.io/api/file/jIiQqlDfRgCppZPdy44k'
    }, 
    fullname: ' Joseph Fortune',
    email: 'jfortune@marlinfinance.com',
    username: 'jfortune',
    password: 'jfortune',
    status: 'Active',
    groups: [2]
},
{
    // 9
    _id: new BSON.ObjectID('51e71518ed32080ffc000016'),
    name: {
        first: 'Jennifer',
        last: 'DeLong'
    },
    phoneNumber: '303-963-5832',
    avatar: {
        original: 'https://www.filepicker.io/api/file/kg0Bw0Rvi2J96PZNWpgR'
    }, 
    fullname: 'Jennifer DeLong',
    email: 'jdelong@marlinfinance.com',
    username: 'jdelong',
    password: 'jdelong',
    status: 'Active',
    groups: [2]
}];