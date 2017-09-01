# my-photo-app
Has webpack dev server set for auto reload with eslint and sass loader

## Table of Contents

- [How To Install And Run The App](#how-to-install-and-run-the-app)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [Project Highlights](#Project Highlights)

## How To Install And Run The App

* clone/download the project;
* In the project folder do `npm install`.
* Upon successful `install`, do `npm start`, it should launch the browser with app at `http://localhost:3000/`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode using webpack dev serve.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run watch`

Builds the app and watches for changes using webpack.<br>

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles the JS/CSS and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Project Highlights

* WebPack based - Loaders for ES6, SCSS, JSON and esLinted
* Three Components 
  * utility.js ( For building API URLs and Requesting Data )
  * flickr.js ( Build Flickr URL and Parse Data )
  * app.js ( Main JS file for Image Gallery and LightBox View) 
* Input - Flickr getPublicPhoto API with 15 Images per page with search tag 'golden retriever' 
        - In case of failure, please update the API Key
        - Code currently has a backup photos.JSON to show the actual data
      

