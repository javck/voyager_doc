# 角色與權限

Voyager內建了足夠好用的角色與權限設計。概念是每個使用者都有一個角色以及多個權限組合

在角色管理頁面，你能夠選擇去新增.編輯或刪除當前所有的角色。除此之外，當你點選要編輯某一個角色，你還能夠去編輯它所擁有的BREAD權限

![](https://i.imgur.com/jj0R42n.png)

在正式版本之後，Voayger的權限系統更貼近於Laravel的設計，這代表你能夠透過以下的方式來確認角色授權：

```text
// 透過用戶物件
$canViewPost = $user->can('read', $post);
$canViewPost = Auth::user()->can('read', $post);


// 透過控制器
$canViewPost = $this->authorize('read', $post);
```

Voyager為你內建了以下這些權限：

* browse\_admin: 使用者能否進入Voyager後台
* browse\_database:使用者能否檢視資料庫管理員介面
* browse\_bread: 使用者能否檢視BREAD介面
* browse\_media: 使用者能否檢視多媒體管理員介面
* browse\_menu: 使用者能否檢視選單管理員介面
* browse\_settings: 使用者能否檢視設定管理員介面
* read\_settings: 使用者能否檢視特定設定
* edit\_settings: 使用者能否編輯特定設定
* add\_settings: 使用者能否新增設定
* delete\_settings: 使用者能否刪除設定

除此之外，你也能為你自己的每一個BREAD類型去建立權限，它們各自都包含了檢視多筆.檢視單筆.編輯.新增與刪除權限

舉個例子來幫助你了解，比如你為products表格建立了它的BREAD類型，假如我們要為它來建立權限，它的權限key將會是browse\_products. read\_products. edit\_products. add\_products 以及 delete\_products

> 注意 假如某個選單項目與任何BREAD相關，那麼它將會檢查browse權限。比如文章posts的BREAD選單項目，就會檢查 browse\_posts權限。如果使用者沒有這個必須權限的話，該選單項目就會被隱藏

**為某特定頁面來建立權限**

比如你建立一個頁面，並且你只想給某些特定使用者角色來取用它，就能夠透過權限來進行設計

這只會在你的slug直接接在/admin\(前題你沒改前綴的話\)路徑之後才會有用。比如你有一個頁面路徑是/admin/foo/bar，那這個選單項目就無法作用

**建立權限**

首先，在permissions表格建立一筆資料，也就是一個新權限。如果想要參考這個權限類別的話，它的命名空間是\(TCG\Voyager\Models\Permission\)

這筆新資料的table_name欄位應為空值null，至於key欄位會是類似browse_{slug}這樣的格式，其中{slug}應該替換為你頁面的真實slug。

打個比方，要限制的頁面網址為/admin/create\_bill，那你要建立的權限key就是browse\_create\_bill

**設定權限**

你可以在admin/roles這個路徑的頁面來確認你想要授予每一個角色的權限組合。在上面的例子你想找一個新的checkbox名為 "Browse Create Bill"，假如使用者沒有這個權限，也就是這個checkbox沒有打勾的話，要轉址到這個頁面的選單項目就會被隱藏

**客製控制器**

你能夠建立你自己的gate，關於gate的詳細說明請參考[這裡](https://laravel.com/docs/authorization#gates)

```text
\\App\Providers\AppServiceProvider.php

public function boot()
{
    Gate::define(`browse_create_bill`, function ($user)     {
        return $user->hasPermission(`browse_create_bill`);
    });
}
```

要在控制器裡頭去驗證權限，你可以這樣作：

```text
\\App\Http\Controllers\SiteController.php

public function index()
{
  //驗證使用者是否有browse_create_bill權限，若無會拋出403錯誤

  $this->authorize('browse_create_bill');

  //通過驗證要執行的作業
```

如果你這樣作的話，請確保你有加入自定義的guard到你的控制器裡頭

> 根據我的測試，是不需要下面這段，就能啟動驗證的，不確定是否為作者的個人誤解

```text
/**
* Get the guard to be used during authentication.
*
* @return \Illuminate\Contracts\Auth\StatefulGuard
*/
protected function guard()
{
  return Auth::guard(app('VoyagerGuard'));
}
```

**在你的視圖去使用權限檢查**

你能夠使用Blade語法來檢查權限。比如說你想要去確認使用者能否檢視文章posts，只需要使用以下的語法：

```text
@can('browse', $post)
    I can browse posts
@endcan
```

又或者你可以加入else的條件判斷，也是沒問題的，像這樣：

```text
@can('browse', $post)
    I can browse posts
@else
    I cannot browse posts
@endcan
```

回到剛剛的例子，如果只是要在視圖內確認使用者能否檢視建立帳單，只需要這樣寫：

```text
@can('browse_create_bill')
    建立帳單
@endcan
```

是不是超級簡單的呢，沒錯吧 :\)

