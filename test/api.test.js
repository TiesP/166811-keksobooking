const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server/server`);
const {deleteOffer} = require(`../src/db`);
const {
  isExist,
  checkType,
  checkMin,
  checkMax,
  checkEnum,
  noDuplicates,
  isTime
} = require(`../src/server/validator`);

describe(`GET /api/offers`, () => {
  process.env.DB_MODE = `test`;

  it(`respond with json GET api/offers`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offers = response.body;
          assert.equal(offers.length, 10, `count must 10 test objects = ${offers.length}`);
          assert.equal(Object.keys(offers[0]).length, 5, `should be 5 keys = ${Object.keys(offers[0]).length}`);
          assert(offers[1].date, `1514754000000`);
        });
  });

  it(`respond with json GET api/offers + skip`, () => {
    return request(app)
        .get(`/api/offers?skip=8`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offers = response.body;
          assert.equal(offers.length, 2);
        });
  });

  it(`respond with json GET api/offers + limit`, () => {
    return request(app)
        .get(`/api/offers?limit=5`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offers = response.body;
          assert.equal(offers.length, 5);
        });
  });

  it(`respond with json GET api/offers + limit, skip`, () => {
    return request(app)
        .get(`/api/offers?limit=1&skip=8`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offers = response.body;
          assert.equal(offers.length, 1);
        });
  });

  it(`respond with json GET api/offers/:date`, () => {
    return request(app)
        .get(`/api/offers/1514754000000`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offer = response.body;
          assert.equal(Object.keys(offer).length, 5, `should be 5 keys = ${Object.keys(offer).length}`);
          assert(offer.date, `1514754000000`);
        });
  });

  it(`unknown adress should 404`, () => {
    return request(app)
        .get(`/api/offers123`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });

  it(`unknown adress should 404`, () => {
    return request(app)
        .get(`/api/offers/9999999000000`)
        .set(`Accept`, `application/json`)
        .expect(404);
  });
});


describe(`POST /api/offers`, () => {
  process.env.DB_MODE = `test`;

  it(`respond with json POST api/offers`, () => {
    const offer = {
      'title': `Большая уютная квартира с удобной мебелью`,
      'type': `flat`,
      'price': 100000,
      'address': `300,150`,
      'checkin': `12:00`,
      'checkout': `13:00`,
      'rooms': 3
    };

    return request(app)
        .post(`/api/offers`)
        .send(offer)
        .expect(200)
        .then((response) => {
          const offerResponse = response.body;
          deleteOffer(offerResponse._id);
          assert.equal(offerResponse.title, offer.title, `offer save to DB`);
        });
  });

  it(`respond with json POST errors`, () => {
    const offer = {
      'title': `Большая уютная квартира с удобной мебелью`,
      'type': `flat`,
      'price': 100000,
      'address': `300,150`,
      'checkin': `99:00`, // ошибка во времени для теста
      'checkout': `13:00`,
      'rooms': 3
    };

    return request(app)
        .post(`/api/offers`)
        .send(offer)
        .expect(400)
        .then((response) => {
          const errors = response.body;
          assert.equal(errors.length, 1);
        });
  });

});

describe(`validate`, () => {

  it(`is exist`, () => {
    assert(isExist(`name`, {'name': ``}, true), `is exist`);
    assert(!isExist(`name`, {'price': ``}, true), `is not exist`);
    assert(isExist(`name`, {'price': ``}, false), `is not required`);
  });

  it(`check type`, () => {
    assert(checkType(``, `string`), `is string`);
    assert(!checkType(1, `string`), `is not string`);
    assert(checkType(1, `number`), `is number`);
    assert(!checkType(`a`, `number`), `is not number`);
    assert(checkType([], `array`), `is array`);
    assert(!checkType(1, `array`), `1 is not array`);
    assert(!checkType(`a`, `array`), `string is not array`);
  });

  it(`check min/max`, () => {
    assert(checkMin(2, 2, `number`), `value >= min`);
    assert(!checkMin(1, 2, `number`), `value < min`);
    assert(checkMax(2, 2, `number`), `value <= max`);
    assert(!checkMax(3, 2, `number`), `value > max`);
    assert(checkMin(`aa`, 2, `string`), `value length >= min`);
    assert(!checkMin(`a`, 2, `string`), `value length < min`);
    assert(checkMax(`aa`, 2, `string`), `value length <= max`);
    assert(!checkMax(`aaa`, 2, `string`), `value length > max`);
  });

  it(`check enum`, () => {
    assert(checkEnum(`one`, [`one`, `two`, `three`]), `one of the possible values`);
    assert(!checkEnum(`five`, [`one`, `two`, `three`]), `not one of the possible values`);
  });

  it(`no duplicates`, () => {
    assert(noDuplicates([`one`, `two`, `three`], true), `no duplicates`);
    assert(!noDuplicates([`one`, `two`, `one`], true), `there are duplicates`);
  });

  it(`is time HH:mm`, () => {
    assert(isTime(`22:33`), `is time`);
    assert(!isTime(`33:22`), `is not time`);
    assert(checkType(`00:00`, `time`), `is time`);
    assert(!checkType(`44:55`, `time`), `is not time`);
  });

});
