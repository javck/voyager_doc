# 額外的CSS與JS檔案

在新版本的Voyager，你能夠加入額外的CSS與JS檔案到Voyager的父視圖\(意味著每一個後台畫面都會吃到\)而不需要透過複寫或修改視圖本身

因此你就不用再為之後的更新或搬移問題而頭痛，另外CSS和JS檔案會在其他Voyager素材被載入後才加入，所以它們的優先層級會是較高的，因此你不用擔心自定義樣式被覆蓋或功能因載入順序導致的問題

這些工作都將由voyager.php設定檔來負責，所以你只需要把要加入的CSS和JS檔案路徑寫在設定裡頭即可，下面給你個例子參考：

```text
\\config\voyager.php

'additional_css' => [
    //'css/custom.css', //檔案路徑 public/css/custom.css
],
'additional_js' => [
   //'js/custom.js', //檔案路徑 public/js/custom.js
],
```

> 提示
>
> 這些路徑將被傳進Laravel的asset\(\)，因此到public前的路徑就不用寫了，它會自動生成

