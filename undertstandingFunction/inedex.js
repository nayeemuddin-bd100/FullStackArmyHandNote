// There are two steps of a function
// 1. Define a function
function testFunction() {
	const a = 10;
	const b = 20;
	const result = a + b + Math.max(a, b);
	// console.log(result);
}
// 2. Invoke a function
testFunction();



/**************************************
 * FunctionComposition ****************
 * ************************************
 */

// when a fuction is passed as an argument to another function, it is called a "function composition"
function sum(a, b) {
	return a + b;
}

function sub(a, b) {
	return a - b;
}

// G(a, b)
function times(a, b) {
	return a * b;
}

const a = 10;
const b = 20;

const r = Math.abs(times(sum(a, b), sub(a, b)));
// console.log(r)



/**********************************
 *  Function is a first class citizen
 * ********************************
 */


// Function is a first class citizen
// we can treat function as value
// 10, "test", true -> function

/**
 * Benefits:
 * - we can store functions in a variable
 * - we can store function inside an object / array
 * - we can pass function as an argument
 * - we can also return a function from another function
 */

// Prove -> Function is a value
function testFunction() {
	console.log('I am a test function');
}
 
const fn = testFunction;
console.log(fn);
// fn();

const ar = [fn, testFunction]
const o = {
	fn: testFunction
}

function returnFn() {
	return testFunction
}


/************************************
 * construct a function
 * **********************************
 */
const fn2 = new Function(
	'str',
	`let obj = {};
	for (let s of str) {
		if (s !== ' ') {
			obj[s] = s;
		}
	}
	return obj;`
);

// console.log(fn2('HM Nayem'));
// On the above code, we can pass arguments as many as we want. But last argument must be the function body. If we don't pass the body as last argument it will throw an error.


// Meta programming which is create a function dynamically in runtime .
// More examples of function construction based on meta programming:
const fData = {
	params: ['a', 'b'],
	body: [
        'const r = a+b', 
        'return r'
    ],
};

const fBody = fData.body.reduce((acc, cur) => {
	acc += cur + ';';
	return acc;
}, '');
// console.log(fBody); //const r = a+b;return r;

const tf = new Function(...fData.params, fBody);
// console.log(tf(100, 200)); //300



/********************** */


const greetFn = new Function(
	'name',
	'email',
	`
	const fName = name.split(' ')[0];
	console.log('Hello,', fName, 'Is that your email?', email);
	console.log('Yeah, this is mine.');
	return fName;
	`
);

// console.log(typeof greetFn); // function
// console.log(greetFn.__proto__); 
// console.log(greetFn.toString()); // it will return the function body
// const fName = greetFn('HM Nayem', 'nayem@gmail.com');
// console.log('First Name:', fName);


/************************* */
 
const operations = [
	{
		args: [10, 20],
		params: ['a', 'b'],
		body: 'console.log("a + b",a + b)',
	},
	{
		args: [10, 20],
		params: ['a', 'b'],
		body: 'console.log("a - b",a - b)',
	},
	{
		args: [10, 20],
		params: ['a', 'b'],
		body: 'console.log("a * b",a * b)',
	},
	{
		args: [],
		params: [],
		body: 'console.log("Hello World! No params, no args")',
	},
	{
		args: [5],
		params: ['n'],
		body: `
			for (let i = 0; i < n; i++) {
				let line = '';
				for (let j = 0; j < n; j++) {
					line += '* ';
				}
				console.log(line);
			}
		`,
	},
];

operations.forEach((operation) => {
	const fn = new Function(...operation.params, operation.body);
	fn(...operation.args);
});