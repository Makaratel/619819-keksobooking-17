'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinList = map.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var arrayOffers = [];

  var filters = document.querySelector('.map__filters');
  var filterType = filters.querySelector('#housing-type');
  var filterPrice = filters.querySelector('#housing-price');
  var filterRooms = filters.querySelector('#housing-rooms');
  var filterGuests = filters.querySelector('#housing-guests');
  var filterFeaturesField = filters.querySelector('#housing-features');
  var filterFeatures = filters.querySelectorAll('input[name=features]');

  var getData = function (data) {
    arrayOffers = data;
    renderOffers(arrayOffers);
  };

  var renderOffers = window.util.debounce(function (offers) {
    var fragment = document.createDocumentFragment();
    var takeNumber = offers.length > 5 ? 5 : offers.length;
    window.util.removeChildren(pinList, 2);

    for (var i = 0; i < takeNumber; i++) {
      var offerElement = pin.cloneNode(true);
      offerElement.style.left = offers[i].location.x + 'px';
      offerElement.style.top = offers[i].location.y + 'px';
      offerElement.children[0].src = offers[i].author.avatar;
      offerElement.children[0].alt = offers[i].offer.title;

      fragment.appendChild(offerElement);
    }
    pinList.appendChild(fragment);
  }, 300);

  var getfilteredType = function () {
    var sameOffers = arrayOffers.filter(function (it) {
      if (filterType.value === 'any') {
        return arrayOffers;
      } else {
        return it.offer.type === filterType.value;
      }
    });
    return sameOffers;
  };

  var getfilteredPrice = function () {
    var sameOffers = arrayOffers.filter(function (it) {
      if (filterPrice.value === 'any') {
        return arrayOffers;
      } else if (filterPrice.value === 'middle') {
        return it.offer.price > 10000 && it.offer.price < 50000;
      } else if (filterPrice.value === 'low') {
        return it.offer.price <= 10000;
      } else {
        return it.offer.price >= 50000;
      }
    });
    return sameOffers;
  };

  var getfilteredRooms = function () {
    var sameOffers = arrayOffers.filter(function (it) {
      if (filterRooms.value === 'any') {
        return arrayOffers;
      } else if (filterRooms.value === '1') {
        return it.offer.rooms === 1;
      } else if (filterRooms.value === '2') {
        return it.offer.rooms === 2;
      } else {
        return it.offer.rooms === 3;
      }
    });
    return sameOffers;
  };

  var getfilteredGuests = function () {
    var sameOffers = arrayOffers.filter(function (it) {
      if (filterGuests.value === 'any') {
        return arrayOffers;
      } else if (filterGuests.value === '2') {
        return it.offer.guests === 2;
      } else if (filterGuests.value === '1') {
        return it.offer.guests === 1;
      } else {
        return it.offer.guests === 0;
      }
    });
    
    return sameOffers;
  };

  var getFilteredFeatures = function (evt) {
    var target = evt.target;
    var filterCheckboxes = map.querySelectorAll('.map__checkbox');
    var checkedFeatures = [];

    for (var i = 0; i < filterCheckboxes.length; i++) {
      if (filterCheckboxes[i].checked) {
        checkedFeatures.push(filterCheckboxes[i].value);
      }
    }

    var sameOffers = arrayOffers.filter(function (it) {
      var comparedOffers = checkedFeatures.every(function (currentFeature) {
          return it.offer.features.includes(currentFeature)
      })
      return comparedOffers;
    });
    return sameOffers;
  };

  var crossOffers = function (evt) {
    var filteredOffers = arrayOffers.filter(it => getfilteredType().includes(it));
    filteredOffers = filteredOffers.filter(it => getfilteredPrice().includes(it));
    filteredOffers = filteredOffers.filter(it => getfilteredRooms().includes(it));
    filteredOffers = filteredOffers.filter(it => getfilteredGuests().includes(it));
    filteredOffers = filteredOffers.filter(it => getFilteredFeatures(evt).includes(it));
    //console.log(getFilteredFeatures(evt));
    console.log(filteredOffers);
    return filteredOffers;
  };

  var getfilteredOffers = function (input) {
    input.addEventListener('change', function (evt) {
      window.card.closePopup();
      renderOffers(crossOffers(evt));
    });
  };

  pinList.addEventListener('click', function (evt) {
    window.card.openPopup(arrayOffers, evt);
  });

  getfilteredOffers(filterType);
  getfilteredOffers(filterPrice);
  getfilteredOffers(filterRooms);
  getfilteredOffers(filterGuests);
  getfilteredOffers(filterFeaturesField);

  window.data = {
    getData: getData
  };
})();
