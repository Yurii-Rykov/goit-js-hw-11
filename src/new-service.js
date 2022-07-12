export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    // console.log(this);

    const key = '?key=28565156-d6a8869547fee06a320be5b89';
    const options = `&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    return fetch(`https://pixabay.com/api/${key}${options}`)
      .then(response => response.json())
      .then(data => {
        this.page += 1;
        return data.hits;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
