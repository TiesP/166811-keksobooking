const version = require(`./src/version`);
const help = require(`./src/help`);
const intro = require(`./src/intro`);
const author = require(`./src/author`);
const description = require(`./src/description`);
const license = require(`./src/license`);

const arg = process.argv.slice(2)[0];

if (!arg) {
  intro.execute();
} else if (arg === `--version`) {
  version.execute();
} else if (arg === `--help`) {
  help.execute();
} else if (arg === `--author`) {
  author.execute();
} else if (arg === `--description`) {
  description.execute();
} else if (arg === `--license`) {
  license.execute();
} else {
  console.error(`Неизвестная команда ${arg}. 
Чтобы прочитать правила использования приложения, наберите "--help"`);
  process.exitCode = 1;
}

