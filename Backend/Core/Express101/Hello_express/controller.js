// const fs = require("fs");

exports.mainHandler = (req, res) => {
  // const error = new Error('Bad request');
  // error.status = 404

  // throw error


  // to read index file
    // fs.readFile("./pages/index.html", (err, data) => {
    //   if (err) {
    //     console.log("Error", err);
    //     res.send("Something went wrong");
    //   } else {
    //     res.write(data);
    //     res.end();
    //   }
    // });


    // we can use ejs to dynamic read file insted fs module
    const title = 'Home title';
    res.render('pages/home',{title})

  };


exports.usersHandler = (req, res) => {
    // res.send("Hello userss"); 

    // when we render any page by ejs thn we have to call res.render(page address)
    const title = 'Users title';
    res.render('pages/users',{title})
  };


exports.aboutHandler =  (req,res) => {
    // res.send('Hello about');
    const title = 'About title';
    res.render('pages/about',{title})
}