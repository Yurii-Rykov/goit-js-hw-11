export default class LoadingPagination {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    if (hidden) {
      this.hiden();
    }
  }

  getRefs(selector) {
    const refs = {};

    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');
    refs.spinner = refs.button.querySelector('.spinner');

    return refs;
  }
  anable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Load more..';
    this.refs.spinner.classList.add('is-hidden');
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Loading..';
    this.refs.spinner.classList.remove('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }
  hiden() {
    this.refs.button.classList.add('is-hidden');
  }
}
