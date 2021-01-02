# 路由Routing



在執行Voyager的安裝指令後，你將會看到一些新的路由規則被加到你的routes/web.php檔案內，長得大致像這樣：

```text
Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
```

這段程式碼是用來渲染 Voyager所需的路由的，你可以改變admin前綴如果你想要的話，也可以為這些路由規則去設置，比如中介層或網域

當建立一個新的BREAD類型，並設定它的slug之後，你就能夠透過以下的路徑來訪問這些路由：

```text
URL/admin/slug-name
```

舉個例子來說明，假如我們有一個產品表格products，我們會設定它的slug為products，你就能夠透過以下網址來訪問它：

```text
URL/admin/products
```

> 注意 你可能在後台選單看不到你新建路由連結或BREAD。為了要為你的後台選單建立一個新的選項可以參考menu章節的文件

