# 經緯度 Coordinates

這個功能我目前還沒有需求要用到，所以也不確定使用，先將官方文件翻譯出來

透過Voyager你能夠儲存經緯度並從地圖來讀入數據，首先你需要確定要儲存經緯度的欄位資料型態應為GEOMETRY或者是POINT

接著你要把 Spatial-Trait 這個 trait 引入到你的模型裡頭，並定義該欄位：

```text
\\App\Models\Category.php

<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use TCG\Voyager\Traits\Spatial;

class Category extends Model
{
    use Spatial;

    protected $spatial = ['your_column'];
}
```

現在你可以到表格的BREAD設定頁，去把這個欄位的輸入項設為Coordinates，接著你將會得到一個地圖用來選擇經緯度之用

> 注意
>
> 請確保你有設定 Google Maps 的API金鑰到Voyager設定檔裡頭，否則這功能無法正常執行，除此之外，這裡也可以讓你去定義預設的地圖中心位置

**取得經緯度**

你能夠從模型實例去取得經緯度資料，透過呼叫以下方法

`$model->getCoordinates();`

這將回傳一個經緯度名值對陣列，經度的key為lng，而緯度的key則是lat

