function splitContentByTag(contentContainer, tag) {
  const contentParts = [];
  let tempContainer = document.createElement('div');

  Array.from(contentContainer.children).forEach((child) => {
    if (child.tagName.toLowerCase() === tag) {
      if (tempContainer.children.length) {
        contentParts.push(tempContainer.innerHTML);
        tempContainer = document.createElement('div');
      }
    }
    tempContainer.appendChild(child.cloneNode(true));
  });

  contentParts.push(tempContainer.innerHTML);

  return contentParts;
}

function createPagination(totalPages, currentPage) {
  let paginationHtml = '';

  if (currentPage > 1) {
    paginationHtml += `<a href="?page=${currentPage - 1}" class="pagination-prev">前へ</a>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i === parseInt(currentPage)) {
      paginationHtml += `<span class="pagination-count active">${i}</span>`;
    } else {
      paginationHtml += `<a href="?page=${i}" class="pagination-count">${i}</a>`;
    }
  }

  if (currentPage < totalPages) {
    paginationHtml += `<a href="?page=${currentPage + 1}" class="pagination-next">次へ</a>`;
  }

  return paginationHtml;
}

function webflowPagination(options) {
  document.addEventListener('DOMContentLoaded', () => {
    const defaultOptions = {
      splitTag: 'h3',
      contentContainerSelector: '.rich-text-content',
      paginationContainerSelector: '.pagination-container',
    };

    const settings = { ...defaultOptions, ...options };

    const currentPage = new URLSearchParams(window.location.search).get('page') || 1;
    const contentContainer = document.querySelector(settings.contentContainerSelector);

    if (contentContainer) {
      const contentParts = splitContentByTag(contentContainer, settings.splitTag);
      contentContainer.innerHTML = contentParts[currentPage - 1] || '';

      const totalPages = contentParts.length;
      const paginationHtml = createPagination(totalPages, parseInt(currentPage));

      const paginationContainer = document.querySelector(settings.paginationContainerSelector);
      paginationContainer.innerHTML = paginationHtml;

      paginationContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('pagination-ellipsis')) {
          event.preventDefault();
          const startPage = parseInt(event.target.getAttribute('data-start-page'));
          const updatedPaginationHtml = createPagination(totalPages, parseInt(currentPage), startPage);
          paginationContainer.innerHTML = updatedPaginationHtml;
        }
        if (event.target.classList.contains('pagination-ellipsis-back')) {
          event.preventDefault();
          const startPage = parseInt(event.target.getAttribute('data-start-page'));
          const updatedPaginationHtml = createPagination(totalPages, parseInt(currentPage), startPage);
          paginationContainer.innerHTML = updatedPaginationHtml;
        }
      });
    }
  });
}

window.webflowPagination = webflowPagination;
