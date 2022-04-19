/****************************************************
 * ********************* Array ****************************
 * *************************************************
 */

// Array
/**
 * Store 10 students information
 * - name
 * - email
 * - id
 */

// a utility to create a random id
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const students = [
  {
    id: "67de71e5-0eac-474f-ab51-850ba9b31ed5",
    name: "Md Al-Amin",
    email: "alamin@test.com",
  },
  {
    id: "ebdf6b78-c32b-4b1d-8574-e8c655b05c1e",
    name: "Akib Ahmed",
    email: "akib@test.com",
  },
  {
    id: "ee729e84-a84e-4adf-b32c-4647a7114d5b",
    name: "Elias Emon",
    email: "elias@test.com",
  },
];

/**
 * 1. Easily Traverse
 * 2. Filter
 * 3. Delete (medium) [splice -> O(n), filter -> O(n)]
 * 4. Update (medium) (easy) [push -> O(n)]
 * 5. Create a new one (easy task) [push -> O(1), unshift -> O(n)]
 */

// create a new students
students.push({
  id: uuidv4(),
  name: "Fahim Faisal",
  email: "fahim@test.com",
});

// update
const idToUpdate = "ee729e84-a84e-4adf-b32c-4647a7114d5b";
const updatedData = {
  name: "Habiba Akhtar",
  email: "habiba@test.com",
};

// to update any array element we may use find method, but it will happen an error because of updating reference and re-assighment.So, let's have a look at the below code:
const updatedObj = students.find((student) => student.id === idToUpdate);
updatedObj.name = updatedData.name;
updatedObj.email = updatedData.email;

// When we need to re-assighn, the recommended way is to use with index like below:

const updatedIndex = students.findIndex((item) => item.id === idToUpdate);

students[updatedIndex] = {
  ...students[updatedIndex],
  ...updatedData,
};
// console.log('Updated', students);

// Delete
students.splice(updatedIndex, 1);

// console.log('Deleted', students);

// Array traverse
// forEach, map, filter, every, reduce, some, find, findIndex -> traversing method

for (let i = 0; i < students.length; i++) {
  // console.log(students[i].name);
}

// for in return index for array, return key for object
for (let i in students) {
  // console.log(students[i].name);
}

// for of return value
for (let value of students) {
  // console.log(student.name);
}




/****************************************************
 * ********************* Object ****************************
 * *************************************************
 */


// Object
/**
 * Store 10 students information
 * - name
 * - email
 * - id
 */

/**
 *
 * a utility to create a random id
 */
const studentsObj = {
  "67de71e5-0eac-474f-ab51-850ba9b31ed5": {
    id: "67de71e5-0eac-474f-ab51-850ba9b31ed5",
    name: "Md Al-Amin",
    email: "alamin@test.com",
  },
  "ebdf6b78-c32b-4b1d-8574-e8c655b05c1e": {
    id: "ebdf6b78-c32b-4b1d-8574-e8c655b05c1e",
    name: "Akib Ahmed",
    email: "akib@test.com",
  },
  "ee729e84-a84e-4adf-b32c-4647a7114d5b": {
    id: "ee729e84-a84e-4adf-b32c-4647a7114d5b",
    name: "Elias Emon",
    email: "elias@test.com",
  },
};

/**
 * 1. Easily Traverse [O(n)]
 * 1.1 Get anything if you have the key [O(1)]
 * 2. Filter
 * 3. Delete (medium) [O(1)]
 * 4. Update (medium) [O(1)]
 * 5. Create a new one (easy task) [O(1)]
 */

// create
const std = {
  id: uuidv4(),
  name: "Feroz Khan",
  email: "feroz@test.com",
};

studentsObj[std.id] = std;

// update
const idToBeUpdated = "ee729e84-a84e-4adf-b32c-4647a7114d5b";
const updatedObj2 = {
  name: "HM Azizul",
  email: "azizul@test.com",
};
studentsObj[idToBeUpdated] = {
  ...studentsObj[idToBeUpdated],
  ...updatedObj2,
};

// delete
delete studentsObj[idToBeUpdated];

// Get
// console.log(studentsObj['67de71e5-0eac-474f-ab51-850ba9b31ed5']);

// Imperative or Procedural way
for (let key in studentsObj) {
  // console.log(studentsObj[key]);
}

// Traverse(declarative way )[built in method]
// we can't use imperative way in jsx , we have to use built in method such as forEach, map,filter stuff like that.

// Object.keys() -> return all keys of an object as an array
// Object.values() -> return all values of an object as an array
// Object.entries() -> return all key-value pairs of an object as an array

Object.values(studentsObj).forEach((student) => {
//   console.log(student.name, student.email);
});




/****************************************************
 * ****************** Which is performance enhancer? Object or Array? *******************************
 * *************************************************
 */

