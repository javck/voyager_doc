# 複寫路由

你能夠複寫任何Voyager自帶的路由規則，作法是把你要複寫的路由寫在Voyager::routes\(\)後面

比如說假如你想要複寫登錄相關的控制器，就可以這樣作

```text
\\routes\web.php

Route::group(['prefix' => 'admin'], function () {
   Voyager::routes();

   //你要複寫的路由寫在這裡
   Route::post('login', ['uses' => 'MyAuthController@postLogin', 'as' => 'postlogin']);
});
```

