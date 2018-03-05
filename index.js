const colors = require(`colors`);
const version = require(`./src/version`);
const help = require(`./src/help`);
const intro = require(`./src/intro`);
const author = require(`./src/author`);
const description = require(`./src/description`);
const license = require(`./src/license`);
const server = require(`./src/server/server`);

const args = process.argv.slice(2);
const arg = args[0];
const portUser = args[1];
const command = arg ? arg : null;

switch (command) {
  case null:
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
  case `--server`:
    server.execute(portUser);
    break;
  default:
    console.error(colors.red(`Неизвестная команда ${arg}. 
Чтобы прочитать правила использования приложения, наберите "--help"`));
    process.exitCode = 1;
}

