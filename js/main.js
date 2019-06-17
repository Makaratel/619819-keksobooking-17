'use strict';

var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PIN_WIDTH = 65;
var PIN_HEIGHT = 87;

var map = document.querySelector('.map');
var pinList = map.querySelector('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var offers = [];

var formFilters = document.querySelector('.map__filters');
var formNotice = document.querySelector('.ad-form');
var inputSelects = formFilters.querySelectorAll('select');
var filtersFieldsets = formFilters.querySelectorAll('fieldset');
var noticeFieldsets = formNotice.querySelectorAll('fieldset');
var pinMain = pinList.querySelector('.map__pin--main');
var inputAddress = formNotice.querySelector('#address');

var getChangeStateForms = function (tagsArray, state) {
  for (var i = 0; i < tagsArray.length; i++) {
    tagsArray[i].disabled = state;
  }
}

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
getChangeStateForms(inputSelects, true);
getChangeStateForms(filtersFieldsets, true);
getChangeStateForms(noticeFieldsets, true);

pinMain.addEventListener('click', function () {
  getChangeStateForms(inputSelects, false);
  getChangeStateForms(filtersFieldsets, false);
  getChangeStateForms(noticeFieldsets, false);

  renderOffers();
  map.classList.remove('map--faded');
  formNotice.classList.remove('ad-form--disabled');
});

var getPinCoordinates = function () {
  var mapCoordinates = map.getBoundingClientRect();
  var pinCoordinates = pinMain.getBoundingClientRect();
  var pinLeftOffset = pinCoordinates.left - mapCoordinates.left + PIN_WIDTH / 2;
  var pinTopOffset = pinCoordinates.top - mapCoordinates.top + PIN_HEIGHT;
  var pinOffsets = [pinLeftOffset, pinTopOffset];
  inputAddress.value = pinOffsets;
};

pinMain.addEventListener('mouseup', function () {
  getPinCoordinates();
});

inputAddress.value = '570, 375';
