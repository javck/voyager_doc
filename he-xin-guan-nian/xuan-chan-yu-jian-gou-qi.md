# 選單與建構器

透過Voyager你能夠簡單的去為你的應用去建立選單，事實上Voyager後台的左側選單就是透過選單建構器所建立出來的

你能夠看到目前有哪些選單透過點擊工具-&gt;選單管理按鈕。你能夠新增.編輯或刪除任何當前選單。這代表你能夠為你網站的header.sidebar.footer去建立它們的選單，而且不限定數量

當你準備好要為你的選單建立項目，你能夠點該選單的建構器按鈕

![](https://i.imgur.com/y4NU9w2.png)

這將會帶你到選單建構器，在那裡你可以新增.編輯與刪除選單項目

![](https://i.imgur.com/Uhxn4Ti.png)

在建構好你的選單資料後，你能夠輕易的實作你應用裡的前台選單。比如說我們有一個選單資料叫做main，當我們需要在任何視圖去取得這個選單的資料時，只需要呼叫以下程式就能輸出一個選單標籤：

`menu('main');`

這個選單標籤是一個無樣式的ul&gt;li結構。假如你有使用bootstrap來為你的網頁應用設定樣式，你能夠在menu\(\)的第二參數去傳入bootstrap來說明你想要用Voyager內建的bootstrap版本的menu視圖而非無樣式版本視圖，像這樣：

`menu('main', 'bootstrap');`

如果這樣還不能滿足你的話，你還能夠自己撰寫自己的menu視圖。比如說你自己新增了一個menu視圖，位置在resources/views/my\_menu.blade.php，裡頭是這樣寫的：

```text
<ul>
    @foreach($items as $menu_item)
        <li><a href="{{ $menu_item->link() }}">{{ $menu_item->title }}</a></li>
    @endforeach
</ul>
```

當你想要在任何視圖去呈現自己開發的選單時，只需要呼叫這段程式碼即可

`menu('main', 'my_menu');`

你就會看到你定義的選單被呈現在前台囉

**JSON格式的選單資料**

假如你想要的是把選單資料轉成JSON格式來提供給API而不需要標籤結構，那麼這個技巧就非常的適合你

`menu('main', '_json')`

它將會回傳給你一個集合，裡頭是所有的選單項目

