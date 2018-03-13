const colors = require(`colors`);
const version = require(`./src/version`);
const help = require(`./src/help`);
const intro = require(`./src/intro`);
const author = require(`./src/author`);
const server = require(`./src/server/server`);
const {makeData} = require(`./src/makeData`);

const args = process.argv.slice(2);
const arg = args[0];
const portUser = args[1];
const command = arg ? arg : null;

switch (command) {
  case null:
    intro.execute();
    break;
  case `--help`:
    help.execute();
    break;
  case `--author`:
    author.execute();
    break;
  case `--version`:
    version.execute();
    break;
  case `--server`:
    server.execute(portUser);
    break;
  case `--fill`:
    process.env.DB_MODE = `test`;
    makeData();
    break;
  default:
    console.error(colors.red(`Неизвестная команда ${arg}. 
Чтобы прочитать правила использования приложения, наберите "--help"`));
    process.exitCode = 1;
}

