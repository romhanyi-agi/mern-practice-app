# Backend setup

## 1. npm dependencies

### 1.1. Packages we use

- __express__: a type of HTTP server, a minimalist web application framework on the top of Node, used for routing, request handling, and so on.

- __body-parser__: Node.js body parsing middleware.

Database:
- __mongoose__: MongoDB object modeling library. It includes built-in type casting, validation, query building, business logic hooks, and more, out of the box. (_mongodb_ is a basic Node.js driver to connect and interact with the MongoDB server, we could use this too, instead of Mongoose!)

Compatibility and automation:
- __nodemon__: looks for changes in the defined files and restarts on the server automatically.

Modularization
- __dotenv__: store environment variables in a separate `.env` file instead of hard coding them. Dotenv package can convert variables of this file into environment variables. This is very convenient when moving the code from one env to another, e.g., form development to production.

Coding conventions:
- __eslint__: ensuring that we follow conventions and standards, also great for checking for suspicious codes/bugs. On the frontend part, we install both the Airbnb-base package and the complete Airbnb configuration, which includes the React plugin as well.

### 1.2. Installing the packages
Let's create a root folder for the app - in my case - it is called `mern-practice-connexion` (you can, of course, come up with something more simple). We will separate the frontend and the backend part, into two separate applications. 
So first, we create a `backend` folder, open a terminal (or another cl tool), step into this directory, and initialize the project by running the `npm init` command.
```
$ npm init
```
During the initialization, you'll need to set some project parameters, e.g., name, version, description, repository, keywords. Don't worry, you can change those anytime later in the newly created package.json file.
 
Second, we install the needed packages. 
*NOTE*: some we only use for development, hence the --save-dev connector.

```
$ npm install express@4 mongoose body-parser nodemon@1 dotenv@6
$ npm install --save-dev eslint@5 eslint-plugin-import@2
$ npm install --save-dev eslint-config-airbnb-base@13
``` 
Running the install command creates the `node_modules` folder and places the installed packages inside.

## 2. Configurations

### 2.1 Automation

The initialization of the project with the `npm init` command created the package.json file in the backend folder. This file contains details about your app (such as the name, version, description that you entered during the init, the installed dependencies, and some more.

We can define scripts here as well, so we don't have to run them manually.
Let's modify the scripts object to make use of eslint and nodemon.

``` JSON
 "scripts": {
 "start": "nodemon -w server server/server.js",
 "lint": "eslint .",
 "test": "echo \"Error: no test specified\" && exit 1"
 },
```

### 2.2. Eslint configuration

Create `.eslintrc` file in the backend folder.
We only add a basic configuration that extends the Airbnb base configuration and allows debug messages to be shown in the client.

``` JSON
{
 "extends" : "airbnb-base",
 "env" : {
 "node" : "true"
 },
 "rules" : {
 "no-console" : "off"
 }
}
``` 

You can either run ESLint on the entire backend directory `$ npx eslint` 
__Or__, install a plugin in the editor (e.g., Visual Studio) that shows lint errors in the editor itself.

### 2.3. Environment variables

Create `.env` file in the backend folder

The dotenv package, we installed, looks for this .env file and converts variables stored in it into environment variables.

*NOTE*: It is recommended not to upload the .env file to any repository, see section 2.3.

```
## MongoDB
# Atlas - replace <user>: user, <password>: password, <hostname>: hostname
# DB_URL=mongodb+srv://<user>:<password>@<hostname>.mongodb.net/test?retryWrites=true&w=majority

## Server Port
API_SERVER_PORT=3000

## Enable CORS (default: true)
# ENABLE_CORS=false
```

### 2.3. .gitignore file

Create a `.gitignore` file in your project root, if you haven't already, and add the files and folders, you don't want to upload to your GitHub.

```
backend/node_modules/
.env
```

## 3. Starting the app

Before starting the backend server, we need to create a file in the backend folder that serves as the entry point (`server.js`).

*Note*: The filename has to be the same as defined in the package.json file (you've specified it during the npm init).

``` JSON
...
"main": "server.js"
...
```

The server.js file starts up the express server, and using *dotenv*; it ensures to restart it whenever you make some changes to the code.

In this file, we declare the constant `app` variable. It uses body-parser and starts in an asynchronous function awaiting mongoose to connect the database.
It is good practice to place the MongoDB connection (and getter function) to the database into a separate file, in my case it is `mongoDB.js`.
