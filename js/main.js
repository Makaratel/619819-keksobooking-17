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

var inputTitle = formNotice.querySelector('#title');
var inputPrice = formNotice.querySelector('#price');
var inputType = formNotice.querySelector('#type');
var inputTimeIn = formNotice.querySelector('#timein');
var inputTimeOut = formNotice.querySelector('#timeout');

var getChangeStateForms = function (tagsArray, state) {
  for (var i = 0; i < tagsArray.length; i++) {
    tagsArray[i].disabled = state;
  }
};

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

var getPinCoordinates = function () {
  var mapCoordinates = map.getBoundingClientRect();
  var pinCoordinates = pinMain.getBoundingClientRect();
  var pinLeftOffset = pinCoordinates.left - mapCoordinates.left + PIN_WIDTH / 2;
  var pinTopOffset = pinCoordinates.top - mapCoordinates.top + PIN_HEIGHT;
  var pinOffsets = [pinLeftOffset, pinTopOffset];
  inputAddress.value = pinOffsets;
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

pinMain.addEventListener('mouseup', function () {
  getPinCoordinates();
});

inputAddress.value = '570, 375';
inputAddress.disabled = true;

inputTitle.addEventListener('input', function (evt) {
  var target = evt.target;
  inputTitle.required = true;

  if (target.value.length < 30) {
    target.setCustomValidity('Заголовок объявления не должен быть короче 30 символов');
  } else if (target.value.length > 100) {
    target.setCustomValidity('Заголовок объявления не должен быть длиннее 100 символов');
  } else {
    target.setCustomValidity('');
  }
});

inputPrice.addEventListener('input', function (evt) {
  var target = evt.target;
  target.required = true;
  target.type = 'number';

  if (inputType.value == 'bungalo' && target.value < 0) {
    target.setCustomValidity('Цена за ночь не может быть ниже 0');
  } else if (inputType.value == 'flat' && target.value < 1000) {
    target.setCustomValidity('Цена за ночь не может быть ниже 1 000');
  } else if (inputType.value == 'house' && target.value < 5000) {
    target.setCustomValidity('Цена за ночь не может быть ниже 5 000');
  } else if (inputType.value == 'palace' && target.value < 10000) {
    target.setCustomValidity('Цена за ночь не может быть ниже 10 000');
  } else if (target.value > 1000000) {
    target.setCustomValidity('Цена за ночь не может быть более 1 000 000');
  } else {
    target.setCustomValidity('');
  }
});

inputType.addEventListener('input', function (evt) {
  var target = evt.target;

  if (target.value == 'bungalo') {
    inputPrice.placeholder = '0';
  } else if (target.value == 'flat') {
    inputPrice.placeholder = '1 000';
  } else if (target.value == 'house') {
    inputPrice.placeholder = '5 000';
  } else {
    inputPrice.placeholder = '10 000';
  }
});

inputTimeIn.addEventListener('input', function () {
  inputTimeOut.value = inputTimeIn.value;
});

inputTimeOut.addEventListener('input', function () {
  inputTimeIn.value = inputTimeOut.value;
});
