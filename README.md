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
git clone https://github.com/GE-MDS-FNM-V2/backend.git ~/Desktop/ge-backend
cd ~/Desktop/ge-backend
npm install -g yarn
yarn
yarn build
```

### Building for QA
Pushing any branch to `origin` will fire off building a downloadable version of the
application for Linux, Windows, and Mac. These are created using [GitHub Actions](https://github.com/GE-MDS-FNM-V2/electron-app/actions). The packages can be found in the [releases](https://github.com/GE-MDS-FNM-V2/electron-app/releases) tab. The commit hash acts as the unique identifier for builds.

By default, the desktop application's user interface is made with the latest on `master` from the [react-ui](https://github.com/GE-MDS-FNM-V2/react-ui) repo. If you need to pull the latest from a different branch, 
you will need to modify the `FRONTEND_DEPLOYMENT_BRANCH` environment variable in the `.env` file to match the branch you want to pull from.

## Loading a Radio Configuration

In order to connect to radios with the FNM you must load in the login information using a configuration file. You will 
be prompted for this file when you open the application. The configuration must be a `.json` file. The radio must also 
be on your local network, unless you have engineered a workaround solution to expose the radio otherwise. 

Below are the contents of a sample configuration file that can be used to connect to a radio with an IP address of `98.10.43.107`,
over `HTTP`, using `JSONRPC`, and create a session for radio management. the `"communicationMethod"` and `"protocol"` key/value pairs
must have values that are present in the `CommunicationMethodV1` and `ProtocolV1` enum objects, as defined in the [GE Action Object module](https://github.com/GE-MDS-FNM-V2/action-object).

```json
{
  "devices": [
    {
	"communicationMethod": "HTTP",
      "uri": "98.10.43.107",
      "protocol": "JSONRPC",
      "username": "admin",
      "password": "AdminPassword",
      "id": "1"
    }
  ]
}
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