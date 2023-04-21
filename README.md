# webflow-pagination
Webflowでリッチテキストページネーションを追加するライブラリです

ページネーション設定
```
<script>
  webflowPagination({
    splitTag: 'h4', // ここで分割タグを指定
    contentContainerSelector: '.custom-content-container', // ここでコンテンツコンテナのクラスを指定
    paginationContainerSelector: '.custom-pagination-container', // ここでページネーションコンテナのクラスを指定
  });
</script>
```