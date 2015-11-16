## Node App
Node app is a a simple web app that everyone can use it to post some information. The app has an admin user that is able to manage those posts. The posts are also reachable by calling REST APIs.

###Requirements
```Node.js, Mongodb```
###Installation & Setup
- Clone the repo :  `git clone git@github.com:yizhiheng/NodeApp.git`
- Go into directory : `cd NodeApp`
- Install required packages : `npm install`
- Start mongodb service : `mongod`
- Set up the admin user : `cd tools && node newAdmin.js`
- Start the server : `node server.js`
- Open your browser and goto : `http://localhost:3000`

###Endpoint Docs
- Get all posts : `GET: /api/posts`
- Get post with id : `GET: /api/post/{postId}`
- Get post with count limt : `GET: /api/posts?count={#}`
- Query post with keyword : `GET: /api/posts?keyword={keyword}`
- Get post with creator : `GET: /api/posts?creator={username}`
- Create a post : `POST: /api/posts?content={content}&creator={creator}`
- Delete a post with id : `DELETE: /api/posts/{postId}?token={token}`
- Update a post : `PUT: /api/posts/{postId}?content={content}&token={token}`
- Acquire admin token : `POST: /api/auth?username={username}&password={password}`