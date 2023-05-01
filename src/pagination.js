function webflowPagination(options) {
  document.addEventListener('DOMContentLoaded', () => {
    // デフォルト設定
    const defaultOptions = {
      splitTag: 'h3',
      contentContainerSelector: '.rich-text-content',
      paginationContainerSelector: '.pagination-container',
      prevLinkClass: 'pagination-prev',
      countLinkClass: 'pagination-count',
      countLinkTextClass: 'pagination-count-text',
      nextLinkClass: 'pagination-next',
      prevText: '前へ',
      nextText: '次へ',
      currentPageLinkClass: 'active',
      btnLinkTextClass: 'pagination-btn-text',
      child: false
    };

    // オプションをマージ
    const settings = { ...defaultOptions, ...options };

    // 現在のページ番号を取得
    const currentPage = new URLSearchParams(window.location.search).get('page') || 1;

    // コンテンツコンテナを取得
    const contentContainer = document.querySelector(settings.contentContainerSelector);

    if (contentContainer) {
      // コンテンツを指定されたタグで分割する関数
      function splitContentByTag(tag, child) {
        const contentParts = [];
        let tempContainer = document.createElement('div');

        if (child && tag.indexOf(' ') > -1 && tag.split(' ').length === 2 && tag.split(' ')[1]) {
          const [parentTag, childTag] = tag.split(' ');
          const parentElements = contentContainer.querySelectorAll(parentTag);

          parentElements.forEach((parentElement) => {
            const childElement = parentElement.querySelector(childTag);
            if (childElement) {
              if (tempContainer.children.length) {
                contentParts.push(tempContainer.innerHTML);
                tempContainer = document.createElement('div');
              }
              parentElement.removeChild(childElement);
              tempContainer.appendChild(parentElement.cloneNode(true));
              contentParts.push(tempContainer.innerHTML);
              tempContainer = document.createElement('div');
            }
          });
        } else {
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
        }

        return contentParts;
      }


      // 分割されたコンテンツを取得
      const contentParts = splitContentByTag(settings.splitTag, settings.child);

      // 分割されたコンテンツを表示
      contentContainer.innerHTML = contentParts[currentPage - 1] || '';

      // ページネーション機能を実装
      function createPagination(totalPages, currentPage) {
        let paginationHtml = '';

        // 前へのリンクを追加
        if (currentPage > 1) {
          paginationHtml += `<a href="?page=${currentPage - 1}" class="${settings.prevLinkClass}"><span class="${settings.btnLinkTextClass}">${settings.prevText}</span></a>`;
        }

        // ページ番号のリンクを追加
        for (let i = 1; i <= totalPages; i++) {
          if (i === parseInt(currentPage)) {
            paginationHtml += `<p class="${settings.countLinkClass} ${settings.currentPageLinkClass}"><span class="${settings.countLinkTextClass}">${i}</span></p>`;
          } else {
            paginationHtml += `<a href="?page=${i}" class="${settings.countLinkClass}"><span class="${settings.countLinkTextClass}">${i}<span></a>`;
          }
        }

        // 次へのリンクを追加
        if (currentPage < totalPages) {
          paginationHtml += `<a href="?page=${currentPage + 1}" class="${settings.nextLinkClass}"><span class="${settings.btnLinkTextClass}">${settings.nextText}</span></a>`;
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
  });
}

window.webflowPagination = webflowPagination;