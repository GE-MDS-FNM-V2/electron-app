# GE FNM v2 Backend
This is an electron app that hosts our react front end and runs an express
server internally.

## Running/building
### Bulding for production
The following should generate a folder at the roof of this repo with the name
`ge-backend-*` depending on what system you are running on. 
It will automatically build for the system you are running on (ex: if you are 
running on mac, it will generate a .app file)
```
npm install -g yarn
yarn
yarn build
```

## Overview of development mode vs production mode
### Production
During the production build, we will run `node.js scripts/cloneFrontend` that 
will clone the git repo of our frontend application, compile the app with 
`yarn build` and then copying over the `build` folder to the `compiled-frontend`
folder within this repository. This static folder will then be hosted by our
express app running in the background.

### Development
In development we simply tell electron to load our frontend from 
`http:localhost:3000`. This allows the developer to have their create-react-app
repo running in the background with full hot-module-reloading and other expected
developer tools

# Common ____

## Errors

### NODE_MODULE_VERSION 64. This version of Node.js requires NODE_MODULE_VERSION 73. Please try re-compiling or re-installing
Im not sure why this happens, but if you remove the "node_modules" folder, 
remove the "yarn.lock" file, run "yarn", and then run 
"./node_modules/.bin/electron-rebuild" it should fix the issue.
I found this solution here: 
https://github.com/serialport/node-serialport/issues/1910