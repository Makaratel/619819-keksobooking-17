'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var errorHandler = function () {
    var errorElement = errorTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        errorHandler();
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler();
    });

    xhr.addEventListener('timeout', function () {
      errorHandler();
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
