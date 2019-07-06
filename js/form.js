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
  var inputRooms = formNotice.querySelector('#room_number');
  var inputGuests = formNotice.querySelector('#capacity');

  var checkRoomsAndGuests = function (inputOne, inputTwo, checkAttribute) {
    inputOne.addEventListener('input', function (evt) {
      var errorMessage = 'Недопустимое количество ' + checkAttribute;

      if (inputRooms.value === '1' && inputGuests.value === '3') {
        inputOne.setCustomValidity(errorMessage);
      } else if (inputRooms.value === '1' && inputGuests.value === '2') {
        inputOne.setCustomValidity(errorMessage);
      } else if (inputRooms.value === '1' && inputGuests.value === '0') {
        inputOne.setCustomValidity(errorMessage);
      } else if (inputRooms.value === '2' && inputGuests.value === '3') {
        inputOne.setCustomValidity(errorMessage);
      } else if (inputRooms.value === '2' && inputGuests.value === '0') {
        inputOne.setCustomValidity(errorMessage);
      } else if (inputRooms.value === '3' && inputGuests.value === '0') {
        inputOne.setCustomValidity(errorMessage);
      } else if (inputRooms.value === '100' && inputGuests.value === '3') {
        inputOne.setCustomValidity(errorMessage);
      } else if (inputRooms.value === '100' && inputGuests.value === '2') {
        inputOne.setCustomValidity(errorMessage);
      } else if (inputRooms.value === '100' && inputGuests.value === '1') {
        inputOne.setCustomValidity(errorMessage);
      } else {
        inputOne.setCustomValidity('');
      }
    });
  };

  window.util.getChangeStateForms(inputSelects, true);
  window.util.getChangeStateForms(filtersFieldsets, true);
  window.util.getChangeStateForms(noticeFieldsets, true);

  inputAddress.value = '570, 375';
  inputAddress.disabled = true;

  checkRoomsAndGuests(inputRooms, inputGuests, 'комнат');
  checkRoomsAndGuests(inputGuests, inputRooms, 'мест');

  inputTitle.addEventListener('input', function () {
    inputTitle.required = true;

    if (inputTitle.value.length < 30) {
      inputTitle.setCustomValidity('Заголовок объявления не должен быть короче 30 символов');
    } else if (inputTitle.value.length > 100) {
      inputTitle.setCustomValidity('Заголовок объявления не должен быть длиннее 100 символов');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  inputPrice.addEventListener('input', function () {
    inputPrice.required = true;
    inputPrice.type = 'number';

    if (inputType.value === 'bungalo' && inputPrice.value < 0) {
      inputPrice.setCustomValidity('Цена за ночь не может быть ниже 0');
    } else if (inputType.value === 'flat' && inputPrice.value < 1000) {
      inputPrice.setCustomValidity('Цена за ночь не может быть ниже 1 000');
    } else if (inputType.value === 'house' && inputPrice.value < 5000) {
      inputPrice.setCustomValidity('Цена за ночь не может быть ниже 5 000');
    } else if (inputType.value === 'palace' && inputPrice.value < 10000) {
      inputPrice.setCustomValidity('Цена за ночь не может быть ниже 10 000');
    } else if (inputPrice.value > 1000000) {
      inputPrice.setCustomValidity('Цена за ночь не может быть более 1 000 000');
    } else {
      inputPrice.setCustomValidity('');
    }
  });

  inputType.addEventListener('input', function () {
    switch (inputType.value) {
      case 'bungalo':
        inputPrice.placeholder = '0';
        break;
      case 'flat':
        inputPrice.placeholder = '1 000';
        break;
      case 'house':
        inputPrice.placeholder = '5 000';
        break;
      case 'palace':
        inputPrice.placeholder = '10 000';
        break;
    }
  });

  inputTimeIn.addEventListener('input', function () {
    inputTimeOut.value = inputTimeIn.value;
  });

  inputTimeOut.addEventListener('input', function () {
    inputTimeIn.value = inputTimeOut.value;
  });


})();
