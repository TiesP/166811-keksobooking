const readline = require(`readline`);
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
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `>>>`
  });

  let numberOfObjects = 0;
  let fileName = `data.json`;

  const checkAnswer = (answer) => {
    if (answer === `y`) {
      createDataFile(numberOfObjects, fileName);
    }
    process.exit();
  };

  const getFileName = (answer) => {
    if (answer) {
      fileName = answer;
    }
    if (checkFile(fileName)) {
      rl.question(`Файл ${fileName} уже существует.
Перезаписать этот файл? (y/n)" :`, checkAnswer);
    } else {
      createDataFile(numberOfObjects, fileName);
      process.exit();
    }
  };

  const getNumber = (answer) => {
    numberOfObjects = parseInt(answer, 10);
    console.log(answer);
    if (isNaN(numberOfObjects) || (numberOfObjects === 0)) {
      console.log(`Введено неправильное значение! Надо вводить число больше нуля.`);
      process.exit();
    }
    rl.question(`Будет создано ${numberOfObjects} объектов.
Введите имя файла относительно текущей директории.
Если имя не введено, будет использовано "${fileName}" :`, getFileName);
  };

  rl.question(`Для начала надо создать тестовые объекты. 
Введите необходимое кол-во объектов :`, getNumber);

};

module.exports = {
  makeData
};
