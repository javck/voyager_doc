# 基本安裝

安裝Voyager套件是非常容易的，你可以使用以下指令來為你的Laravel應用加入Voyager套件

`composer require tcg/voyager`

接下來，請確保建立一個新的資料庫並在.env檔案裡頭加入驗證相關參數\(帳號.密碼.資料庫名稱等等\)，如果之前就有建則是可以直接使用。除此之外，也請確保在.env檔案裡頭有APP\_URL這個參數，並且這個網址應該指向到應用的首頁

```text
APP_URL=http://localhost
DB_HOST=localhost
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```

最後，我們就能夠開始安裝Voyager套件了。你能夠選擇在安裝時要不要連同假資料一併生成。假資料將會包含一個管理員帳號\(假如沒有用戶資料的話\)，1個示範頁面，4個示範文章，2個分類以及7個設定。 如果要安裝套件但不生成假資料，只需要輸入以下指令：

`php artisan voyager:install`

假如你傾向於安裝套件一併生成假資料，則改輸入以下指令：

`php artisan voyager:install —with-dummy`

> ⚠ 警告
>
> 當出現 Specified key was too long error 這樣的錯誤訊息... 當你看到這樣的錯誤訊息代表你使用的是舊版的MySQL，你可以使用這個網址的解決方案： [https://laravel-news.com/laravel-5-4-key-too-long-error](https://laravel-news.com/laravel-5-4-key-too-long-error)

這樣就差不多完成囉! 你可以使用 php artisan serve 來開啟一個本地開發伺服器，並且開啟瀏覽器輸入網址 http://localhost:8000/admin來訪問後台 假如你有生成假資料的話，將會生成一個管理員帳號，你可以使用以下口令來進行登入

```text
email: admin@admin.com
password: password
```

> 💡快速筆記 
>
> 假資料管理員帳號只有在你的資料庫沒有任何用戶時才會產生

假如你沒有生成假資料帳戶，你或許會希望能分配管理員權限到一個已存在的用戶，你可以透過以下指令來輕鬆做到這點：

`php artisan voyager:admin your@email.com`

假如你想要建立一個新的管理員用戶，你可以加上 --create參數，像這樣：

`php artisan voyager:admin your@email.com - -create`

接下來在終端機就會以互動問答的方式來要求你輸入帳戶資料

