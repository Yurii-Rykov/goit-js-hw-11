import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import ApiService from './new-service';
import { renderGelery, renderMessage } from './render-gelery';
import LoadingPagination from './loading-pagination';

const formEl = document.querySelector('#search-form');
const divEl = document.querySelector('.gallery');
const divMessage = document.querySelector('.all-content');
// const spiner = document.querySelector('.spinner-border');

const loadingPagination = new LoadingPagination({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const loadingSearch = new LoadingPagination({
  selector: '[data-action-search="Search"]',
});

const apiService = new ApiService();

formEl.addEventListener('submit', onSubmit);
loadingPagination.refs.button.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value;
  if (apiService.query === '') {
    return Notify.failure('Enter search name!');
  }

  loadingSearch.disable();
  clearMarkup();
  apiService.resetPage();
  onLoadMore();
}

async function onLoadMore() {
  loadingPagination.disable();
  loadingPagination.setText('Loading..');

  try {
    const dataApi = await apiService.fetchArticles();
    if (dataApi.hits.length === 0) {
      return Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    appendMarkup(dataApi);
    loadingSearch.anable();

    if (apiService.page === 2) {
      Notify.success(`Hooray! We found ${dataApi.totalHits} images.`);
    }
  } catch (error) {
    console.error(error);
  }
}

function appendMarkup(data) {
  loadingPagination.show();
  loadingPagination.anable();
  loadingPagination.setText('Load more');

  divEl.insertAdjacentHTML('beforeend', renderGelery(data.hits));
  lightbox.refresh();

  const limit = Math.floor(data.totalHits / 40) + 2;
  if (apiService.page === limit) {
    loadingPagination.hiden();
    divMessage.insertAdjacentHTML('beforeend', renderMessage());
    return Notify.info('All content on request');
  }
}

function clearMarkup() {
  divEl.innerHTML = '';
}

var lightbox = new SimpleLightbox('.gallery a', {});
