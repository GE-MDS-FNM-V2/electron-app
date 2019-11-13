const express = require("express");
const cors = require("cors");
const { PORT, EXPRESS_PORT } = require("./constants");
const isDev = require("electron-is-dev");
const path = require("path");

const app = express();

app.use(cors());

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

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
