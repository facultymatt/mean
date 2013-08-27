/**
 *
 * ROLES defined
 *
 *
 */
module.exports = function(app, config, passport, user) {

    /**
    * Admin can access all pages!
    *
    */
    user.use(function (req) {
      if (req.user && req.user.role === 'admin') {
        return true;
      }
    });
    
    /**
    * Check for logged in users
    *
    */
    user.use('logged in', function (req) {
      if(req.user && req.user.id) return true;
    });
    
    /**
    * Another example of admin checking, this would pass user.is('admin')
    *
    */
    user.use('admin', function (req) {
      console.log('user is ... ' + req.user.role);
      
      if(req.user && req.user.role) {
          console.log('user is ... ' + req.user.role);
          return req.user.role;
      }
    });
    
    
    /**
    * View a specific user... will have already passed the admin check
    * here we only check if the user id matches the requested user id
    *
    */
    user.use('view user', function (req) {
        
        console.log('attempting to view user ' + req.params.userId);
        console.log('session user id is      ' + req.user._id);
        
        if (req.user && req.user._id == req.params.userId) {
            console.log('GOOD TO GO!');
            return true;
        }
        
    });
    
    
    
    /**
    * Vendors can access private pages
    *
    */
    user.use('CRUD', function (req) {
        
        var role = req.user.role;

        if (req.user && role === 'vendor') {
            return true;
        }
        
    });
    
    /**
    * Vendors can access private pages
    *
    */
    user.use(function (req, action) {
        return action === 'view all programs';
    });
    
    /**
    * Vendors can access private pages
    *
    */
    user.use('manage this program', function (req) {
        
        var roles = ['vendor'];
        
        
        
        
        if (req.user && req.user.role === 'admin') {
            return true;
        }
    });
    
    /**
    * Vendors can access private pages
    *
    */
    user.use('manage this vendor', function (req) {
        if (req.user && req.user.role === 'vendor' && vendor.id === req.vendor.id) {
            return true;
        }
    });
    
    
    /**
    * Edit programs
    *
    */
    user.use('edit this program', function (req) {
        if (req.user && req.user.role === 'vendor') {
            return true;
        }
    });
    
    

    
    /**
    * Set custom error message handling 
    *
    */
    user.setFailureHandler(function (req, res, action){
      var accept = req.headers.accept || '';
      
      res.status(403);
      if (~accept.indexOf('html')) {
        res.render('access-denied', {action: action});
      } else {
        
        var requestObj = {
            meta: {
                status: 'error',
                message: 'Access Denied - You don\'t have permission to: ' + action
            }
        };
      
        res.json(requestObj, 401);
      }
    });


}