const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const path = require(`path`);
const {promisify} = require(`util`);

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;

const readfile = promisify(fs.readFile);

const sendError = (res) => {
  res.writeHead(404, `Not Found`);
  res.end(`Not Found`);
};

const readFileF = async (file, res) => {
  const data = await readfile(file);
  const extname = path.extname(file);

  res.statusCode = 200;
  res.statusMessage = `OK`;

  const types = {
    '.html': `text/html; charset=UTF-8`,
    '.ico': `image/x-icon`,
    '.png': `image/png`,
    '.css': `text/css`
  };

  if (types[extname]) {
    res.setHeader(`Content-Type`, types[extname]);
  } else {
    res.setHeader(`Content-Type`, `text/plain`);
  }

  res.setHeader(`Content-Length`, Buffer.byteLength(data));
  res.end(data);
};


const sendFile = (file, res) => {
  const absPath = path.join(__dirname, `..`, `static`, file);

  (async () => {
    try {
      await readFileF(absPath, res);
    } catch (e) {
      sendError(res);
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {'Content-Type': `text/plain`});
    res.end(e.message);
  });
};

module.exports = {
  name: `server`,
  description: `Run server`,
  execute(portUser) {
    const server = http.createServer((req, res) => {
      const pathname = url.parse(req.url).pathname;
      if (req.method !== `GET`) {
        sendError(res);
      }

      if (pathname === `/`) {
        sendFile(`/index.html`, res);
      } else {
        sendFile(pathname, res);
      }
    });

    const currentPort = portUser ? portUser : PORT;
    server.listen(currentPort, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${currentPort}/`);
    });
  }
};
