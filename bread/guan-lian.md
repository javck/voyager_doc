# 關聯

**加入一個關係**

使用BREAD建構器，你能夠輕易地建立表格間的關係。在BREAD設定頁面的底部你將會找到一個"創建關係"的按鈕。

![](https://i.imgur.com/iQiQVaY.png)

> 注意 當你尚未建立好該表格的BREAD設定前請不要作這個操作。正確作法是先把第一次的BREAD設定完成後儲存，再回來這個頁面去加入關係的動作。否則你將會看到像下面這樣的通知訊息：

![](https://i.imgur.com/M7rYsx4.png)

所以當你已經建立好BREAD設定之後，你就能夠為表格去建立一個新關係了。當按下"創建關係"按鈕，將會看到一個像這樣的視窗跳出來

![](https://i.imgur.com/Ry44NSk.png)

你首先要決定關係的類型為何，是一對一還是一對多?

其次你要選擇所要關聯的表格是哪一個以及它的模型命名空間，比如\App\Models\Tag.php

接下來你選擇表格是用哪一個欄位，也就是外鍵，來建立關係

你還可以決定哪一個欄位要用來顯示在下拉選單又或者是多選項裡頭，以及關聯資料要儲存在哪一個欄位裡頭，通常還是外鍵欄位

就這樣，你可以輕易的利用Voyager幫你建立一對一.一對多.多對多的表格關係

**進階設定**

假如你希望為多對多關係去加入進階設定，你只需要在儲存好關係之後，回到BREAD設定頁面，找到該關係欄位的"可選細項"，加入類似以下的設定：

```text
{
    "foreign_pivot_key": "user_id",
    "related_pivot_key": "role_id",
    "parent_key": "id"
}
```

**排序關係**

\(目前測試沒有作用\)你可以排序關聯的結果透過在關係的可選細項設定排序物件，比如以下根據sort欄位來進行從小到大排序：

```text
{
    "sort": {
        "field": "sort",
        "direction": "asc"
    }
}
```

**過濾關聯資料**

你可以輕鬆的過濾關聯資料透過在關聯模型去定義local scope

舉例來說，假如你想要只顯示有效的資料，可以建立一個像這樣的scope:

```text
public function scopeEnabled($query)
{
    return $query->where('enabled', 1);
}
```

接著在關聯的可選細項加入以下設定

```text
And add the following to the relationship options:
{
    "scope": "enabled",
}
```

> 要填入的值是你scope方法的名稱去掉scope關鍵字。比如scopeEnabled\(\)就是enabled，E要變小寫

