const express = require("express");
const { PORT, EXPRESS_PORT } = require("./constants");
const inProd = require("./utils/inProd");

const app = express();

if (inProd()) {
  console.log("Production mode - serving pre-bundled react app");
  app.use(express.static(__dirname + "/compiled-frontend"));
} else {
  console.log(
    "****************************************************************************"
  );
  console.log(
    `* Please start react app on port ${EXPRESS_PORT} and then click View > Reload`
  );
  console.log(
    "****************************************************************************"
  );
}

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
