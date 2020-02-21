const app = require('./app');
const { PORT } = require('./constants/constants');

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);