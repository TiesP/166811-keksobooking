const commands = [
  {name: `author`, descr: `печатает автора программы`},
  {name: `description`, descr: `печатает описание программы`},
  {name: `help`, descr: `печатает этот текст`},
  {name: `license`, descr: `печатает вид лицензии`},
  {name: `version`, descr: `печатает версию приложения`},
];

const addSpaces = (repeatCount) => ` `.repeat(repeatCount);

const displayCommand = (command) => {
  console.log(`--${command.name.grey}${addSpaces(12 - command.name.length)}— ${command.descr.green};`);
};

const displayListCommands = () => {
  commands.map((command) => {
    displayCommand(command);
  });
};

module.exports = {
  name: `help`,
  description: `Shows program help`,
  execute() {
    console.log(`Доступные команды:`);
    displayListCommands();
  }
};
