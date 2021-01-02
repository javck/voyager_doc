# 簡介

當加入或編輯某個當前資料庫表格的BREAD，你將會看到它的BREAD資訊。裡頭允許你去設定顯示名稱.Slug.Icon.模型.控制器的命名空間以及政策名稱。你也能夠選擇是否要生成該BREAD的權限

![](https://i.imgur.com/7U8niqr.jpg)

這裡我簡單的為大家說明這些欄位的用處

## DataType設定區
### 顯示名稱(單/複數) 

主要用在後台顯示，幫助自己理解這是哪個表格。以Cgy模型為例，單數我會取為分類，複數則取為分類集

### URL Slug

用於網址的生成，以我個人習慣，我會取為和表格名稱相同。例如Cgy模型，我會取為cgys或cgies

### 使用圖標

要輸入Voyager支持的Icon類別，主要是用於新增BREAD功能時，自動生成左側選項時所顯示的Icon

### 模型名稱

該表格的模型類別，需包含命名空間

### 控制器名稱

負責實作該表格的BREAD功能的控制器，需包含命名空間。如果要使用Voyager預設的控制器，可留空

### Policy名

所要導入的Policy類別，需包含命名空間

### 權限生成

當建立這個表格的BREAD功能時，要不要順便生成該表格的權限，強烈建議保留預設值true

### 伺服器端分頁

決定分頁功能要由前台來負責還是後台。如果由前台來負責的話，一次請求就需要傳輸所有資料，會佔用較多的網路流量。反之如果由後台來負責的話，每個頁面就需要分成多個請求來處理，伺服器的負載就會變高

再從功能面來說，Voyager的前端和後端分頁的前台功能也不同

先看一下這是後端分頁，你可以設定針對某個欄位來進行多種查詢，哪怕這個欄位資料前台並未顯示

![](https://i.imgur.com/D1yKr9t.jpg)

而這則是前端分頁，切換分頁快很多，但只能針對頁面有的內容進行查詢，也不能利用欄位來加以過濾

![](https://i.imgur.com/f81ZRt1.jpg)

總結來說，後端分頁的功能較為強大，只是對伺服器的負擔比較大。但當你流量不高的時候，問題不是太大，等到流量變大再來考慮是否轉回前端分頁吧

### 順序欄位

設定該表格由哪個欄位來儲存順序

### 顯示順序欄位

在順序變更頁面，要用哪一個欄位來呈現該筆資料

### Order direction

設定排序數字的排序方式，asc會把排序欄位從小排到大，desc則反之

### Default server-side search field

預設下，後端分頁的預設查詢欄位

### Scope

Browse瀏覽多筆資料頁面所要加載的Scope，用以過濾資料

### 描述

只是用來說明這個表格給自己看，沒有太大的作用，可填可不填

---

當你把畫面往下滑時你將會看到表格的每一個欄位，在這裡你將能夠設定各欄位在各個頁面是否要呈現或編輯

BROWSE \(欄位將會出現在顯示表格所有資料的頁面\) READ \(欄位將會出現在顯示某一筆資料的頁面\) EDIT \(欄位將會出現在編輯某一筆資料的頁面，並允許你去更新該欄位資料\) ADD \(欄位將會出現在新增一筆資料的頁面\) DELETE \(尚不清楚作用為何\)

你還可以選擇各個欄位要使用哪種類型的輸入項。比如說有 textBox單行文字輸入項. textArea多行文字輸入項. theckbox勾選輸入項. image圖片輸入項等等非常多的類型可供選擇

除此之外，這些輸入項可能會需要一些額外的細節又或者是選項，比方說checkbox勾選輸入項. dropbox下拉選單. radio button選擇輸入項. 以及image圖片，這時候就會用到最後面的"可選細項"，以下有更多說明

## Validation 驗證

在每個欄位的可選細項裡，你可以透過簡單的JSON格式來加入Laravel內建的驗證規則。這裡是一個例子來告訴你要如何加入一個上限長度為12的驗證規則：

```
{
    "validation": {
        "rule": "required|max:12"
    }
}
```

或許，你還想要為這些驗證規則加入自定義的錯誤訊息\(因為預設的錯誤訊息都是英文的\)，你可以這樣達成：

```
{
    "validation": {
        "rule": "required|max:12",
        "messages": {
            "required": "This :attribute field is a must.",
            "max": "This :attribute field maximum :max."
        }
    }
}
```

你當然可以加入更多的驗證規則，像這樣：

```
{
    "validation": {
        "rule": [
            "required",
            "max:12"
        ]
    }
}
```

想要為新增與編輯加入不同的驗證規則?沒問題，你可以這樣做到:

```
{
    "validation": {
        "rule": "min:3",
        "edit": {
            "rule": "nullable"
        },
        "add": {
            "rule": "required"
        }
    }
}
```

如需找到更多Laravel所支持的驗證規則，請參考[這裡](https://laravel.com/docs/8.x/validation#available-validation-rules)

## Tagging 標籤

Tagging讓你能夠為多對多關係的欄位去加入新的項目，比如說文章的標籤，使用時機是在編輯或新增頁面

要開啟這個功能，你只需要在關聯資料視窗去把Allow Tagging設為true

![](https://i.imgur.com/IlXW9bN.png)

之後你就能夠在選擇輸入項內去輸入任何文字，並在按下Enter之後加入新的項目與關係

> 請特別注意： 這功能並非萬能，它只會幫你把輸入的文字存入顯示欄位\(display-column\)，所以你必須確保其他的欄位有預設值或者是可為空值，以免新建時出現SQL錯誤

## 排序 BREAD 項目

你能夠定義在顯示所有資料頁面的資料排序，透過拖拉的方式。 為此你必須先改變你在BREAD的設定：

![](https://i.imgur.com/N2eymUh.png)

**順序欄位**\(Order column\)是你的表格用來儲存順序的欄位，通常型態都是integer整數 **顯示順序欄位**\(Order display column\)是要在排序編輯頁面用來代表該資料的文字，一般都是用標題或名字 **排序方式**\(Order direction\)是用來設定排序方式，有兩種分別是從小到大\(asc\)或從大到小\(desc\)

按下順序按鈕將會開啟讓你排序資料的頁面：

![](https://i.imgur.com/EURqPvA.png)

## 設置預定義結果過濾\(Scope browse-results\)

假如你想要在顯示所有資料的頁面去加入過濾功能，你能夠在模型類別裡頭加入一個Scope

比如說你只想要看到該使用者所張貼的文章，你就可以定義這樣的Scope:

```
\\app\Models\User.php

public function scopeCurrentUser($query)
{
    return $query->where('author_id', Auth::user()->id);
}
```

接下來，回到文章posts的BREAD設定頁面，找到Scope輸入項並選擇currentUser

![](https://i.imgur.com/mCEbFA2.png)

在你完成儲存之後，回到Browse頁面將只會看到你所撰寫的文章囉

