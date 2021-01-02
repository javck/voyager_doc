# 讓你的網址支持HTTPS協定

**症狀**：當透過HTTPS來訪問網站，來自Voyager管理的圖片都無法正常載入

**原因**：圖片網址是被Voyager透過以下程式碼來生成的：

`Storage::disk(config('voyager.storage.disk'))->url($file);`

假如voyager.storage.disk是設定為 public\(預設就是這個\)，而且public也是Laravel預先所使用的資料夾，就是storage/app/public這個路徑，那麼url屬性在磁碟設定會是如下：

`'url' => env('APP_URL').'/storage',`

懶人包就是，如果你在.env檔案裡頭所設定的APP\_URL首頁網址不是HTTPS協定的話，所生成的圖片網址同樣也不會是HTTPS協定

**解法**：

如果你從public磁碟設定裡把env\('APP\_URL'\)這段給拿掉，之後圖片生成網址將會變成相對網址，就一定會使用訪客所用的網域以及協定

假如你需要的是完整的URL，你可以在Voyager::image\('...'\)程式碼的外面再包一個asset\(\)，就像下面這樣：

`asset(Voyager::image('...'))`

這樣就會根據訪客的網域以及協定來生成完整的圖片網址

