'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 65;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinList = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var offers = [];

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomOffers = function () {
  for (var i = 0; i < 8; i++) {
    var authorAvatar = 'img/avatars/user0' + (i + 1) + '.png';
    var offerType = OFFER_TYPE[getRandomNumber(0, OFFER_TYPE.length)];
    var offerCoordinateX = getRandomNumber(PIN_WIDTH, 1200 - PIN_WIDTH) + 'px';
    var offerCoordinateY = getRandomNumber(130, 630) + 'px';
    var offerCoordinates = [offerCoordinateX, offerCoordinateY];

    var offer = {
      author: authorAvatar,
      offer: offerType,
      location: offerCoordinates
    };
    offers.push(offer);
  }
  return offers;
};

var renderOffers = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < offers.length; i++) {
    var offerElement = pin.cloneNode(true);
    offerElement.style.left = offers[i].location[0];
    offerElement.style.top = offers[i].location[1];
    offerElement.children[0].src = offers[i].author;
    offerElement.children[0].alt = 'Заголовок объявления';

    fragment.appendChild(offerElement);
  }
  pinList.appendChild(fragment);
};

getRandomOffers();
renderOffers();
