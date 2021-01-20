import refs from './refs';
import * as basicLightbox from 'basiclightbox';

function fullScreenView(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  basicLightbox
    .create(`<img class="modalImg" src="https://placehold.it/1400x900">`)
    .show();
  const modalImg = document.querySelector('.modalImg');
  modalImg.src = e.target.dataset.source;
}

refs.gallery.addEventListener('click', e => {
  fullScreenView(e);
});
