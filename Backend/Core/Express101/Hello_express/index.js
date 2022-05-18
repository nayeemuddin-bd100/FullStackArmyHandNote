const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");
const router = express.Router()
// router is a middleware we can use router insted of app

// middleware
/**
 * responsibilities of middleware
 * - handle common task
 * - log request
 * - filter request
 * - modify or reshape request
 * - validate request body
 * - authenticate or authorize request
 * - add additional details to request body
 * - respose bad request
 * - pass request to next middleware or request handler
 *
 */

// set ejs
app.set("view engine", "ejs");
app.set('views', __dirname + '/views'); 

// third party middleware use korte hole app.use() er maddome use korte hoe
app.use(express.json());
// express.json will convert req.body to json or j json ta req er maddome patano hobe ta read kore req.body object er modde rakhbe.

app.use(express.urlencoded({ extended: true }));
// jokon amra multipage application er khetre form niye kaj korbo tkon url encoded data pawar jonno ei middleware use korbo

// we can also use more third party middleware like morgan, cors,body parser etc.
app.use(router)
app.use(morgan("dev")); // morgan will log the request in the console
app.use(cors()); // cors is a middleware to handle cross origin request

// useing static middleware we can access static files from browser ... such as right now we can use http://localhost:5000/img-1.jpeg nd it will retur the image
app.use(express.static('./public'))
app.use(globalMiddleware); // jokon amra ekta function er modde globalmiddlware return korbo tokon ei globalmiddleware() evabe likhte hobee, onnothai call korar dorkar nai, just app.use(globalMiddleware) liklei hobe.


// uporer egula hosse global middleware ja jekono route er khetre kaj korbe. and global middleware always app.use() er maddome define korte hy.

// middleware and controller signature almost same
// This is a middleware signature
//  if everything  seems ok then controller will call response method
//  if everything  seems ok then middleware will call next

function handler(req, res, next) {
  /**
   * read request obbject
   * process request
   * response back the result
   */
}
function middlewareSignature(req, res, next) {
  next();
}

// custom global middleware
function globalMiddleware(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  console.log("I am Global middleware");
  next();
}
// custom local middleware

function localMiddleware(req, res, next) {
    console.log("I am local middleware");
    next();
  }


app.use(require('./routes.js'))

// handle global error
app.use((req,res,next) =>{
  const error = new Error('404 Not Found');
  error.status = 404;
  // res.status(404).send( '<h1>404 Not Found</h1>' )
  next(error)
} )

app.use((error,req,res)=> {
  console.log('Error=> ' , error)
  if(error.status){
    return res.status(error.status).send(`<h1> ${error.message}</h1>`)
  }

  res.status(5000).send('<h1>Something went wrong</h1>')
})

// **************************************************************
// we are separing this route from index file to router.js file
// Handler for the route
// const mainHandler = (req, res) => {
//   fs.readFile("./pages/index.html", (err, data) => {
//     if (err) {
//       console.log("Error", err);
//       res.send("Something went wrong");
//     } else {
//       res.write(data);
//       res.end();
//     }
//   });
// };

// const usersHandler = (req, res) => {
//   res.send("Hello userss");
// };


// about handler
// const aboutHandler =  (req,res) => {
//     res.send('Hello about');
// }



// app.get("/about", localMiddleware, (req, res) => {
//     res.send('Hello about');
// });
// Routes
// app.get("/", mainHandler);
// app.get("/users", usersHandler);
// app.get('/about',localMiddleware,aboutHandler);


// router.get("/", mainHandler);
// router.get("/users", usersHandler);
// router.get('/about',localMiddleware,aboutHandler);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});



module.exports.localMiddleware = localMiddleware