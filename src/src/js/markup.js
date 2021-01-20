import fetchCountries from './fetchCountries';
import refs from './refs.js';
import { success, info, error } from './pnotify.js';
import markupSingleRender from '../templates/markupSingleRender.hbs';
import markupMultipleRender from '../templates/markupMultipleRender.hbs';

const _ = require('lodash');

refs.formCountryNameInput.value = '';

function fullRender(searchQuery) {
  if (searchQuery === '') {
    clearUl();
    return;
  }
  fetchCountries(searchQuery)
    .then(data =>
      data.filter(country =>
        country.name
          .toLowerCase()
          .includes(refs.formCountryNameInput.value.toLowerCase()),
      ),
    )
    .then(countriesArray => markupRender(countriesArray))
    .catch(() => {
      refs.formCountryNameInput.value = '';
      clearUl();
      error({
        title: 'Sorry',
        text: 'Country does not exist!',
      });
    });
}

const debounced = _.debounce(() => {
  fullRender(refs.formCountryNameInput.value);
}, 500);

function markupRender(countriesArray) {
  if (countriesArray.length > 1 && countriesArray.length <= 10) {
    refs.searchResult.innerHTML = '';
    countriesArray.map(country => {
      multipleRender(country);
    });
    success({
      title: 'Success!',
      text: 'Look at the countries on your request',
    });
  } else if (countriesArray.length === 1) {
    refs.searchResult.innerHTML = '';
    countriesArray.map(country => {
      singleRender(country);
    });
    success({
      title: 'Success!',
      text: 'Country info loaded',
    });
  } else if (countriesArray.length > 10) {
    info({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}

function multipleRender(country) {
  refs.searchResult.insertAdjacentHTML(
    'beforeend',
    markupMultipleRender([...country]),
  );
}

function singleRender(country) {
  refs.searchResult.insertAdjacentHTML(
    'beforeend',
    markupSingleRender([...country]),
  );
}

function clearUl() {
  if (refs.formCountryNameInput.value === '') {
    refs.searchResult.innerHTML = '';
  }
}

refs.formCountryNameInput.addEventListener('input', debounced);
refs.formCountryName.addEventListener('submit', e => e.preventDefault());
