# 缺少必要參數

**症狀**：你得到一個錯誤頁面顯示 Missing required parameters for \[Route...\]

**原因**：這有2個可能原因造成

* 你的表格缺少主鍵
* 你的表格有主鍵，但名字不叫做id，你又沒有在模型裡面進行設定

**解法**：

* 原因1的解法就是為了表格建立主鍵
* 原因2的解法就是在模型裡面去告知正確的主鍵欄位名稱

```text
\\App\Models\Article.php

$primaryKey = 'your_primary_key';
```

更多相關內容，請參考Laravel的Eloquent Model Conventions，請看[這裡](https://laravel.com/docs/8.x/eloquent#primary-keys)

