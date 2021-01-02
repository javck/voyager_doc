# 加入自定義輸入項

這是我最常作也最喜歡的自定義技巧

是否還記得，在BREAD設定頁面，你能夠指定每個欄位所要採用的輸入項，雖然Voyager已經提供非常多元的輸入項，但其實你還是可以根據需要擴增自己的輸入項，這個環節就是告訴你該怎麼去作

你能夠輕鬆的加入一個新輸入項到Voyager裡頭。這裡示範如何加入一個數字輸入項

> 這裡新增數字輸入項只是因為較不複雜容易說明，事實上Voyager內建就有數字輸入項囉

首先建立一個新類別到專案裡頭，放在哪個資料夾都沒差，為了好整理，建立App\FormFields資料夾來存放，取名為NumberFormField

```text
\\App\FormFields\NumberFormField.php

<?php
​
namespace App\FormFields;
​
use TCG\Voyager\FormFields\AbstractHandler;
​
class NumberFormField extends AbstractHandler
{
    protected $codename = '數字輸入項';
​
    public function createContent($row, $dataType, $dataTypeContent, $options)
    {
        return view('formfields.number', [
            'row' => $row,
            'options' => $options,
            'dataType' => $dataType,
            'dataTypeContent' => $dataTypeContent
        ]);
    }
}
```

$codename變數是用來顯示在Bread設定頁的下拉選單，有支持中文。至於createContent\(\)將用來回傳要顯示的輸入項視圖，其實就是input標籤

接下來我們就要動手製作這個輸入項視圖，在resources/views資料夾裡頭建立一個formfields資料夾，並在裡面新增number.blade.php，內容如下：

```text
<input type="number"
       class="form-control"
       name="{{ $row->field }}"
       data-name="{{ $row->display_name }}"
       @if($row->required == 1) required @endif
             step="any"
       placeholder="{{ isset($options->placeholder)? old($row->field, $options->placeholder): $row->display_name }}"
       value="@if(isset($dataTypeContent->{$row->field})){{ old($row->field, $dataTypeContent->{$row->field}) }}@else{{old($row->field)}}@endif">
```

你可以根據自己的需要加入商業邏輯，或試著修改它看看

> 不用氣餒
>
> 如果剛接觸網頁程式或Laravel的新手，可能對這段程式碼不是太懂。現在你只要知道這一段最終只是要呈現出單純的HTML輸入標籤，你看不懂的部分只是從Laravel取得資料而已，你可以試著改看看，慢慢就能掌握囉

當輸入項視圖完成後，我們還要告訴Voyager有一個新的輸入項需要被載入。我們需要在Service Provider來進行這個動作，一般來說最常用的就是AppServiceProvider

```text
\\App\Providers\AppServiceProvider.php

<?php
​
namespace App\Providers;
​
use TCG\Voyager\Facades\Voyager;
use App\FormFields\NumberFormField;
use Illuminate\Support\ServiceProvider;
​
class AppServiceProvider extends ServiceProvider
{
    //..
​
    public function register()
    {
        Voyager::addFormField(NumberFormField::class);
    }
}
```

最後，你就能看到在輸入項下拉選單多個數字輸入項可以使用囉，超酷!

![](https://i.imgur.com/0VFmqKL.png)

