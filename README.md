# Node App
Node app is a a simple web app that everyone can use it to post some information. The app has an admin user that is able to manage those posts. The posts are also reachable by calling REST APIs.

##Requirements
```Node.js, Mongodb```
##Installation & Setup
- Clone the repo :  `git clone git@github.com:yizhiheng/NodeApp.git`
- Go into directory : `cd NodeApp`
- Install required packages : `npm install`
- Start mongodb service : `mongod`
- Set up the admin user : `cd tools && node newAdmin.js`
- Start the server : `node server.js`
- Open your browser and input : `http://localhost:3000`
- Run nodeapp in production : `pm2 start server.js`

##Sequence Diagram
![alt tag](https://raw.github.com/yizhiheng/NodeApp/master/screenshots/SequenceDiagram.png)

##Endpoint Docs
- Get all posts : `GET: /api/posts`
	- Notice : the posts are in the time order, newest post is in the first place
- Get post with id : 
	- `GET: /api/posts/{postId}`
	- `GET: /api/posts?postId={postId}`
- Get post with count limt : `GET: /api/posts?count={#}`
	- Sample Request : `GET: /api/posts?count=2`
- Query posts with keyword : `GET: /api/posts?keyword={keyword}`
- Get post with creator : `GET: /api/posts?creator={creator}`
	- Notice : `count`, `keyword` and `creator` can work together
	- Sample Request : `GET: api/posts/keyword=hello&creator=leo&count=2` -- Get only 2 posts that created by leo and contains keyword hello
- Create a post : `POST: /api/posts?content={content}&creator={creator}`
	- Notice : `content`, and `creator` can be included in request body, `creator` is optional
	- Sample Request : `POST: /api/posts?content=HelloWorld&creator=jack`

---

- GET admin token : `POST: /api/auth`
	- Notice : `username` and `password` should be either included in the request body, or in url params.
	- Sample Request : POST: `POST: /api/auth?username=admin&password=admin` --- params are in url
- Update a post : `PUT: /api/posts/{postId}?content={content}&token={token}`
	- Notice : `content` and `token` also can be included in the request body
- Delete a post with id : `DELETE: /api/posts/{postId}?token={token}`
	- Notice : `token` also can be in request body
	- Sample Request : `DELETE: /api/posts/564a2fc626d7e822318e7c9f?token=...`


##Implementation Architecture
Node App was built with Node.js. The web framework is Express.js. Briefly, it has following 4 components : 
- **server & app** : defined the application and server to listen at a specific port
- **views** : contain frontend ejs templates, express.js uses these template to render the html pages
- **models** : contain object model for admin and post
- **routes** : defined the endpoints (URIs) to the application and how it responds to client requests. Since the program logic is not very complicated, the app middleware was also implemented in here

Bootstrap was used as the front-end framework. Also, jQuery and Angular.js were used for DOM manipulation and data binding.
 
