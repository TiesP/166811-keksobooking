const express = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);

const {getOffers, getOffer} = require(`./api`);

const PORT = 3000;
const app = express();
const upload = multer({storage: multer.memoryStorage()});

app.use(express.static(`static`));
app.use(bodyParser.json());

app.get(`/api/offers`, (req, res) => {
  res.send(getOffers(req.query.skip, req.query.limit));
});

app.get(`/api/offers/:date`, function (req, res) {
  res.send(getOffer(req.params.date));
});

app.post(`/api/offers`, upload.none(), (req, res) => {
  res.send(req.body);
});


module.exports = {
  name: `server`,
  description: `Run server`,
  execute(portUser) {
    const currentPort = portUser ? portUser : PORT;

    app.listen(currentPort, () => {
      console.log(`Server running at http://localhost:${currentPort}/`);
    });
  },
  app
};
