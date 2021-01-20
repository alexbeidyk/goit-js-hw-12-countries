import refs from './refs';
import markupRender from '../templates/markup.hbs';

function updatePhotoMarkup(photo) {
  const markup = markupRender(photo);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearUl() {
  refs.gallery.innerHTML = '';
}

export { updatePhotoMarkup, clearUl };
