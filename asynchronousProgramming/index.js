// event loop
// The event loop runs in the background at all the times. When we execute a function or any code, it will added to the call stack.  If the code is asynchronous, it will be added to the web api and queue  after that. The event loop will execute when the call stack is empty, and this code or asynchronous function will be sent from the queue to the call stac  

// ref: https://towardsdev.com/event-loop-in-javascript-672c07618dc9
// js visualizer


/**********************************************
 * ***************************CALLBACK HELL*****
 * **********************************************/

// We have to find it out from api
/* 1. find user by username
 * 2. find posts by userid
 * 3. find latest post
 * 4. find comments by post id
 * 5. find latest comment
 * 6. find username of the last commented user
 */

/** Api inpoints
 * /users?username=[username]
 * /posts?user_id=[user_id]
 * /comments?post_id=[post_id]
 * /users?username=[username]
 */

/*
 function get(path, cb) {
	const data = {}; // somehow process it
	cb(data);
}

function getUserNameFromComment(username) {
	get(`/users?username=${username}`, (user) => {
		get(`/posts?user_id=${user.id}`, (posts) => {
			get(`/comments?post_id=${posts[0].id}`, (comments) => {
				get(`/users?username=${comments[0].username}`, (user) => {
					// console.log(user);
				});
			});
		});
	});
}

getUserNameFromComment('ariful');

*/
/*********************************
 * ************** Promise **********
 * ********************************/
/*
 const isResolved = true;

 const promise = new Promise((resolve, reject) => {
     if (isResolved) {
         resolve('completed');
     } else {
         reject('data');
     }
 });
 
 console.log(promise);
 
 promise
     .then((result) => {
         console.log(result);
     })
     .catch(() => {
         console.log('Rejected');
     });



*/



/*******************************
 * ***************************
 * ********************************/

function wait(ms) {
	const promise = new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
	return promise;
}

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait(1000).then(() => {
	// console.log('Done in 1000ms');
});

wait(2000).then(() => {
	// console.log('Done in 2000ms');
});

wait(3000).then(() => {
	// console.log('Done in 3000ms');
}); 

/*******************************
 * ***************************
 * ********************************/


//  temporary fetch data from api using promise! and find out  promise is much better then callback hell and find out another problem of promise.

/**
 * 1. find user by username
 * 2. find posts by userid
 * 3. find latest post
 * 4. find comments by post id
 * 5. find latest comment
 * 6. find username of the last commented user
 */

/**
 * /users?username=[username]
 * /posts?user_id=[user_id]
 * /comments?post_id=[post_id]
 * /users?username=[username]
 */

// Code of callback hell
/*
 const get = (url) => Promise.resolve();

 function getUserNameFromComment(username) {
     get(`/users?username=${username}`, (user) => {
         get(`/posts?user_id=${user.id}`, (posts) => {
             get(`/comments?post_id=${posts[0].id}`, (comments) => {
                 get(`/users?username=${comments[0].username}`, (user) => {
                     console.log(user);
                 });
             });
         });
     });
 }
 */

/************************* */


/*
// Code of promise
 get(`/users?username=anarul`)
     .then((user) => {
         return get(`/posts?user_id=${user.id}`);
     })
     .then((posts) => {
         const latestPost = posts[0];
         return get(`/comments?post_id=${latestPost.id}`);
     })
     .then((comments) => {
         const latestComment = comments[0];
         return get(`/users?username=${latestComment.username}`);
     })
     .then((user) => {
         console.log(user);
     })
     .catch((e) => {
         console.log('Error');
     });
 
*/
/*************************************************** */
// The final easiest way to solve this problem is using async/await. we can use try catch block with async await to handle the error. 
/*
 async function getUserName(username) {
   try {
     const mainUser = await get(`/users?username=${username}`)
     const posts = await get(`/posts?user_id=${mainUser.id}`);
     const comments = await get(`/comments?post_id=${posts[0].id}`);
     const user = await get(`/users?username=${comments[0].username}`);
     console.log(user)
   } catch (e) {
     console.log(e)
   }
 }

 */



 const axios = require('axios').default;

 const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
 const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
 const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';
 
 // username = Bret;
 
 async function getComments(username) {
     try {
         const { data: user } = await axios.get(
             `${USERS_URL}?username=${username}`
         );
         const { data: posts } = await axios.get(
             `${POSTS_URL}?userId=${user[0].id}`
         );
         

         const { data: comments } = await axios.get(
             `${COMMENTS_URL}?postId=${posts[0].id}`
         );
         
         const { data: userWithComment } = await axios.get(
             `${USERS_URL}?email=${comments[1].email}`
         );
         console.log(userWithComment);
     } catch (e) {
         console.log('Error Occurred', e.toJSON());
     }
 }
 
 getComments('Bret'); 
  