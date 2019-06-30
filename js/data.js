'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinList = map.querySelector('.map__pins');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderOffers = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      var offerElement = pin.cloneNode(true);
      offerElement.style.left = offers[i].location.x + 'px';
      offerElement.style.top = offers[i].location.y + 'px';
      offerElement.children[0].src = offers[i].author.avatar;
      offerElement.children[0].alt = offers[i].offer.title;

      fragment.appendChild(offerElement);
    }
    pinList.appendChild(fragment);
  };

  var getData = function () {
    window.backend.load(renderOffers);
  }

  window.data = {
    getData: getData
  };
})();
