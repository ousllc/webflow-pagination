// index.js

class Pagination {
  constructor(totalPages, currentPage, baseUrl, maxVisiblePages = 5) {
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    this.baseUrl = baseUrl;
    this.maxVisiblePages = maxVisiblePages;
  }

  render() {
    let paginationHtml = '';

    if (this.currentPage > 1) {
      paginationHtml += `<a href="${this.baseUrl}?page=${this.currentPage - 1}">前へ</a>`;
    }

    if (this.currentPage <= this.maxVisiblePages) {
      for (let i = 1; i <= Math.min(this.maxVisiblePages, this.totalPages); i++) {
        paginationHtml += this.pageLink(i);
      }

      if (this.totalPages > this.maxVisiblePages) {
        paginationHtml += `...<a href="${this.baseUrl}?page=${this.totalPages}">${this.totalPages}</a>`;
      }
    } else if (this.currentPage > this.totalPages - this.maxVisiblePages) {
      paginationHtml += `<a href="${this.baseUrl}?page=1">1</a>...`;

      for (let i = this.totalPages - this.maxVisiblePages + 1; i <= this.totalPages; i++) {
        paginationHtml += this.pageLink(i);
      }
    } else {
      paginationHtml += `<a href="${this.baseUrl}?page=1">1</a>...`;

      for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
        paginationHtml += this.pageLink(i);
      }

      paginationHtml += `...<a href="${this.baseUrl}?page=${this.totalPages}">${this.totalPages}</a>`;
    }

    if (this.currentPage < this.totalPages) {
      paginationHtml += `<a href="${this.baseUrl}?page=${this.currentPage + 1}">次へ</a>`;
    }

    return paginationHtml;
  }

  pageLink(page) {
    if (this.currentPage === page) {
      return `<span>${page}</span>`;
    } else {
      return `<a href="${this.baseUrl}?page=${page}">${page}</a>`;
    }
  }
}

export default Pagination;
