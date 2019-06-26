'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getChangeStateForms = function (tagsArray, disableState) {
    for (var i = 0; i < tagsArray.length; i++) {
      tagsArray[i].disabled = disableState;
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getChangeStateForms: getChangeStateForms
  }
})();
