# 行動按鈕

行動按鈕會顯示在Browse頁面，每一筆資料的右方

![](https://i.imgur.com/5KOLsyU.png)

你可以加入自己的按鈕，一點都不難喔

首先，我們將建立一個 Action 類別繼承自 Voyager的 AbstractAction，比方命名為MyAction.php，如下所列：

```text
\\App\Actions\MyAction.php

<?php

namespace App\Actions;

use TCG\Voyager\Actions\AbstractAction;

class MyAction extends AbstractAction
{
    //定義按鈕文字
    public function getTitle()
    {
        return '按鈕文字';
    }

    //定義按鈕Icon類別
    public function getIcon()
    {
        return 'voyager-eye';
    }

    //定義政策，我不是太確定用途
    public function getPolicy()
    {
        return 'read';
    }

    //定義按鈕樣式類別
    public function getAttributes()
    {
        return [
            'class' => 'btn btn-sm btn-primary pull-right',
        ];
    }

    //定義按鈕連結
    public function getDefaultRoute()
    {
        return route('my.route');
    }
}
```

> 注意
>
> 請特別注意這裡有用到一個名為my.route，你需要改為專案裡頭存在的路由名稱，否則會報出找不到路由的錯誤

下一步，我們需要告訴 Voyager 要使用這個 Action。為此，再度開啟AppServiceProvider.php，修改 boot\(\)，如下所示：

```text
\\App\Providers\AppServiceProvider.php

<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Events\Dispatcher;
use TCG\Voyager\Facades\Voyager;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Voyager::addAction(\App\Actions\MyAction::class);
    }
}
```

完成後你將會看到新按鈕將會出現所有表格的Brose頁面

![](https://i.imgur.com/UKlrMF1.png)

**顯示/隱藏行動按鈕**

假如你只需要這個行動按鈕出現在特定的檔案型態，比如Post，那麼你可以在Action類別去實作函式shouldActionDisplayOnDataType\(\)

```text
\\App\Actions\MyAction.php

<?php

public function shouldActionDisplayOnDataType()
{
    return $this->dataType->slug == 'posts';
}
```

**批量行動**

批量行動是用於多筆的模型實例，假如你的行動需要批量操作，比如一次刪除或修改多筆使用者選定的資料，只要實作以下方法：

```text
\\App\Actions\MyAction.php

<?php

public function massAction($ids, $comingFrom)
{
    // 根據傳入的ID陣列來進行批量操作
    ...

    // 最後轉回來時的頁面
    return redirect($comingFrom);
}
```

