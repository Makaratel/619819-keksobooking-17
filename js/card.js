'use strict';

(function () {
  var map = document.querySelector('.map');
  var filterContainer = map.querySelector('.map__filters-container');
  var card = document.querySelector('#card').content.querySelector('.popup');

  var closePopup = function () {
    var openPopup = map.querySelector('.popup');
    if (openPopup) {
      openPopup.parentNode.removeChild(openPopup);
    }
    document.removeEventListener('click', closePopup);
  };

  var renderFeatures = function (offerPin, features) {
    var fragment = document.createDocumentFragment();
    var feature = features.querySelector('.popup__feature');
    feature.classList.remove('popup__feature--wifi');
    features.innerHTML = '';

    for (var i = 0; i < offerPin.offer.features.length; i++) {
      var featureElement = feature.cloneNode(true);
      var nameClass = 'popup__feature--' + offerPin.offer.features[i];
      featureElement.classList.add(nameClass);
      fragment.appendChild(featureElement);
    }
    features.appendChild(fragment);
  };

  var renderPhotos = function (offerPin, photos) {
    var fragment = document.createDocumentFragment();
    var photo = photos.querySelector('.popup__photo');
    photos.innerHTML = '';

    for (var i = 0; i < offerPin.offer.photos.length; i++) {
      var photoElement = photo.cloneNode(true);
      photoElement.src = offerPin.offer.photos[i];
      fragment.appendChild(photoElement);
    }
    photos.appendChild(fragment);
  };

  var renderPopup = function (offerPin) {
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
    var closeButton = offerPopup.querySelector('.popup__close');

    offerAvatar.src = offerPin.author.avatar;
    offerTitle.textContent = offerPin.offer.title;
    offerAddress.textContent = offerPin.offer.addres;
    offerPrice.textContent = offerPin.offer.price + '₽/ночь';
    offerCapacity.textContent = offerPin.offer.rooms + ' комнаты для ' + offerPin.offer.guests + ' гостей.';
    offerTime.textContent = 'Заезд после ' + offerPin.offer.checkin + ', выезд до ' + offerPin.offer.checkout + '.';
    offerDescription.textContent = offerPin.offer.description;

    switch (offerPin.offer.type) {
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

    renderFeatures(offerPin, offerFeatures);
    renderPhotos(offerPin, offerPhotos);
    map.insertBefore(offerPopup, filterContainer);
    window.util.closeSomething(closeButton, closePopup);
  };

  var openPopup = function (offers, evt) {
    var target = evt.target;
    var pinTitle;
    closePopup();

    if (target.tagName === 'IMG') {
      pinTitle = target.alt;
    } else if (target.tagName === 'BUTTON') {
      pinTitle = target.children[0].alt;
    }

    for (var i = 0; i < offers.length; i++) {
      if (pinTitle === offers[i].offer.title) {
        renderPopup(offers[i]);
      }
    }
  };

  window.card = {
    renderPopup: renderPopup,
    openPopup: openPopup
  };
})();
