import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ApiService from './new-service';

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
  apiService.resetPage();
  apiService.fetchArticles().then(appendMarkup);
}

function onLoadMore() {
  apiService.fetchArticles().then(appendMarkup);
}

function appendMarkup(hits) {
  if (hits.length === 0) {
    return Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  buttonEl.classList.remove('is-hidden');
  divEl.insertAdjacentHTML('beforeend', renderGelery(hits));
}

function clearMarkup() {
  divEl.innerHTML = '';
}

function renderGelery(hits) {
  return hits
    .map(hit => {
      return `<div class="photo-card">
            <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" class="img"/>
            <div class="info">
                <p class="info-item">
                <b>Likes ${hit.likes} </b>
                </p>
                <p class="info-item">
                <b>Views ${hit.views}</b>
                </p>
                <p class="info-item">
                <b>Comments ${hit.comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads  ${hit.downloads}</b>
                </p>
            </div>
            </div>`;
    })
    .join('');
}
