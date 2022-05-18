const router = require('express').Router()
const app = require('express')()
const {mainHandler,usersHandler,aboutHandler} = require('./controller')
// const middleware = require('./index')



router.get("/", mainHandler);
router.get("/users", usersHandler);
router.get('/about',aboutHandler);

/**
 * it's do not work
 * router.get('/about',middleware.localMiddleware,aboutHandler);
 */




module.exports = router;