const {generateEntity} = require(`./data`);
const {writeOffers} = require(`./db`);

const makeData = async () => {
  const listObj = [];
  const numberOfObjects = 10;
  for (let i = 0; i < numberOfObjects; i++) {
    listObj.push(generateEntity(i));
  }
  return await writeOffers(listObj);
};

module.exports = {
  makeData
};
