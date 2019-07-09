'use strict';

(function () {
  var READ_URL = 'https://js.dump.academy/keksobooking/data';
  var WRITE_URL = 'https://js.dump.academy/keksobooking';
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var responceHandler = function (template) {
    var deleteResponceHandler = function () {
      document.body.children[0].remove();
    };

    var onEscPress = function (evt) {
      window.util.isEscEvent(evt, deleteResponceHandler);
      document.removeEventListener('click', onMousePress);
      document.removeEventListener('keydown', onEscPress);
    };

    var onMousePress = function () {
      deleteResponceHandler();
      document.removeEventListener('click', onMousePress);
      document.removeEventListener('keydown', onEscPress);
    };

    var elementOfTree = template.cloneNode(true);
    elementOfTree.style.zIndex = '3';
    document.body.insertAdjacentElement('afterbegin', elementOfTree);

    document.addEventListener('click', onMousePress);
    document.addEventListener('keydown', onEscPress);
  };

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        responceHandler(errorTemplate);
      }
    });

    xhr.addEventListener('error', function () {
      responceHandler(errorTemplate);
    });

    xhr.addEventListener('timeout', function () {
      responceHandler(errorTemplate);
    });

    xhr.timeout = 10000;
    xhr.open('GET', READ_URL);
    xhr.send();
  };

  var save = function (data, onSave) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSave();
        responceHandler(successTemplate);
      } else {
        responceHandler(errorTemplate);
      }
    });

    xhr.addEventListener('error', function () {
      responceHandler(errorTemplate);
    });

    xhr.addEventListener('timeout', function () {
      responceHandler(errorTemplate);
    });

    xhr.timeout = 10000;
    xhr.open('POST', WRITE_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
