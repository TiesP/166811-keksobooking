const express = require('express');

const PORT = 3000;
const app = express();

app.use(express.static('static'));

module.exports = {
  name: `server`,
  description: `Run server`,
  execute(portUser) {
    const currentPort = portUser ? portUser : PORT;

    app.listen(currentPort, () => {
      console.log(`Server running at http://localhost:${currentPort}/`);
    })
  }
};
