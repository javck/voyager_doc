# 啟動Laravel軟刪除

所謂軟刪除指的是當執行刪除資料動作時，並不會真的把資料從表格中移除，只是在deleted\_at這樣的欄位去註記刪除時間，也就代表了這筆資料視作被刪除

被軟刪除的資料無法被正常的查詢語法找到，但實際上資料還是存在的，真要查詢軟刪除資料需要下特別的語法

Voyager只是協助為你的模型啟動軟刪除功能，所以關於軟刪除的操作請參考Laravel文件，請看[這裡](https://laravel.com/docs/8.x/scout#soft-deleting)

**Voyager裡頭的表格設定**

![](https://i.imgur.com/k5Josc3.png)

當使用資料庫管理員進行一個新表的時候，你可以按"添加軟刪除"按鈕來新增deleted\_at欄位。接著當你為表格加入BREAD功能，並指定其模型類別之後，你最後只需要去編輯該模型類別去啟動軟刪除功能

預設的模型類別長得像這樣:

```text
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class YourModelName extends Model
{

}
```

請改成下面的版本

```text
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class YourModelName extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];
}
```

就這樣，從此每當你透過Eloquent來刪除這個表格的資料，資料將不會真的被刪除，而只是把刪除當前時間寫入deleted\_at欄位，作為標記該資料被刪除

