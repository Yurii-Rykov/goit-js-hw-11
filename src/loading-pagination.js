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
    this.refs.spinner.classList.add('is-hidden');
    return this;
  }
  setText(newText) {
    this.refs.label.textContent = newText;
    return this;
  }
  disable() {
    this.refs.button.disabled = true;
    this.refs.spinner.classList.remove('is-hidden');
    return this;
  }
  show() {
    this.refs.button.classList.remove('is-hidden');
    return this;
  }
  hiden() {
    this.refs.button.classList.add('is-hidden');
    return this;
  }
}
