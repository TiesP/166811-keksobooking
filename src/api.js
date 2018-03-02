const data = require(`../data.json`);

const getOffers = () => data;

const getOffer = (date) => data.find((el) => el.date === date);

module.exports = {
  getOffers,
  getOffer
};
