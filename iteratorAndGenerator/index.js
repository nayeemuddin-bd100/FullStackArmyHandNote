// iterate means to iterate over the elements of an array or an object. we can use map, for loop etc to iterate something here the problem is we can't pause the iteration before the iteration is done. That's why we need to use iterator..

const range = {
  start: 10,
  stop: 20,
  step: 1,
};
range[Symbol.iterator] = function () {
  let current = this.start;
  const stop = this.stop;
  const step = this.step;

  return {
    next() {
      const obj = {
        value: current,
        done: current > stop,
      };
      current += step;
      return obj;
    },
  };
};

for (let v of range) {
  console.log(v);
}

// const rangeIterator = range[Symbol.iterator]();
// console.log(rangeIterator.next());
// console.log(rangeIterator.next());
// console.log(rangeIterator.next());

/*******************************************
 * *******************************************
 * Generator **********************************
 * **********************************************/

//Generator returns an iterator object. To use generator we have to use * before function name.

function* myGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

// const iterator = myGenerator();
// console.log(iterator.next()); // { value: 1, done: false }
// console.log(iterator.next()); // { value: 2, done: false }
// console.log(iterator.next()); // { value: 3, done: false }
// console.log(iterator.next()); // { value: undefined, done: true }

// let's looks a real life example.
//  Suppose we want to create a function that generates a unique id for each user. This id must be serially . so we can simply call the function and get the next id when we need.

function* generateId() {
  let index = 1;
  while (true) {
    yield index++;
  }
}

const generateUserId = generateId();
const generateProductId = generateId();

console.log("User", generateUserId.next().value); // User 1
console.log("User", generateUserId.next().value); // User 2
console.log("User", generateUserId.next().value); // User 3

console.log("Product", generateProductId.next().value); // Product 1
console.log("Product", generateProductId.next().value); //Product 2
console.log("Product", generateProductId.next().value); //Product 3
console.log("Product", generateProductId.next().value); //Product 4
console.log("Product", generateProductId.next().value); //Product 5
console.log("Product", generateProductId.next().value); //Product 6

/*******************************************
 * *******************************************
 * Async iterator and async generator **********************************
 * **********************************************/

// for asynchroneous programming we need to use async iterator and async generator.

// Ex:1
const axios = require("axios").default;

async function getUsers() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const { data: users } = await axios.get(url);
  return users;
}

async function* getPostsByUser(users) {
  const url = "https://jsonplaceholder.typicode.com/posts";
  for (let i = 0; i < users.length; i++) {
    const { data: posts } = await axios.get(`${url}?userId=${users[i].id}`);
    yield posts;
  }
}

getUsers()
  .then(async (users) => {
    // const userIterator = await getPostsByUser(users);
    // await userIterator.next();
    // await userIterator.next();
    // console.log((await userIterator.next()).value);

    for await (let v of getPostsByUser(users)) {
      console.log(v.map((d) => d.title));
    }
  })
  .catch((e) => {
    console.log(e);
  });

// ex:2
const axios = require("axios").default;

async function getUsers() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const { data: users } = await axios.get(url);
  return users.map((user) =>
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
  );
}

(async () => {
  const users = await getUsers();
  for await (let v of users) {
    console.log(v.data.map((post) => post.title));
  }
})();
