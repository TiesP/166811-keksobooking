const fs = require(`fs`);
const {generateEntity, checkFile} = require(`./data`);

const createDataFile = (numberOfObjects, fileName) => {
  const listObj = [];
  for (let i = 0; i < numberOfObjects; i++) {
    listObj.push(generateEntity());
  }
  fs.writeFileSync(fileName, JSON.stringify(listObj));
};

const makeData = () => {
  let commandNumber = 0;
  let numberOfObjects = 0;
  const stdin = process.openStdin();
  let fileName = `data.json`;

  stdin.addListener(`data`, function (input) {
    commandNumber++;
    const inputString = input.toString().trim();

    switch (commandNumber) {
      case 1:
        numberOfObjects = parseInt(inputString, 10);
        if (isNaN(numberOfObjects) || (numberOfObjects === 0)) {
          console.log(`Введено неправильное значение! Надо вводить число больше нуля.`);
          process.exit();
        }
        console.log(`Будет создано ${numberOfObjects} объектов.
Введите имя файла относительно текущей директории. 
Если имя не введено, будет использовано "data.json" :`);
        break;
      case 2:
        if (inputString) {
          fileName = inputString;
        }
        if (checkFile(fileName)) {
          console.log(`Файл ${fileName} уже существует.
Перезаписать этот файл? (y/n)" :`);
        } else {
          createDataFile(numberOfObjects, fileName);
          process.exit();
        }
        break;
      case 3:
        if (inputString === `y`) {
          createDataFile(numberOfObjects, fileName);
        }
        process.exit();
        break;
    }
  });

  console.log(`Привет пользователь! 
Эта программа будет запускать сервер «Кексобукинг».
Для начала надо создать тестовые объекты. 
Введите необходимое кол-во объектов :`);

};

const arg = process.argv.slice(2)[0];
const command = arg ? arg : null;

switch (command) {
  case null:
    makeData();
    break;
  default:
    console.error(`Неизвестная команда ${arg}. `);
    process.exitCode = 1;
}
