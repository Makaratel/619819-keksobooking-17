'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinList = map.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var arrayOffers = [];

  var renderOffers = function (offers) {
    var fragment = document.createDocumentFragment();
    var takeNumber = offers.length > 5 ? 5 : offers.length;

    while(pinList.children.length > 2) {
      pinList.removeChild(pinList.lastChild)
    };

    for (var i = 0; i < takeNumber; i++) {
      var offerElement = pin.cloneNode(true);
      offerElement.style.left = offers[i].location.x + 'px';
      offerElement.style.top = offers[i].location.y + 'px';
      offerElement.children[0].src = offers[i].author.avatar;
      offerElement.children[0].alt = offers[i].offer.title;

      fragment.appendChild(offerElement);
    }
    pinList.appendChild(fragment);
  };

  var getData = function (data) {
    arrayOffers = data;
    renderOffers(arrayOffers);
  };

  var filters = document.querySelector('.map__filters');
  var filterType = filters.querySelector('#housing-type');


  filterType.addEventListener('change', function () {
    var sameOffers = arrayOffers.filter(function (it){
      if (filterType.value === 'any') {
        return arrayOffers;
      } else {
        return it.offer.type === filterType.value;
      }
    })
    renderOffers(sameOffers);
  })

  window.data = {
    getData: getData
  };
})();
