const assert = require(`assert`);
const {generateEntity} = require(`../src/data`);

describe(`module data`, function () {
  it(`should have a generateEntity Method`, function () {
    assert.equal(typeof generateEntity, `function`);
  });
  const data = generateEntity();
  const titles = [`Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`,
    `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`,
    `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`];
  const types = [`flat`, `palace`, `house`, `bungalo`];
  const hours = [`12:00`, `13:00`, `14:00`];

  it(`data is obj & should have some keys`, function () {
    assert.equal(typeof data, `object`);
    assert.equal(typeof data.author.avatar, `string`);
    assert.equal(typeof data.offer.title, `string`);
    assert(titles.indexOf(data.offer.title) >= 0);
    assert.equal(typeof data.offer.address, `string`);
    assert.equal(typeof data.offer.price, `number`, `price`);
    assert(data.offer.price >= 1000 && data.offer.price <= 1000000);
    assert.equal(typeof data.offer.type, `string`, `type`);
    assert(types.indexOf(data.offer.type) >= 0);
    assert.equal(typeof data.offer.rooms, `number`, `rooms`);
    assert(data.offer.rooms >= 1 && data.offer.rooms <= 5);
    assert.equal(typeof data.offer.guests, `number`, `guests`);
    assert.equal(typeof data.offer.checkin, `string`, `checkin`);
    assert(hours.indexOf(data.offer.checkin) >= 0);
    assert.equal(typeof data.offer.checkout, `string`, `checkout`);
    assert(hours.indexOf(data.offer.checkout) >= 0);
    assert(Array.isArray(data.offer.features), `features`);
    assert.equal(typeof data.offer.description, `string`, `description`);
    assert.equal(data.offer.description, ``, `description`);
    assert(Array.isArray(data.offer.photos), `photos`);
    assert.equal(typeof data.location.x, `number`, `location.x`);
    assert.equal(typeof data.location.y, `number`, `location.y`);
    assert(data.location.x >= 300 && data.location.x <= 900);
    assert(data.location.y >= 150 && data.location.y <= 500);
    assert.equal(data.offer.address, `${data.location.x},${data.location.y}`);
  });
});
