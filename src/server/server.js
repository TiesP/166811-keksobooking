const express = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const {findOffers, findOffer, writeOffer, writeAvatar, findAvatar} = require(`../db`);
const ValidationError = require(`./validation-error`);
const NotFoundError = require(`./not-found-error`);
const {validateSchema} = require(`./validator`);
const createStreamFromBuffer = require(`../util/buffer-to-stream`);
const async = require(`../util/async`);
const logger = require(`../winston`);

const PORT = process.env.SERVER_PORT;
const app = express();
const upload = multer({storage: multer.memoryStorage()});

app.use(express.static(`static`));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

app.get(`/api/offers`, async(async (req, res) => {
  const skipInt = parseInt(req.query.skip, 10);
  const limitInt = parseInt(req.query.limit, 10);
  const result = await findOffers(skipInt, limitInt);
  res.send(result);
}));

app.get(`/api/offers/:date`, async(async (req, res) => {
  const result = await findOffer(req.params.date);
  if (!result) {
    throw new NotFoundError(`Offer with date "${req.params.date}" not found`);
  }
  res.send(result);
}));

app.get(`/api/offers/:date/avatar`, async(async (req, res) => {
  const result = await findOffer(req.params.date);
  if (!result) {
    throw new NotFoundError(`Offer with date "${req.params.date}" not found`);
  }
  if (!result.avatar) {
    throw new NotFoundError(`Offer with date "${req.params.date}" didn't upload avatar`);
  }
  const avatar = result.avatar;

  const resultAvatar = await findAvatar(avatar.filename);
  const {info, stream} = resultAvatar;
  if (!info) {
    throw new NotFoundError(`File was not found`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
}));

app.post(`/api/offers`, upload.single(`avatar`), async(async (req, res) => {
  const data = req.body;
  const avatar = req.file;
  if (avatar) {
    data.avatar = avatar;
  }

  if (avatar) {
    const avatarInfo = {
      path: `/api/offers/${data.date}/avatar`,
      mimetype: avatar.mimetype
    };
    data.avatar = await writeAvatar(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
  }

  const errors = validateSchema(data);
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  const result = await writeOffer(data);
  res.send(result.ops[0]);

}));

app.use((exception, req, res, next) => {
  let data = exception;
  if (exception instanceof NotFoundError) {
    res.status(404).send(data);
  } else {
    if (exception instanceof ValidationError) {
      data = exception.errors;
    }
    res.status(400).send(data);
  }
  next();
});


module.exports = {
  name: `server`,
  description: `Run server`,
  execute(portUser) {
    const currentPort = portUser ? portUser : PORT;

    app.listen(currentPort, () => {
      logger.info(`Server running at http://${process.env.SERVER_HOST}:${currentPort}/`);
    });
  },
  app
};
