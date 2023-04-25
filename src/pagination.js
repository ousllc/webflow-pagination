function webflowPagination(options) {
  // デフォルト設定
  const defaultOptions = {
    splitTag: 'h3',
    contentContainerSelector: '.rich-text-content',
    paginationContainerSelector: '.pagination-container',
  };

  // オプションをマージ
  const settings = { ...defaultOptions, ...options };

  // 現在のページ番号を取得
  const currentPage = new URLSearchParams(window.location.search).get('page') || 1;

  // コンテンツコンテナを取得
  const contentContainer = document.querySelector(settings.contentContainerSelector);

  // コンテンツを指定されたタグで分割する関数
  function splitContentByTag(tag) {
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

  // 分割されたコンテンツを取得
  const contentParts = splitContentByTag(settings.splitTag);

  // 分割されたコンテンツを表示
  contentContainer.innerHTML = contentParts[currentPage - 1] || '';

  // ページネーション機能を実装
  function createPagination(totalPages, currentPage, startPage = 1) {
    let paginationHtml = '';

    // 前へのリンクを追加
    if (currentPage > 1) {
      paginationHtml += `<a href="?page=${currentPage - 1}" class="pagination-prev">前へ</a>`;
    }

    // ページ番号のリンクを追加
    for (let i = startPage; i < startPage + 4; i++) {
      if (i === parseInt(currentPage)) {
        paginationHtml += `<span class="pagination-count active">${i}</span>`;
      } else {
        paginationHtml += `<a href="?page=${i}" class="pagination-count">${i}</a>`;
      }
    }

    // 前のページ部分に戻るリンクを追加
    if (startPage > 1) {
      paginationHtml += `<a href="#" class="pagination-ellipsis-back" data-start-page="${startPage - 4}">...</a>`;
      paginationHtml += `<a href="?page=1" class="pagination-count">1</a>`;
    }

    // 次のページ部分に進むリンクを追加
    if (totalPages > startPage + 3) {
      paginationHtml += `<a href="#" class="pagination-ellipsis" data-start-page="${startPage + 4}">...</a>`;
      paginationHtml += `<a href="?page=${totalPages}" class="pagination-count">${totalPages}</a>`;
    }

    // 次へのリンクを追加
    if (currentPage < totalPages) {
      paginationHtml += `<a href="?page=${currentPage + 1}" class="pagination-next">次へ</a>`;
    }

    return paginationHtml;
  }

  // ページネーションHTMLを生成
  const totalPages = contentParts.length;
  let paginationHtml = createPagination(totalPages, parseInt(currentPage));

  // ページネーシーションHTMLを挿入
  const paginationContainer = document.querySelector(settings.paginationContainerSelector);
  paginationContainer.innerHTML = paginationHtml;

  // クリックイベントを追加
  paginationContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('pagination-ellipsis')) {
      event.preventDefault();
      const startPage = parseInt(event.target.getAttribute('data-start-page'));
      paginationHtml = createPagination(totalPages, parseInt(currentPage), startPage);
      paginationContainer.innerHTML = paginationHtml;
    }
    // 前のページ部分に戻るリンクのクリックイベント
    if (event.target.classList.contains('pagination-ellipsis-back')) {
      event.preventDefault();
      const startPage = parseInt(event.target.getAttribute('data-start-page'));
      paginationHtml = createPagination(totalPages, parseInt(currentPage), startPage);
      paginationContainer.innerHTML = paginationHtml;
    }
  });
}
export default webflowPagination;