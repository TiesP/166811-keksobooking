module.exports = {

  generateEntity() {
    return {
      "author":
        {
          "avatar": `https://robohash.org/a`
        },
      "offer": {
        "title": `Большая уютная квартира`,
        "address": `300,150`,
        "price": 1000,
        "type": `flat`,
        "rooms": 1,
        "guests": 2,
        "checkin": `12:00`,
        "checkout": `13:00`,
        "features": [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
        "description": ``,
        "photos": [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`]
      },
      "location": {
        x: 300,
        y: 150
      }
    };
  }
};
