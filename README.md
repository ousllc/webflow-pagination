# webflow-pagination
Webflowでリッチテキストページネーションを追加するライブラリです

<!-- 任意のページにコードを追加 -->
<script type="module">
  import Pagination from './index.js';

  const totalPages = 10; // 合計ページ数
  const currentPage = new URLSearchParams(window.location.search).get('page') || 1; // 現在のページ番号
  const baseUrl = 'https://example.com/articles'; // 基本となるURL

  const pagination = new Pagination(totalPages, parseInt(currentPage), baseUrl);
  const paginationHtml = pagination.render();

  const paginationContainer = document.querySelector('.pagination-container');
  paginationContainer.innerHTML = paginationHtml;
</script>