// Which is performance enhancer? Object or Array?


const arr = [];
const arrToObj = {};
for (let i = 0; i < 5000000; i++) {
	const o = {
		id: i,
		value: i,
	};
	arr.push(o);
	arrToObj[i] = o;
}

// ======> update value

// In below code we can see that to update an object within array it takes 104.901ms and to update an object within object it takes only 0.019ms.

//console.time('array');
let id = 4999999;
const obj = arr.find((item) => item.id === id);
obj.value = 555;
//console.timeEnd('array'); // 104.901ms

//console.time('obj');
arrToObj[id].value = 999;
//console.timeEnd('obj'); // 0.019ms



// ====> added new value

console.time('array');
arr.unshift({
	id: 5000000,
	value: 5000000,
});
//console.timeEnd('array'); // 15.084ms


// console.time('obj');
arrToObj[5000000] = {
	id: 5000000,
	value: 5000000,
};
// console.timeEnd('obj'); // 0.018ms



// ====> Delete

// console.time('array');
const index = arr.findIndex((item) => item.id === 4000000);
arr.splice(index, 1);
// console.timeEnd('array'); // 93.135ms

// console.time('obj');
delete arrToObj[4000000];
// console.timeEnd('obj'); // 0.015ms


/****************************************************
 * ****************** Performance check for map, filter, reduce *******************************
 * *************************************************
 */



// =====> filter

let arr3 = [1,2,3,null,undefined,0,NaN,4,5];

let truthy = arr3.filter((v) => !!!v);
// fitlter will return truthy values as default
// console.log(truthy); // [1,2,3,4,5]

// but if we need onlu truthy values without default way we can use !! (double excclamation)before name.
let truthy2 = arr3.filter((v) => !!v);
// fitlter will return truthy values as default
// console.log(truthy2); // [1,2,3,4,5]


// =====> reduce
// map, filter, reduce

const numbers = [1, 2, 3, 4, false, '', NaN, 5, 6];

/**
 * Map -> [same length as the original array]
 * Filter -> [with filtered item]
 * Reduce -> Know one knows (Only you know) all possible value
 */

// we want this -> '1234falseNaN56'
// we want this -> [123456]
// we want this -> [1,2,3,4,5,6]
const result2 = numbers.reduce((acc, cur, index) => {
	if (index === 0) acc += '[';
	if (cur) {
		acc += cur.toString() + (index < numbers.length - 1 ? ', ' : '');
	}
	if (index === numbers.length - 1) acc += ']';
	return acc;
}, '');

// console.log(result2);


// map will return a new array with modifeid values


// =====> reduce vs filter(comparison time complaxity)
const arr2 = [];
for (let i = 1; i < 5000000; i++) {
    arr2.push(i);
}

//  console.time('not-optimized');
 arr2.filter((item) => item % 2 === 0).map((item) => item * 2);
//  console.timeEnd('not-optimized'); // 562.423ms
 
//  console.time('optimized');
 arr2.reduce((acc, cur) => {
     if (cur % 2 === 0) { 
         acc.push(cur * 2);
     }
     return acc;
 }, []);
//  console.timeEnd('opt imized'); // 238.3ms



//  Implementation of reduce function 
function myReduce(arr, cb, init) {
	let acc = init;
	for (let i = 0; i < arr.length; i++) {
		acc = cb(acc, arr[i], i, arr);
	}
	return acc;
}

// sum by myReduce function
const sum = myReduce([1, 2, 3, 4], (a, b) => a + b, 0);
// console.log(sum);

// filter by myReduce function
const arr4 = [1, 2, '', false, 3, NaN, false, 4, 5, NaN, 6];
const result = myReduce(
	arr4,
	(acc, cur) => {
		if (cur) {
			// acc.push(cur ** 2);
			acc.push(cur);
		}
		return acc;
	},
	[]
);
// console.log(result); // [1, 2, 3, 4, 5, 6]



// **************************************************************************************************************/
// reduce with data from api.(convert array to object)

const axios = require('axios').default;
const url = 'https://jsonplaceholder.typicode.com/posts';

async function getData() {
	const {data} = await axios.get(url);
    const temp = data.slice(0, 10)

    // we are trying to convert array to object and remove body property using map.
    /*
    const result = temp.map((item) => {
		return {
			userId: item.userId,
			id: item.id,
			title: item.title,
		};
	});
    return result
    */


    // Map working fine , But the problem is map can't convert to object. It always return array.

    // So In that case we can use reduce method.
	const result = temp.reduce((acc, cur) => {
        
		acc[cur.id] = { ...cur };
		delete acc[cur.id].body;
		return acc;
	}, {});
	return result; 
}

getData()
	.then((data) => console.log(data))
	.catch((e) => console.log(e));