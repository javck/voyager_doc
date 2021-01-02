# 多語系

Voyager支持為你的模型加入多語系功能，要開啟這個功能，你需要先進行一些調整

第一步 你需要在config/voyager.php檔案內定義要支持的語系以及開啟多語系功能：

```text
'multilingual' => [
    'enabled' => true,
    'default' => 'en',
    'locales' => [
        'en',
        'da',
    ],
],
```

第二步你需要加入 Translatable Trait 到你的模型裡頭，並定義它的 translatable 屬性：

```text
\\App\Models\Post.php

use TCG\Voyager\Traits\Translatable;
class Post extends Model
{
    use Translatable;

    //要採用多語系的欄位有哪些
    protected $translatable = ['title', 'body'];
}
```

完成之後你將會在後台的BREAD頁面看到語言選擇器，如下圖所示

![](https://i.imgur.com/LQATZvS.png)

使用方法也非常簡單，你只需要切換語言頁籤之後，然後修改支持多語系的欄位內容，完成之後存檔。

等會再回來，當你再次切換語言頁籤，將會發現支持多語系的欄位內容會產生相應的改變，代表該欄位已經建立對應各語言的內容囉

**用法**

**提前載入多語系資料**

```text
// 載入所有的多語系資料
$posts = Post::with('translations')->get();

// 載入所有的多語系資料
$posts = Post::all();
$posts->load('translations');

// 載入所有的多語系資料
$posts = Post::withTranslations()->get();

// 載入特定語系的多語系資料
$posts = Post::withTranslations(['en', 'da'])->get();

// 載入所有的多語系資料
$posts = Post::withTranslation('da')->get();
```

**取得預設語系的欄位內容**

`{{ $post->title }}`

**取得指定語系的欄位內容**

`{{ $post->getTranslatedAttribute('title', 'en', 'zh_TW') }}`

> 取得英語的title欄位內容，如果找不到就改用繁體中文

假如你沒有定義語系，也就是第二參數的話，將使用應用的預設語系。假如你沒有定義備用語系，也就是第三參數的話，將使用應用的預設備用語系。

你會以字串的形式把語系代碼傳入第二與三參數，如果你想關閉備用語系，第三參數請傳入false

> 當模型欄位的預設語系與備用語系都找不到內容時，將會設定該欄位的內容為null，需要特別注意

**翻譯整個模型**

```text
//第一參數為採用語系
//第二參數為替代語系
$post = $post->translate('zh_TW', 'en');
echo $post->title;
echo $post->body;

//你也可以對模型集合呼叫translate()，它會一次幫你翻譯集合裡的所有模型
$posts = $posts->translate('zh_TW', 'en');
echo $posts[0]->title;
```

**確認該模型能否被翻譯**

```text
// 透過字串
if (Voyager::translatable(Post::class)) {
    // 可被翻譯
}

// 透過模型物件或集合
if (Voyager::translatable($post)) {
    // 可被翻譯
}
```

**動態設定欄位的語系內容**

```text
$post = $post->translate('zh_TW');
$post->title = '繁體標題內容';
$post->save();
```

**查詢可翻譯的模型**

當要查詢翻譯內容，你能夠使用whereTranslation\(\)

打個比方，如果你要查詢post的slug欄位，你可以使用以下程式碼

`$post = Post::whereTranslation('slug','my-translated-slug');`

或者是加上等號的版本

`$post = Post::whereTranslation('slug','=','my-translated-slug');`

whereTranslation\(\)接受以下的參數:

* 第一參數 field 你要查詢的欄位
* 第二參數 operator 查詢運算子，預設是=，和where一樣你可以搭配&gt;.&lt;或like等等
* 第三參數 value 你要查詢的值
* 第四參數 locales 你要查詢哪些語系，以陣列形式提供，如果全查的話就傳入null
* 第五參數 default 連帶查詢預設語系，預設為true

