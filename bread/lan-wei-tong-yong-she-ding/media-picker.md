# Media Picker

這是一個重量級的輸入項，我個人很喜歡也常用，同時有大量的選項可以設定，所以也是有些複雜

> 選擇圖片
>
> 你能夠透過這個輸入項來上傳又或者是使用伺服器內已有的圖片素材，要注意的是選擇是要點圖片2次，確定圖片有如下圖這樣出現，才是有選取到的喔

![](https://i.imgur.com/kIGvUch.png)

如果需要調整它的預設行為的話，你可以在可選細項加入以下選項：

```text
{
    "max": 10,
    "min": 0,
    "expanded": true,
    "show_folders": true,
    "show_toolbar": true,
    "allow_upload": true,
    "allow_move": true,
    "allow_delete": true,
    "allow_create_folder": true,
    "allow_rename": true,
    "allow_crop": true,
    "allowed": [],
    "hide_thumbnails": false,
    "quality": 90,
    "watermark": {
        "source": "...",
        "position": "top-left",
        "x": 0,
        "y": 0
    }
}
```

| 名稱 | 描述 | 類型 | 預設值 |
| :--- | :--- | :--- | :--- |
| base\_path | 相對於storage/app/public的路徑 | 字串 | /bread-slug/ |
| rename | 將上傳後的圖片根據規格來進行改名 | 字串 | 原始名稱 |
| delete\_files | 當使用的資料被刪除時把該圖檔刪除，請慎用 | 布林 | false |
| show\_as\_images | 是否要在Browse頁面以圖片而非網址路徑的形式來呈現 | 布林 | false |
| min | 最少需要選定的圖片數量 | 整數 | 0 |
| max | 最多可以選定的圖片數量 | 整數 | 0 |
| expanded | 輸入項介面預設是否展開 | 布林 | false |
| show\_folders | 是否要顯示資料夾 | 布林 | true |
| show\_toolbar | 是否顯示工具列 | 布林 | true |
| allow\_upload | 是否要允許使用者上傳新檔案 | 布林 | true |
| allow\_move | 是否要允許使用者搬移檔案/資料夾 | 布林 | true |
| allow\_delete | 是否要允許使用者刪除檔案/資料夾 | 布林 | true |
| allow\_create\_folder | 是否要允許使用者建立新資料夾 | 布林 | true |
| allow\_rename | 是否要允許使用者進行檔案更名，請慎用 | 布林 | true |
| allow\_crop | 是否要允許使用者進行圖片的修剪 | 布林 | true |
| hide\_thumbnails | 隱藏已知的縮圖，將它們作為原圖的子圖來看待 | 布林 | true |
| quality | 設定圖片上傳與產生縮圖時的壓縮比 | 整數 | 90 |
| allowed | 可被上傳或選擇的檔案類型，如為空物件代表支持所有檔案類型，如果檔案型態沒列在裡頭的檔案將不會被顯示 | 物件 | \[\] |

**允許的類型 Allowed types**

如果你希望使用者只能夠上傳某些特定類型的檔案，你可以利用 "allowed"這個屬性來達，比如設定為\["image", "audio", "video"\]又或者是連同檔名版本的\["image/jpeg", "image/png", "image/bmp"\]

**表達式  Expression**

像是選項裡頭的 base\_path 和 rename 都可以加入下面的替換符號：

* {pk}該資料的主鍵，只有base\_path能用
* {uid}當前登入使用者的id
* {date:format} 以所定義格式來呈現的當前時間，例如{date:Y.m.d}
* {random:N}以指定字元數N來組成的隨機字串

所以一個 base\_path可以設成像是以下的形式

{ "base\_path": "/my-bread/{pk}/{date:Y}/{date:m}/" }

**浮水印 Watermark**

浮水印可以用來加在上傳的圖片上頭。要啟用這個功能，你需要定義一個來源屬性，它的所在位置是相對於Voyager的檔案系統的，預設也就是在storage/app/public這一層裡頭。這裡有一些可選擇的選項你能夠用到：

**position 決定浮水印要顯示的問題，可以是:**

* top-left 左上角，此為預設
* top 上方
* top-right 右上角
* left 左邊
* center 中央
* right 右邊
* bottom-left 左下角
* bottom 下方
* bottom-right 右下角

**x 水平位移量**

x屬性能設定浮水印要根據position的設定來調整多少水平位移，預設為0

**y 垂直位移量**

y屬性能設定浮水印要根據position的設定來調整多少垂直位移，預設為0

**size 浮水印大小**

浮水印的大小應該為原圖大小的比例，預設為15

**縮圖 Thumbnails**

你能夠為每一個上傳的圖片來生成縮圖，它會有三種類型：

**Fit**

Fit結合了 cropping和 resizing 來找到最好的方式來生成縮圖以符合你的比例。 你一定要設定width，而height和position則是可選擇的。 以下是一個fit類型的例子：

```text
{
    "thumbnails": [
        {
            "type": "fit",
            "name": "fit-500",
            "width": 500, // 必須
            "height": 500, // 非必須
            "position": "center" // 非必須. Refer to http://image.intervention.io/api/fit
        }
    ]
}
```

當完成以上設定之後進行圖片上傳，點選原圖你就會看到這樣的提示

![](https://i.imgur.com/TloEH3E.png)

而在這個例子裡頭，該資料夾除了有girl1.jpeg，還會多一個名為girl1-fit-500.jpeg

**剪切 Crop**

根據所給定的尺寸和位置來剪切圖片。你必須提供width和height，而x和y則是可選擇給不給。一個Crop的例子像這樣：

```text
{
    "thumbnails": [
        {
            "type": "crop",
            "name": "crop-500-500",
            "width": 500, // Required
            "height": 500, // Required
            "x": 50, // Optional. Left offset
            "y": 50, // Optional. Top offset
        }
    ]
}
```

**重設大小 Resize**

根據尺寸來重設圖片的大小，你必須設定width，height則是可選項。這是一個Resize的例子：

```text
{
    "thumbnails": [
        // 寬度將會是 500px, 而高度將會根據圖片的比例計算而得
        {
            "type": "resize",
            "name": "resize-500",
            "width": 500,
            "upsize": true // 非必須. 設為false，來避免圖片被放大
        },
        // 重設大小為 500x500px
        {
            "type": "resize",
            "name": "resize-500-500",
            "width": 500,
            "height": 500
        },
        // 高度將會是 500px, 而寬度將會根據圖片的比例計算而得
        {
            "type": "resize",
            "name": "resize-500",
            "width": null,
            "height": 500
        }
    ]
}
```

而浮水印也同樣會被加到縮圖裡面去。只要定義浮水印的選項並且設定watermark為true，到每一個你想要加入浮水印的縮圖裡面去

