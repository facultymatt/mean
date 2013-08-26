

module.exports = function(app, config, passport, user) {

    /**
    * Admin can access all pages!
    *
    */
    user.use(function (req) {
      console.log('CATCH ALL...');
      console.log(req.user);
      if(!req.user) {
          return false;
      }
      
      // Here we need to check for user, which is what roles uses to store its functions
      // and also what passport uses to store a logged in user.
      // we can remove this check if we move roles to after the router is called. 
      // however then we get an error when there is no user defined. 
      if(req.user && !req.user.isAuthenticated && !req.user._id) {
          return false;
      }
      
      if (req.user && req.user.role === 'admin') {
        return true;
      }
    });
    
    
    /**
    * Vendors can access private pages
    *
    */
    user.use('access private page', function (req) {
        if (req.user && req.user.role === 'vendor') {
            return true;
        }
    });
    
    /**
    * Vendors can access private pages
    *
    */
    user.use('view all programs', function (req) {
        return true;
    })
    

    
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