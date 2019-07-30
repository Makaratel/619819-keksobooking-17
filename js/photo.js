'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var formNotice = document.querySelector('.ad-form');
  var avatarChooser = formNotice.querySelector('#avatar');
  var avatarPreview = formNotice.querySelector('.ad-form-header__preview img');
  var photoChooser = formNotice.querySelector('#images');
  var photoTemplate = formNotice.querySelector('.ad-form__photo');
  var photoContainer = formNotice.querySelector('.ad-form__photo-container');
  var isFirstDowloandPhoto = true;

  var createPhoto = function (element, link) {
    element.style.backgroundImage = 'url("' + link + '")';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.backgroundSize = 'cover';
    element.draggable = true;
  };

  var sortable = function (parentElement) {
    var dragableElement;

    var onDragOver = function (evt) {
      var target = evt.target;
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';

      if (target && target !== dragableElement && target.parentNode === photoContainer) {
        target.parentNode.insertBefore(dragableElement, target.nextSibling || target || target.previousSibling);
      }
    };

    var onDragEnd = function (evt) {
      evt.preventDefault();
      parentElement.removeEventListener('dragover', onDragOver);
      parentElement.removeEventListener('dragend', onDragEnd);
    };

    parentElement.addEventListener('dragstart', function (evt) {
      dragableElement = evt.target;

      // Ограничиваем тип перетаскивания
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('Text', dragableElement.textContent);
      parentElement.addEventListener('dragover', onDragOver);
      parentElement.addEventListener('dragend', onDragEnd);
    });
  };

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoChooser.addEventListener('change', function () {
    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (isFirstDowloandPhoto) {
          createPhoto(photoTemplate, reader.result);
          isFirstDowloandPhoto = false;
        } else {
          var photo = photoTemplate.cloneNode(true);
          createPhoto(photo, reader.result);
          photoContainer.appendChild(photo);
        }
      });

      reader.readAsDataURL(file);
    }
  });

  sortable(photoContainer);
})();
