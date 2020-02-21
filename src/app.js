const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { EXPRESS_PORT } = require("./constants/constants");
const isDev = require("electron-is-dev");
const { executeCommunication } = require('@ge-fnm/csm');
const { MISSING_ACTION_OBJ_MSG } = require('./constants/errorMessages')
const path = require("path");

const app = express();

app.use(cors());
// middleware to automatically parse request bodies to JSON
app.use(bodyParser.json())

if (isDev) {
  console.log(
    "****************************************************************************"
  );
  console.log("* Running in Development mode");
  console.log(
    `* Please start react app on port ${EXPRESS_PORT} and then click View > Reload`
  );
  console.log(
    "****************************************************************************"
  );
} else {
  console.log("Production mode - serving pre-bundled react app");
  app.use(express.static(path.resolve(__dirname, "compiled-frontend")));
}

app.get("/serialInfo", (req, res) => {
  let serialport = require("serialport");

  serialport
    .list()
    .then(ports => {
      console.log(ports);
      res.json(ports);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

app.post('/remoteExecute', (req, res) => {
  // get the serialized action object string from the post request body
  const serializedActionObject = req.body.serializedAction;
  if (!serializedActionObject) {
      res.status(400).json({error: MISSING_ACTION_OBJ_MSG});
  } else {
    // pass string along to CSM, let CSM handle success/error logic
    executeCommunication(serializedActionObject)
        .then(data => res.json({data: data}))
        .catch(err => res.status(500).json({error: err}));
  }
});

module.exports = app;
