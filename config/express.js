/**
 * Module dependencies.
 */
var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    helpers = require('view-helpers');

module.exports = function(app, config, passport, user) {
    app.set('showStackError', true);

    //Should be placed before express.static
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));
    

    /**
    * Extend res with custom response formats, that we can use in our controllers. 
    *
    */
    app.use(function(req, res, next) {
        res.ok = function(data, message) {
            
            // create default response object
            var resultObj =  {
                meta: {
                    code: 200
                },
                result: data
            }
            
            // optionally add a message
            if(message) resultObj.meta.message = message;
            
            // respond, ending this request
            res.json(resultObj, 200);
        }
        
        res.failure = function(message, code) {
            var code = code || 500;
            
            // create default template
            var responseObj = {
                meta: { 
                    code: code,
                    message: message
                }
            }
            
            // add the message. We check if "message" key is already set
            // because in some cases, such as validation failure, a detailed message object is already 
            // returned, so we don't want message.message as part of our return
            
            if(typeof message === 'object' && message.message) {
               responseObj.meta = message;
               responseObj.meta.code = code;
            }
            
            res.json(responseObj, code);
        }
        
        next();
    });

    //Setting the fav icon and static folder
    app.use(express.favicon());
    app.use(express.static(config.root + '/public'));

    //Don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(express.logger('dev'));
    }

    //Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    //Enable jsonp
    app.enable("jsonp callback");

    app.configure(function() {
        //cookieParser should be above session
        app.use(express.cookieParser());

        //bodyParser should be above methodOverride
        app.use(express.bodyParser());
        app.use(express.methodOverride());

        //express/mongo session storage
        app.use(express.session({
            secret: 'MEAN',
            store: new mongoStore({
                url: config.db,
                collection: 'sessions'
            })
        }));

        //connect flash for flash messages
        app.use(flash());

        //dynamic helpers
        app.use(helpers(config.app.name));

        //use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        // user roles
        // -----
        // mode to after router when issue https://github.com/ForbesLindesay/connect-roles/issues/21
        // is fixed
        app.use(user);
        

        // routes should be at the last
        app.use(app.router);
        
        
        app.all('/', function(req, res, next) {
            res.ok('Hello world!');
        });
        

        // Assume "not found" in the error msgs is a 404. 
        // this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
        app.use(function(err, req, res, next) {
            
            if(err.message.indexOf('CastError')) {
                // respond with 'bad request' ie: this will never work
                // dont try this request again! 
                return res.failure('Invalid object id.', 400); 
            }
            
            //Treat as 404
            if (~err.message.indexOf('not found')) {
                console.log('NOT FOUND....!!!!'); // debug to figure out when this is happening
                return next();
            }
            
            //Log it
            console.error(err.stack);

            res.failure('Error! ' + err);
        });

        // Assume 404 since no middleware responded
        app.use(function(req, res, next) {
            res.failure('Not found', 404);
        });
        
        

    });
};