/**
* Module to seed a database.
* 
* @todo re-write to use async to reduce the nested function, and quit on completion
* @todo make model loading more effecient
*
*/

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore'),
    fs = require('fs');


/**
* Bootstrap our models
* @note this is the same code as found in server.js
* 
* @todo we can combine the models require and definintion (below) into one function. 
*
*/
var models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function(file) {
    require(models_path + '/' + file);
});


// Saving in array allows us to call below in doSeed function.
var models = {};
models.Quote = mongoose.model('Quote');
models.Application = mongoose.model('Application');
models.User = mongoose.model('User');
models.Vendor = mongoose.model('Vendor');
models.Program = mongoose.model('Program');


/**
* Get our seed data
* @note again this is not the most elegant, we should be doing something
* more automated based on model files... ie: check if seed data exists then add it to our array
*
* @note we sould include some type of functionality to automatically pluralize / depluralize names
*
*/
var resources = {};
resources.Vendor        = require('./seed_data/vendor').seed();
resources.Program       = require('./seed_data/program').seed();
resources.Application   = require('./seed_data/application').seed();
resources.Quote         = require('./seed_data/quote').seed();
resources.User          = require('./seed_data/user').seed();


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */
var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    mongoose = require('mongoose');
    
// create database connection
var db = mongoose.connect(config.db, function() {
    console.log('Connected to database!');
    
    // drop the existing database
    db.connection.db.dropDatabase(function() {
        console.log('Database dropped');
        
        // close our connnection
        db.connection.close(function(){
            console.log('Database connection closed, re-opening now...');
            
            // reconnect
            db = mongoose.connect(config.db, function() {
                console.log('Re-connected, beginning seed');
                doSeed();
                
            });
            
        });
   
    });
    
});


/**
* Function to do the actual seed. Will be called once database is dropped, 
* and the connection is closed and re-opened.
*
*/
var doSeed = function() {
    
    // loop through resources
    _.each(resources, function(value, key) {
        
        console.log('Seeding ' + key + ' collection');
        
        // loop through our resource items
        _.each(value, function(contents) {
            
            // carete new Mongoose object
            var item = new models[key](contents);
            
            // save object
            item.save(function() {
                console.log(key + ' ' + item._id + ' created.');
            }); 
            
        });

    });
    
};