const request = require(`supertest`);
const assert = require(`assert`);
const {app} = require(`../src/server`);

describe(`GET /api/offers`, () => {
  it(`respond with json GET api/offers`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((response) => {
          const offers = response.body;
          assert.equal(offers.length, 10);
          assert.equal(Object.keys(offers[0]).length, 4);
          assert(offers[1].date, `1514754000000`);
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
          assert.equal(Object.keys(offer).length, 4);
          assert(offer.date, `1514754000000`);
        });
  });

  it(`unknown adress should 404`, () => {
    return request(app)
        .get(`/api/offers123`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /html/);

  });
});

describe(`POST /api/offers`, () => {
  it(`respond with json POST api/offers`, () => {
    const offer = {
      'title': `Большая уютная квартира`,
      'address': `300,150`,
      'price': 1000000,
      'type': `flat`,
      'rooms': 3,
      'guests': 5,
      'checkin': `12:00`,
      'checkout': `13:00`,
      'features': [`wifi`, `washer`],
      'description': `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`
    };
    return request(app)
        .post(`/api/offers`)
        .send(offer)
        .expect(200, offer);
  });
});

