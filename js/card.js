'use strict';

(function () {
  var map = document.querySelector('.map');
  var filterContainer = map.querySelector('.map__filters-container');
  var card = document.querySelector('#card').content.querySelector('.popup');

  var renderFeatures = function (offers, features) {
    var fragment = document.createDocumentFragment();
    var feature = features.querySelector('.popup__feature');
    feature.classList.remove('popup__feature--wifi');
    features.innerHTML = '';

    for (var i = 0; i < offers[0].offer.features.length; i++) {
      var featureElement = feature.cloneNode(true);
      var nameClass = 'popup__feature--' + offers[0].offer.features[i];
      featureElement.classList.add(nameClass);
      fragment.appendChild(featureElement);
    }
    features.appendChild(fragment);
  }

  var renderPhotos = function (offers, photos) {
    var fragment = document.createDocumentFragment();
    var photo = photos.querySelector('.popup__photo');
    photos.innerHTML = '';

    for (var i = 0; i < offers[0].offer.photos.length; i++) {
      var photoElement = photo.cloneNode(true);
      photoElement.src = offers[0].offer.photos[i];
      fragment.appendChild(photoElement);
    }
    photos.appendChild(fragment);
  }

  var renderPopup = function (offers) {
    var offerPopup = card.cloneNode(true);
    var offerAvatar = offerPopup.querySelector('.popup__avatar');
    var offerTitle = offerPopup.querySelector('.popup__title');
    var offerAddress = offerPopup.querySelector('.popup__text--address');
    var offerPrice = offerPopup.querySelector('.popup__text--price');
    var offerType = offerPopup.querySelector('.popup__type');
    var offerCapacity = offerPopup.querySelector('.popup__text--capacity');
    var offerTime = offerPopup.querySelector('.popup__text--time');
    var offerFeatures = offerPopup.querySelector('.popup__features');
    var offerDescription = offerPopup.querySelector('.popup__description');
    var offerPhotos = offerPopup.querySelector('.popup__photos');

    offerAvatar.src = offers[0].author.avatar;
    offerTitle.textContent = offers[0].offer.title;
    offerAddress.textContent = offers[0].offer.addres;
    offerPrice.textContent = offers[0].offer.price + '₽/ночь';
    offerCapacity.textContent = offers[0].offer.rooms + ' комнаты для ' + offers[0].offer.guests + ' гостей.';
    offerTime.textContent = 'Заезд после ' + offers[0].offer.checkin + ', выезд до ' + offers[0].offer.checkout + '.';
    offerDescription.textContent = offers[0].offer.description;

    switch (offers[0].offer.type) {
      case 'bungalo':
        offerType.textContent = 'Бунгало';
        break;
      case 'flat':
        offerType.textContent = 'Квартира';
        break;
      case 'house':
        offerType.textContent = 'Дом';
        break;
      case 'palace':
        offerType.textContent = 'Дворец';
        break;
    }

    renderFeatures(offers, offerFeatures);
    renderPhotos(offers, offerPhotos);
    map.insertBefore(offerPopup, filterContainer);
  };

  window.card = {
    renderPopup: renderPopup
  };
})();
