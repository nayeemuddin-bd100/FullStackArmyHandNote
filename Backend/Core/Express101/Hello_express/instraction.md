## fs module
1. data read and write korar khetre amra fs module use korbo. res.send er maddome amra chaile ekta h2 typer jekhono html tag or file string akare browser e patiye dite pari .. kintu jodi kono pages folder modde html file rekhe ta browser e patate chai ba read korte chai tkn amra fs module use korbo.
Basic code snippet:
```js
const mainHandler = (req, res) => {
    fs.readFile('./pages/index.html',(err,data) => {
        if(err){
            console.log('Error', err)
            res.send('Something went wrong');
        }else{
            res.write(data);
            res.end();
        }
    })
}
//ekhane data mane hosse buffer, eta niye pore alochona thakse!!
```