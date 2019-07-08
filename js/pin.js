'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 87;
  var TOP_PIN_LIMIT = 130;
  var BOTTOM_PIN_LIMIT = 630;

  var map = document.querySelector('.map');
  var pinList = map.querySelector('.map__pins');
  var pinMain = pinList.querySelector('.map__pin--main');

  var formFilters = document.querySelector('.map__filters');
  var formNotice = document.querySelector('.ad-form');
  var inputAddress = formNotice.querySelector('#address');
  var inputSelects = formFilters.querySelectorAll('select');
  var filtersFieldsets = formFilters.querySelectorAll('fieldset');
  var noticeFieldsets = formNotice.querySelectorAll('fieldset');
  var mapCoordinates = map.getBoundingClientRect();

  var getPinCoordinates = function () {
    var pinCoordinates = pinMain.getBoundingClientRect();
    var pinLeftOffset = Math.round(pinCoordinates.left - mapCoordinates.left + PIN_WIDTH / 2);
    var pinTopOffset = pinCoordinates.top - mapCoordinates.top + PIN_HEIGHT;
    var pinOffsets = [pinLeftOffset, pinTopOffset];
    inputAddress.value = pinOffsets;
  };

  var getMoveLimits = function (element, topCoordinate, leftCoordinate) {
    if (topCoordinate < TOP_PIN_LIMIT) {
      element.style.top = TOP_PIN_LIMIT + 'px';
    } else if (topCoordinate > BOTTOM_PIN_LIMIT) {
      element.style.top = BOTTOM_PIN_LIMIT + 'px';
    } else {
      element.style.top = topCoordinate + 'px';
    }

    if (leftCoordinate < 0) {
      element.style.left = 0 + 'px';
    } else if (leftCoordinate > mapCoordinates.width - PIN_WIDTH) {
      element.style.left = mapCoordinates.width - PIN_WIDTH + 'px';
    } else {
      element.style.left = leftCoordinate + 'px';
    }
  };

  var getDraggableElement = function (draggableElement) {
    draggableElement.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      draggableElement.style.zIndex = '2';

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var topCoordinate = (draggableElement.offsetTop - shift.y);
        var leftCoordinate = (draggableElement.offsetLeft - shift.x);
        getMoveLimits(draggableElement, topCoordinate, leftCoordinate);
        getPinCoordinates();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        getPinCoordinates();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  getDraggableElement(pinMain);

  pinMain.addEventListener('mousedown', function () {
    var mapFaded = document.querySelector('.map--faded');

    if (mapFaded) {
      var onMouseMove = function () {
        map.classList.remove('map--faded');
        formNotice.classList.remove('ad-form--disabled');
        window.form.changeStateForms(false);
        window.backend.load(window.data.getData);
      };

      var onMouseUp = function () {
        pinMain.removeEventListener('mousemove', onMouseMove);
        pinMain.removeEventListener('mouseup', onMouseUp);
      };

      pinMain.addEventListener('mousemove', onMouseMove, {once: true});
      pinMain.addEventListener('mouseup', onMouseUp);
    }
  });
})();
