'use strict';

(function () {
  var READ_URL = 'https://js.dump.academy/keksobooking/data';
  var WRITE_URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_STATUS = 200;
  var TIMEOUT_RESPONCE = 10000;

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
      if (xhr.status === SUCCESS_STATUS) {
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

    xhr.timeout = TIMEOUT_RESPONCE;
    xhr.open('GET', READ_URL);
    xhr.send();
  };

  var save = function (data, onSave) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
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

    xhr.timeout = TIMEOUT_RESPONCE;
    xhr.open('POST', WRITE_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
