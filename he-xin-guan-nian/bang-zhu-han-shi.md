# 幫助函式

Voyager已經為你準備了一些工具函式，以下列出一些相信能加速你開發速度的函式

**生成Voyager所管理多媒體素材的完整網址**

預設所有被多媒體管理員控管的圖檔都會放置在storage/app/public的這個資料夾內，當你需要生成裡頭圖檔的網址，該怎麼作呢?

比方說在裡頭有個子資料夾名為images，裡面有個圖檔叫做dog.jpg，你可以在Blade使用以下程式碼來顯示該圖，簡單吧!

`<img src="{{ Voyager::image('images/dog.jpg') }}">`

**縮圖網址**

還記得嗎?當你有加入相關的可選細項設定，Voyager將會為圖片輸入類型去生成縮圖。

在縮圖產生之後，當你想在視圖裡頭呈現縮圖又或者是生成取用網址時只要加入 Resizable 這個traits到你的模型裡頭，像這樣：

```text
\\App\\Models\Post.php

use TCG\Voyager\Traits\Resizable;

class Post extends Model
{
    use Resizable;
}
```

完成之後，當你想要呈現縮圖，只需要這麼寫：

**顯示單一縮圖**

`<img src="{{ Voyager::image( $article->thumbnail('resize-500','pic') ) }}">`

上面的resize-500是縮圖名稱，也是在之前的可選細項所設定的

至於pic則是欄位名稱，假如你的欄位名稱剛好叫image，還可以進一步縮短成

`<img src="{{ Voyager::image( $article->thumbnail('resize-500') ) }}">`

**顯示多張縮圖**

```text
@php
    //將JSON內容轉成PHP陣列
    $images = json_decode($article->pics);
@endphp
@foreach($images as $image)
    <img src="{{ Voyager::image($article->getThumbnail($image, 'resize-500')) }}" />
@endforeach
```

