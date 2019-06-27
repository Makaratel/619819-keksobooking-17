'use strict';

(function () {
  var formFilters = document.querySelector('.map__filters');
  var formNotice = document.querySelector('.ad-form');

  var inputSelects = formFilters.querySelectorAll('select');
  var filtersFieldsets = formFilters.querySelectorAll('fieldset');
  var noticeFieldsets = formNotice.querySelectorAll('fieldset');

  var inputAddress = formNotice.querySelector('#address');
  var inputTitle = formNotice.querySelector('#title');
  var inputPrice = formNotice.querySelector('#price');
  var inputType = formNotice.querySelector('#type');
  var inputTimeIn = formNotice.querySelector('#timein');
  var inputTimeOut = formNotice.querySelector('#timeout');

  window.util.getChangeStateForms(inputSelects, true);
  window.util.getChangeStateForms(filtersFieldsets, true);
  window.util.getChangeStateForms(noticeFieldsets, true);

  inputAddress.value = '570, 375';
  inputAddress.disabled = true;

  inputTitle.addEventListener('input', function (evt) {
    var target = evt.target;
    inputTitle.required = true;

    if (target.value.length < 30) {
      target.setCustomValidity('Заголовок объявления не должен быть короче 30 символов');
    } else if (target.value.length > 100) {
      target.setCustomValidity('Заголовок объявления не должен быть длиннее 100 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  inputPrice.addEventListener('input', function (evt) {
    var target = evt.target;
    target.required = true;
    target.type = 'number';

    if (inputType.value === 'bungalo' && target.value < 0) {
      target.setCustomValidity('Цена за ночь не может быть ниже 0');
    } else if (inputType.value === 'flat' && target.value < 1000) {
      target.setCustomValidity('Цена за ночь не может быть ниже 1 000');
    } else if (inputType.value === 'house' && target.value < 5000) {
      target.setCustomValidity('Цена за ночь не может быть ниже 5 000');
    } else if (inputType.value === 'palace' && target.value < 10000) {
      target.setCustomValidity('Цена за ночь не может быть ниже 10 000');
    } else if (target.value > 1000000) {
      target.setCustomValidity('Цена за ночь не может быть более 1 000 000');
    } else {
      target.setCustomValidity('');
    }
  });

  inputType.addEventListener('input', function (evt) {
    var target = evt.target;

    if (target.value === 'bungalo') {
      inputPrice.placeholder = '0';
    } else if (target.value === 'flat') {
      inputPrice.placeholder = '1 000';
    } else if (target.value === 'house') {
      inputPrice.placeholder = '5 000';
    } else {
      inputPrice.placeholder = '10 000';
    }
  });

  inputTimeIn.addEventListener('input', function () {
    inputTimeOut.value = inputTimeIn.value;
  });

  inputTimeOut.addEventListener('input', function () {
    inputTimeIn.value = inputTimeOut.value;
  });
})();
