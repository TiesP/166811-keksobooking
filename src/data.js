const fs = require(`fs`);

const urlUser = `https://robohash.org/`;
const userLogins = [`a`, `b`, `c`];
const arrPhoto = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const titles = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];
const types = [`flat`, `palace`, `house`, `bungalo`];
const hours = [`12:00`, `13:00`, `14:00`];
const features = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomUser = () => urlUser + userLogins[getRandomInt(0, 2)];

const getRandomFeatures = (maxCountFeatures) => {
  const curFeatures = [];
  for (let i = 1; i <= maxCountFeatures; i++) {
    const newFeature = features[getRandomInt(0, 5)];
    if (curFeatures.indexOf(newFeature) === -1) {
      curFeatures.push(newFeature);
    }
  }
  return curFeatures;
};

const getDate = (counter) => {
  switch (counter) {
    case 0:
      return +new Date(2017, 0, 1);// 1483218000000 для тестов
    case 1:
      return +new Date(2018, 0, 1);// 1514754000000 для тестов
    default:
      return +new Date();// произвольная
  }
};

const generateEntity = (counter) => {
  const randomX = getRandomInt(300, 900);
  const randomY = getRandomInt(150, 500);

  return {
    "author":
      {
        "avatar": `${getRandomUser()}`
      },
    "offer": {
      "title": titles[getRandomInt(0, 7)],
      "address": `${randomX},${randomY}`,
      "price": getRandomInt(1000, 1000000),
      "type": types[getRandomInt(0, 3)],
      "rooms": getRandomInt(1, 5),
      "guests": getRandomInt(1, 5),
      "checkin": hours[getRandomInt(0, 2)],
      "checkout": hours[getRandomInt(0, 2)],
      "features": getRandomFeatures(getRandomInt(0, 6)),
      "description": ``,
      "photos": arrPhoto
    },
    "location": {
      x: randomX,
      y: randomY
    },
    "date": String(getDate(counter))
  };
};

const checkFile = (fileNameFull) => {
  if (fileNameFull) {
    return fs.existsSync(fileNameFull);
  }
  return false;
};


module.exports = {
  generateEntity,
  checkFile
};

