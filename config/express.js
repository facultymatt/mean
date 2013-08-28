/**
 * Module dependencies.
 */
var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash'),
    path = require('path'),
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
    
    // PORT from genesis
    //app.use(express.static(config.root + '/build'));
    //app.use("/downloads", express.static(config.root + '/tmp'));
    app.use(express.static(path.join(__dirname, '../../build')));
    app.use("/downloads", express.static(path.join(__dirname, '../../tmp')));
    
    // end port

    //Don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(express.logger('dev'));
    }

    //Set views path, template engine and default layout
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');
    //app.set('views', __dirname + '/views');

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
        
        
        // welcome message for API
        app.all('/api', function(req, res, next) {
            res.ok('Hello world!');
        });

        // Assume "not found" in the error msgs is a 404. 
        // this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
        app.use(function(err, req, res, next) {
            
            console.log(err);
            
            if(~err.message.indexOf('CastError')) {
                // respond with 'bad request' ie: this will never work
                // dont try this request again! 
                console.log(err);
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
            
            next(); // needed or the calls below will never happen
        });

        
        // catch all for api endpoints
        // that are not offical. They get a not found response
        // 
        // @note that by putting app.all() inside app.use() we ensure its run after
        //       the regular routing. if we just called app.all() it would override all the other routes.
        //
        app.use(function(req, res, next) {
            app.all('/api*', function(req, res, next) {
                return res.failure('Resource not found', 404);
            });
            next(); // needed or the calls below will never happen
        });
        
        
        // catch all for non-api routes
        // this serves up our main app
        app.use(function(req, res, next) {
            app.get('*', function(req, res, next) {
                //return res.ok('catch all');
                res.redirect('/#' + req.url);
            });
        });

    });
};