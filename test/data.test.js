const assert = require(`assert`);
const {generateEntity, titles, types, hours} = require(`../src/data`);

describe(`Test generateEntity()`, function () {
  const data = generateEntity();

  describe(`функция создана generateEntity()`, function () {
    it(`should have a generateEntity Method`, function () {
      assert.equal(typeof generateEntity, `function`);
    });
  });

  describe(`проверка полной структуры объекта и типов полей`, function () {
    it(`data is obj & should have some keys`, function () {
      assert.equal(typeof data, `object`);
      assert.equal(typeof data.author.name, `string`, `author.name`);
      assert.equal(typeof data.author.avatar, `string`, `author.avatar`);
      assert.equal(typeof data.offer.title, `string`, `title`);
      assert.equal(typeof data.offer.description, `string`, `description`);
      assert.equal(typeof data.offer.address, `string`, ``);
      assert.equal(typeof data.offer.price, `number`, `price`);
      assert.equal(typeof data.offer.type, `string`, `type`);
      assert.equal(typeof data.offer.rooms, `number`, `rooms`);
      assert.equal(typeof data.offer.guests, `number`, `guests`);
      assert.equal(typeof data.offer.checkin, `string`, `checkin`);
      assert.equal(typeof data.offer.checkout, `string`, `checkout `);
      assert(Array.isArray(data.offer.features), `features`);
      assert(Array.isArray(data.offer.photos), `photos`);
      assert.equal(typeof data.location.x, `number`, `location.x`);
      assert.equal(typeof data.location.y, `number`, `location.y`);
      assert.equal(typeof data.date, `string`, `date`);
    });
  });

  describe(`проверка данных`, function () {
    it(`данные в указанных пределах`, function () {
      assert(titles.indexOf(data.offer.title) >= 0, `title из списка`);
      assert(data.offer.title.length >= 30 && data.offer.title.length <= 140, `title длина`);
      assert(data.offer.price >= 1 && data.offer.price <= 100000, `price пределы`);
      assert(data.offer.rooms >= 0 && data.offer.rooms <= 1000, `rooms пределы`);
      assert(types.indexOf(data.offer.type) >= 0, `type из списка`);
      assert(hours.indexOf(data.offer.checkin) >= 0, `checkin из списка`);
      assert(hours.indexOf(data.offer.checkout) >= 0, `checkout из списка`);
      assert(data.location.x >= 300 && data.location.x <= 900, `location.x пределы`);
      assert(data.location.y >= 150 && data.location.y <= 500, `location.y пределы`);
    });
  });
});

