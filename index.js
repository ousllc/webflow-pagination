// my-pagination-library.js
class Pagination {
  constructor(itemsPerPage) {
    this.itemsPerPage = itemsPerPage;
  }

  getPage(items, pageNumber) {
    const start = (pageNumber - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return items.slice(start, end);
  }
}
