import axios from 'axios';
import {} from './pnotify.js';

axios.defaults.baseURL = 'https://pixabay.com/api';

const key = `19960586-c1120e607d9b7a1dc997ae2a7`;

export default {
  searchQuery: '',
  page: 1,
  async axiosPixabayApi() {
    try {
      const { data } = await axios.get(
        `/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${key}`,
      );
      this.incrementPage();
      return data.hits;
    } catch (error) {
      throw error;
    }
  },

  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
};
