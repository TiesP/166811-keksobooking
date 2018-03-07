const data = require(`../data.json`);

const getOffers = (skip = 0, limit = 20) => {
  const skipInt = parseInt(skip, 10);
  const limitInt = parseInt(limit, 10);

  let offers = data;

  if (skipInt > 0) {
    offers = offers.slice(skipInt);
  }
  if (limitInt > 0) {
    offers = offers.slice(0, limitInt);
  }

  return offers;
};

const getOffer = (date) => data.find((el) => el.date === date);

module.exports = {
  getOffers,
  getOffer
};
