import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './new-service';
import RenderGelery from './render-gelery';

const formEl = document.querySelector('#search-form');
const divEl = document.querySelector('.gallery');
const buttonEl = document.querySelector('.load-more');
const apiService = new ApiService();

formEl.addEventListener('submit', onSubmit);
buttonEl.addEventListener('click', onLoadMore);

function onSubmit(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value;
  if (apiService.query === '') {
    return Notify.failure('Enter search name!');
  }
  clearMarkup();
  //   apiService.resetPage();
  apiService.fetchArticles().then(appendMarkup);
}

function onLoadMore() {
  apiService.fetchArticles().then(appendMarkup);
  //   if (apiService.page === 14) {
  //     return alert('no');
  //   }
}

function appendMarkup(data) {
  if (data.hits.length === 0) {
    return Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  buttonEl.classList.remove('is-hidden');
  divEl.insertAdjacentHTML('beforeend', RenderGelery(data.hits));
  const limit = Math.floor(data.totalHits / 40) + 2;
  console.log(apiService.page);
  if (apiService.page === limit) {
    buttonEl.classList.add('is-hidden');
    return Notify.failure('MAX!');
  }
}

function clearMarkup() {
  divEl.innerHTML = '';
}
