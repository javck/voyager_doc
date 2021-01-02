# 簡介

當加入或編輯某個當前資料庫表格的BREAD，你將會看到它的BREAD資訊。裡頭允許你去設定顯示名稱.Slug.Icon.模型.控制器的命名空間以及政策名稱。你也能夠選擇是否要生成該BREAD的權限

![](https://i.imgur.com/EV7rKEy.png)

當你把畫面往下滑時你將會看到表格的每一個欄位，在這裡你將能夠設定各欄位在各個頁面是否要呈現或編輯

BROWSE \(欄位將會出現在顯示表格所有資料的頁面\) READ \(欄位將會出現在顯示某一筆資料的頁面\) EDIT \(欄位將會出現在編輯某一筆資料的頁面，並允許你去更新該欄位資料\) ADD \(欄位將會出現在新增一筆資料的頁面\) DELETE \(尚不清楚作用為何\)

你還可以選擇各個欄位要使用哪種類型的輸入項。比如說有 textBox單行文字輸入項. textArea多行文字輸入項. theckbox勾選輸入項. image圖片輸入項等等非常多的類型可供選擇

除此之外，這些輸入項可能會需要一些額外的細節又或者是選項，比方說checkbox勾選輸入項. dropbox下拉選單. radio button選擇輸入項. 以及image圖片，這時候就會用到最後面的"可選細項"，以下有更多說明

**Validation 驗證**

在每個欄位的可選細項裡，你可以透過簡單的JSON格式來加入Laravel內建的驗證規則。這裡是一個例子來告訴你要如何加入一個上限長度為12的驗證規則：

```text
{
    "validation": {
        "rule": "required|max:12"
    }
}
```

或許，你還想要為這些驗證規則加入自定義的錯誤訊息\(因為預設的錯誤訊息都是英文的\)，你可以這樣達成：

```text
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

```text
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

```text
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

**Tagging 標籤**

Tagging讓你能夠為多對多關係的欄位去加入新的項目，比如說文章的標籤，使用時機是在編輯或新增頁面

要開啟這個功能，你只需要在關聯資料視窗去把Allow Tagging設為true

![](https://i.imgur.com/IlXW9bN.png)

之後你就能夠在選擇輸入項內去輸入任何文字，並在按下Enter之後加入新的項目與關係

> 請特別注意： 這功能並非萬能，它只會幫你把輸入的文字存入顯示欄位\(display-column\)，所以你必須確保其他的欄位有預設值或者是可為空值，以免新建時出現SQL錯誤

**排序 BREAD 項目**

你能夠定義在顯示所有資料頁面的資料排序，透過拖拉的方式。 為此你必須先改變你在BREAD的設定：

![](https://i.imgur.com/N2eymUh.png)

**順序欄位**\(Order column\)是你的表格用來儲存順序的欄位，通常型態都是integer整數 **顯示順序欄位**\(Order display column\)是要在排序編輯頁面用來代表該資料的文字，一般都是用標題或名字 **排序方式**\(Order direction\)是用來設定排序方式，有兩種分別是從小到大\(asc\)或從大到小\(desc\)

按下順序按鈕將會開啟讓你排序資料的頁面：

![](https://i.imgur.com/EURqPvA.png)

**設置預定義結果過濾\(Scope browse-results\)**

假如你想要在顯示所有資料的頁面去加入過濾功能，你能夠在模型類別裡頭加入一個Scope

比如說你只想要看到該使用者所張貼的文章，你就可以定義這樣的Scope:

```text
\\app\Models\User.php

public function scopeCurrentUser($query)
{
    return $query->where('author_id', Auth::user()->id);
}
```

接下來，回到文章posts的BREAD設定頁面，找到Scope輸入項並選擇currentUser

![](https://i.imgur.com/mCEbFA2.png)

在你完成儲存之後，回到Browse頁面將只會看到你所撰寫的文章囉

