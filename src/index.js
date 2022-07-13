import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './new-service';
import { renderGelery, renderMessage } from './render-gelery';

const formEl = document.querySelector('#search-form');
const divEl = document.querySelector('.gallery');
const buttonEl = document.querySelector('.load-more');
const divMessage = document.querySelector('.all-content');
const apiService = new ApiService();

formEl.addEventListener('submit', onSubmit);
buttonEl.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value;
  if (apiService.query === '') {
    return Notify.failure('Enter search name!');
  }
  clearMarkup();
  apiService.resetPage();
  onLoadMore();
}

async function onLoadMore() {
  try {
    const dataApi = await apiService.fetchArticles();
    appendMarkup(dataApi);
  } catch (error) {
    console.error(error);
  }
}

function appendMarkup(data) {
  if (data.hits.length === 0) {
    return Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  buttonEl.classList.remove('is-hidden');
  divEl.insertAdjacentHTML('beforeend', renderGelery(data.hits));
  const limit = Math.floor(data.totalHits / 40) + 2;
  console.log(apiService.page);
  if (apiService.page === limit) {
    buttonEl.classList.add('is-hidden');
    divMessage.insertAdjacentHTML('beforeend', renderMessage());
    return Notify.info('All content on request');
  }
}

function clearMarkup() {
  divEl.innerHTML = '';
}
