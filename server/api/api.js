var router = require('express').Router();

var users = require('./user/userRoutes');
var categories = require('./category/categoryRoutes');
var posts = require('./post/postRoutes');

// api router will mount other routers
// for all our resources. Each resource directory
// has a resourceRoutes.js file with the router ready to go,
// require them and mount them to their respective routes below

router.use('/users', users);
router.use('/categories', categories);
router.use('/posts', posts);

module.exports = router;
