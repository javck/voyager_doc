# 欄位通用設定

表單欄位是Voyager套件的BREAD系統核心

每一個formfield都代表了你資料庫表格的一個欄位，也作為BREAD的一個輸出/入

如需要進行你formfield的調整，可以透過在"可選細項"加入JSON格式的設定，以下會進行詳細的說明

所有的formfield都具備的好用選項如下：

**描述Description**

所有的輸入項都支持描述讓你能夠有個地方向使用者說明究竟這個輸入項是做什麼用的，這不是必須的，如果需要的話，可加入以下設定

All formfields share a handful options:

{ "description": "輸入項的輸入提示" }

**顯示**

有一些選項能夠讓你改變這些輸入項在BREAD頁面顯示的方式。你能夠加入一個display作為JSON物件，並在其加入width來變更輸入項的長度，又或者加入id來設定輸入項標籤的ID屬性

```text
{
    "display": {
        "width": "3",
        "id": "custom_id"
    }
}
```

寬度和Bootstrap一樣是採用12欄系統，所以上限是12。如果你希望讓輸入項的長度為畫面的1/4的話，就設定為3

當你設定id之後，就會有一個div標籤包著輸入項，div標籤就帶著id屬性，內容為你指定的custom\_id，例如：

```text
<div id="custom_id">
    <!-- Your field element -->
</div>
```

**預設值**

大部分的輸入項都允許你在新增一筆資料時去定義其預設值

```text
{
    "default" : "Default text"
}
```

**空值**

你也許想要以空值null來存入資料庫欄位而非空字串。作法很簡單，你只要在可選細項加入以下設定：

```text
{
    "null": ""
}
```

> 根據我的測試，輸入項預設就會把空字串轉成null，所以上面的設定可以不用加

有些情況你需要把某些內容轉為null，比如說當使用者輸入Nothing的時候，不要存入Nothing到資料庫，而是null，可在可選細項加入以下設定：

```text
{
    "null": "Nothing"
}
```

**生成Slugs**

使用BREAD建構器，你也許希望能夠為某些輸入自動生成slug。比如說你有一些文章，它們有標題以及slug。假如你希望能夠自動根據標題屬性來生成slug，你可以在slug欄位的可選細項加入以下設定：

```text
{
    "slugify": {
        "origin": "title",
        "forceUpdate": true
    }
}
```

這將會在變更title欄位時自動的生成slug值。假如slug值已經存在了，只有在forceUpdate設為true時才會更新，預設為false

> 這個功能不支持中文，需要特別注意

**自定義視圖**

你可以設定自定義視圖來顯示輸入項，為此你可以加入view屬性來指定視圖檔案：

```text
{
    "view": "my_view"
}
```

這將會從resources/views去載入my\_view視圖而不是輸入項的預設視圖

你將會得到大量的參數提供給你的視圖：

$view 可以是browse, read, edit, add 或者是 order

$content 輸入項的內容

$dataType DataType，也就是表格類別

$dataTypeContent 模型實例

$row 資料實例

$options 某資料表欄位的可選細項

> 你有開發自定義輸入項? 假如你有開發自定義輸入項，並且希望能夠在BREAD設定頁去客製它們，你可以在這些自定義書輸入項類別裡的createContent\(\)，去取用$options參數來判斷

