# 自定義Guard

在Voyager 1.2版本開始，你能夠定義guard並用在整個Voyager裡面

你需要把你的auth-guard名稱榜定到 VoyagerGuard

首先，請確保你有定義好一個guard，詳情請參考Laravel文件，請點[這裡](https://laravel.com/docs/8.x/authentication#adding-custom-guards)

接著開啟AuthServiceProvider類別並加入以下程式碼到register\(\)裡頭：

```text
\\App\Providers\AuthServiceProvider.php

public function register(){
    $this->app->singleton('VoyagerGuard', function () {
        return 'your-custom-guard-name';
    });
}
```

> 注意
>
> 你可以會找不到register\(\)，那就請自己新增沒關係

現在將會改成這個guard而非預設的

這裡示範一個例子因為使用不同的模型和表格來處理後台登入所以需要自定義Guard

首先，建立一個名為admins的表格，Migration檔案的表格結構寫成這樣

```text
<?php
Schema::create('admins', function (Blueprint $table) {
    $table->bigIncrements('id');
    $table->bigInteger('role_id')->unsigned()->nullable();
    $table->string('name');
    $table->string('email')->unique();
    $table->string('avatar')->nullable()->default('users/default.png');
    $table->string('password')->nullable();
    $table->string('remember_token')->nullable();
    $table->text('settings')->nullable()->default(null);
    $table->timestamps();
    $table->foreign('role_id')->references('id')->on('roles');
});
```

接下來建立一個名為Admin的模型類別，繼承Voyager的User模型：

```text
<?php

namespace App;

class Admin extends \TCG\Voyager\Models\User
{

}
```

下一步，建立一個名為admin的guard，以及一個名為admins的使用者供應器，編輯config/auth.php設定檔

```text
//config/auth.php

'guards' => [
    'admin' => [
        'driver' => 'session',
        'provider' => 'admins',
    ],

    // ...
],

'providers' => [
    'admins' => [
        'driver' => 'eloquent',
        'model' => App\Admin::class,
    ],

    // ...
],
```

下一步，你需要告訴Voyager去使用你的新guard，開啟AppServiceProvider.php\(不是AuthServiceProvider.php，我猜兩個應該都可以，只是時間先後的差別\)，加入以下程式碼：

```text
\\App\Providers\AppServiceProvider.php

public function register()
{
    $this->app->singleton('VoyagerGuard', function () {
        return 'admin';
    });
}
```

> 注意
>
> 使用者BREAD設定依然會去管理users表格，而非 admins 。你需要自己去為admins表格去建立BREAD功能

