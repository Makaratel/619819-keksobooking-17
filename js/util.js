'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var changeStateFields = function (tagsArray, disableState) {
    for (var i = 0; i < tagsArray.length; i++) {
      tagsArray[i].disabled = disableState;
    }
  };

  var closeSomething = function (closeButton, closeAction) {
    closeButton.addEventListener('click', closeAction);
    closeButton.addEventListener('keydown', function (evt) {
      isEnterEvent(evt, closeAction);
    });
    document.addEventListener('keydown', function (evt) {
      isEscEvent(evt, closeAction);
    });
  };

  var removeChildren = function (list, lastNumberChildren) {
    while (list.children.length > lastNumberChildren) {
      list.removeChild(list.lastChild);
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    closeSomething: closeSomething,
    getRandomNumber: getRandomNumber,
    changeStateFields: changeStateFields,
    removeChildren: removeChildren
  };
})();
