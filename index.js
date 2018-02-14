const version = require(`./src/version`);
const help = require(`./src/help`);
const intro = require(`./src/intro`);
const author = require(`./src/author`);
const description = require(`./src/description`);
const license = require(`./src/license`);

const arg = process.argv.slice(2)[0];

switch (arg) {
  case undefined:
    intro.execute();
    break;
  case `--version`:
    version.execute();
    break;
  case `--help`:
    help.execute();
    break;
  case `--author`:
    author.execute();
    break;
  case `--description`:
    description.execute();
    break;
  case `--license`:
    license.execute();
    break;
  default:
    console.error(`Неизвестная команда ${arg}. 
Чтобы прочитать правила использования приложения, наберите "--help"`);
    process.exitCode = 1;
}

