const express = require("express");
const cors = require('cors')
const { PORT, EXPRESS_PORT } = require("./constants");
const inProd = require("./utils/inProd");

const app = express();

app.use(cors())

if (inProd()) {
  console.log("Production mode - serving pre-bundled react app");
  app.use(express.static(__dirname + "/compiled-frontend"));
} else {
  console.log(
    "****************************************************************************"
  );
  console.log("* Running in Development mode")
  console.log(
    `* Please start react app on port ${EXPRESS_PORT} and then click View > Reload`
  );
  console.log(
    "****************************************************************************"
  );
}

app.get("/serialInfo", (req, res) => {
  let serialport = require("serialport");  

  serialport.list().then((ports) => {
    res.json(ports)
  }).catch((err) => {
    res.status(500).json(err)
  })
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
