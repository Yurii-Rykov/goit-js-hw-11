export default function renderGelery(hits) {
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
