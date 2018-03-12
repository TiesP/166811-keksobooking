const {generateEntity} = require(`./data`);
const {writeOffers} = require(`./db`);

const makeData = () => {
  const listObj = [];
  const numberOfObjects = 10;
  for (let i = 0; i < numberOfObjects; i++) {
    listObj.push(generateEntity(i));
  }

  writeOffers(listObj);
};

module.exports = {
  makeData
};
