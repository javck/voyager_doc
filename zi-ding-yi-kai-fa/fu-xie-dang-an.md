# 複寫檔案

所謂複寫指的是撰寫同樣檔名的檔案，用以蓋掉同名的套件檔案。用以修改套件的預設行為或畫面

**複寫各slug的BREAD視圖**

這是自定義中最為常見的用途，建議學會

你能夠複寫任何的BREAD視圖，比如當你想要修改posts的BREAD視圖，就到resources/views/vendor/voyager/posts資料夾去放入複寫檔案

> 注意
>
> 找不到資料夾?不用擔心，預設是不會有這個資料夾的，請自己新增，不用擔心會爆炸，台灣還是會活的好好的

有4個檔案可以被複寫，分別是：

* browse.blade.php 瀏覽多筆頁面
* edit-add.blade.php 新增/編輯頁面
* read.blade.php 瀏覽單筆頁面
* order.blade.php 排序頁面

假如你想要一次複寫所有slug的BREAD視圖，則是把上面的檔案改放到resources/views/vendor/voyager/bread

> 注意
>
> 找不到資料夾?不用擔心，預設可能不會有這個資料夾，請自己新增

**使用自定義控制器**

**複寫提交按鈕**

假如你只是想要修改edit-add.blade.php的提交按鈕，是不需要改寫整個視圖的，只需要將你的edit-add.blade.php檔案改成這樣即可

```text
@extends('voyager::bread.edit-add')
@section('submit-buttons')
    @parent
    <button type="submit" class="btn btn-primary save">儲存並發佈</button>
@endsection
```

**如何使用自定義控制器**

你能夠複寫某一個BREAD的控制器，方法是建立一個繼承Voyager控制器的控制器，下面給你個例子：

```text
\\App\Http\Controllers\MyVoyagerCgyController.php

<?php

namespace App\Http\Controllers;

class MyVoyagerCgyController extends \TCG\Voyager\Http\Controllers\VoyagerBaseController
{
    //...
}
```

接著到該slug的BREAD設定頁，以上例來說就是cgys\(我知道這個命名不好，不合英文語法，我自己去罰站\)，將控制器類別名稱連帶完整命名空間填入控制器名稱欄位內

![](https://i.imgur.com/BedDQD1.png)

你現在可以複寫VoyagerBaseController裡頭的所有方法了，詳情[看這裡](https://github.com/the-control-group/voyager/blob/1.1/src/Http/Controllers/VoyagerBaseController.php)

**直接複寫Voyager控制器**

> 警告
>
> 只有在你知道自己在做什麼，並有辦法自己處理問題才這麼作!!Voyager並不建議你這麼作，另外有個問題是當Voyager日後更新也會有同步問題

假如你想要複寫任何Voyager的核心控制器，你要先去改變Voyager設定檔案voyager.php

```text
\\config/voyager.php

/*
|--------------------------------------------------------------------------
| Controllers config
|--------------------------------------------------------------------------
|
| Here you can specify voyager controller settings
|
*/

'controllers' => [
    'namespace' => 'App\\Http\\Controllers\\Voyager', //這裡填入你的複寫檔案所在路徑，建議就寫這個
],
```

下一步開啟Terminal，輸入

`php artisan voyager:controllers`

Voyager將會把所有核心控制器檔案內容複製一份到 app\Http\Controllers\Voyager 路徑裡頭，你就可以去修改程式碼囉

**複寫Voyager模型**

如果你願意，也可以複寫Voyager內建的模型 你需要加入以下程式碼到 AppServiceProvider.php 的 register\(\):

`Voyager::useModel($name, $object);`

第一參數的$name為模型的類別名稱 第二參數的$object則是你自定義模型的帶命名空間類別

直接看範例，你會更清楚

```text
\\App\Providers\AppServiceProvider.php

<?php
​
namespace App\Providers;
​
use Illuminate\Support\ServiceProvider;
use Illuminate\Events\Dispatcher;
use TCG\Voyager\Facades\Voyager;
​
class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        Voyager::useModel('DataRow', \App\MyDataRow::class);
    }
    // ...
}
```

下一步是你要去建立自己的模型並讓它繼承要複寫的模型，比如是 DataRow:

```text
\\App\Models\MyDataRow.php

<?php
​
namespace App;
​
class MyDataRow extends \TCG\Voyager\Models\DataRow
{
    // ...
}
```

假如你所複寫的這個模型是和BREAD有關的，記得到你要複寫模型的BREAD設定頁，並替換成你的新模型名稱帶命名空間，這個別忘了，不然會找不到北。

例如，假如你要複寫的是Voyager的Menu模型，改用你的App\Models\MyMenu.php模型

![](https://i.imgur.com/uMppDUc.png)

> 問題
>
> 我在嘗試複寫Menu後，會出現要進入選單建構器頁面卻顯示403權限不足的錯誤，原因不明，先作紀錄

