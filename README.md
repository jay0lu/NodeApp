# Node App
Node app is a a simple web app that everyone can use it to post some information. The app has an admin user that is able to manage those posts. The posts are also reachable by calling REST APIs.

##Requirements
Node.js, Mongodb, npm

##Installation & Setup
- **Clone the repo** :  `git clone git@github.com:yizhiheng/NodeApp.git`
- **Go into directory** : `cd NodeApp`
- **Install required packages** : `npm install`
- **Start mongodb service** : `mongod`
- **Set up the admin user** : `cd tools && node newAdmin.js`
- **Start the server** : `node server.js`
- **Open your browser and input** : `http://localhost:3000`
- **Run nodeapp in production** : `pm2 start server.js`

##Deployment with Docker
If you are a **Docker** user, you can checkout to docker branch, and build your own image with **Dockerfile**. It will set up anything for you. Here is a quick instruction for Docker 1.8.0 on OS X
- **Clone the repo first** :  `git clone git@github.com:yizhiheng/NodeApp.git`
- **Go to the right dir** : `cd NodeApp`
- **Checkout to docker branch** : `git checkout docker`
- **Start your Docker daemon**, the easiest way to do this is by clicking this icon : <img src="http://img.informer.com/icons_mac/png/128/321/321309.png" alt="docker icon" width="35px" height="35px">
- **Build docker image** : `docker build -t <your name>/<your repo> .` (Don't forget the . period)
- **Grab a** <img src="http://www.cliparthut.com/clip-arts/965/coffee-cup-clip-art-965206.png" alt="docker icon" width="30px" height="30px">, this process may take a while...
- **Check if your image is ready** : `docker images`

![alt tag](https://raw.github.com/yizhiheng/NodeApp/master/screenshots/dockerimage.png)
- **Run your new image** : `docker run -p 3000:3000 -d <your name>/<your repo>`
- **Find address of your docker host vm** : `docker-machine ls`, the address is `192.168.99.100` on my computer

![alt tag](https://raw.github.com/yizhiheng/NodeApp/master/screenshots/dockermachine.png)
- **Open your favorite browser, goto link** : `http://192.168.99.100:3000`, you should be able to see the results

---

If you are a super lazy person and you don't want to build docker image, you can just pull this public image from Docker Hub.
- **Pull image for docker hub** : `docker pull yizhiheng/nodeapp`
- **Run image** : `docker run -p 3000:3000 -d yizhiheng/nodeapp`
- **Open your browser and see what's happening :)**


##Sequence Diagram
![alt tag](https://raw.github.com/yizhiheng/NodeApp/master/screenshots/SequenceDiagram.png)

##Endpoint Docs
####For all users : 
- **Get all posts** : `GET: /api/posts`
	- Notice : the posts are in the time order, newest post is in the first place
- **Get post with id** : 
	- `GET: /api/posts/{postId}`
	- `GET: /api/posts?postId={postId}`
- **Get post with count limt** : `GET: /api/posts?count={#}`
	- Sample Request : `GET: /api/posts?count=2`
- **Query posts with keyword** : `GET: /api/posts?keyword={keyword}`
- **Get post with creator** : `GET: /api/posts?creator={creator}`
	- Notice : `count`, `keyword` and `creator` can work together
	- Sample Request : `GET: api/posts/keyword=hello&creator=leo&count=2` -- Get only 2 posts that created by leo and contains keyword hello
- **Create a post** : `POST: /api/posts?content={content}&creator={creator}`
	- Notice : `content`, and `creator` can be included in request body, `creator` is optional
	- Sample Request : `POST: /api/posts?content=HelloWorld&creator=jack`

---
####For admin : 
- **GET admin token** : `POST: /api/auth`
	- Notice : `username` and `password` should be either included in the request body, or in url params.
	- Sample Request : `POST: /api/auth?username=admin&password=admin` --- params are in url
- **Update a post** : `PUT: /api/posts/{postId}?content={content}&token={token}`
	- Notice : `content` and `token` also can be included in the request body
- **Delete a post with id** : `DELETE: /api/posts/{postId}?token={token}`
	- Notice : `token` also can be in request body
	- Sample Request : `DELETE: /api/posts/564a2fc626d7e822318e7c9f?token=...`


##Implementation Architecture
Node App was built with Node.js. The web framework is Express.js. Briefly, it has following 4 components : 
- **server & app** : defined the application and server to listen at a specific port
- **views** : contain frontend ejs templates, express.js uses these template to render the html pages
- **models** : contain object model for admin and post
- **routes** : defined the endpoints (URIs) to the application and how it responds to client requests. Since the program logic is not very complicated, the app middleware was also implemented in here

Bootstrap was used as the front-end framework. Also, jQuery and Angular.js were used for DOM manipulation and data binding.

##Palindrome Detection
The most straight-forward way to detect palindrome in Javasript is : 
```javascript
function checkPalindrom(str) {
	return str == str.split('').reverse().join('');
}
```
On the index page, the browser can detect the user input and determine if it is a palindrome. 

## License

MIT
