# Bread Accessor

有時候你會需要格式化屬性，卻又希望只影響部分的 BREAD 功能

舉個例子，假如你有一個name欄位，而在全覽頁也就是Browse，你希望在這個欄位為空值時你希望能改成顯示無名氏，那你可以在模型加入以下程式碼：

```text
\\App\Models\User.php

<?php
​
public function getNameAttribute()
{
    return $this->name ?? '無名氏';
}
```

這樣當name欄位為空值null時，會得到的值變成是無名氏。但問題是這是對所有行為在取用name屬性都造成影響，很容易造成其他問題

下面繼續說明如何只針對指定特定行動來進行修改，比如剛才的例子是Browse

請將剛才的程式碼微調成下面的版本，也就是在方法名稱加上Browse，現在這段程式碼只有在Browse頁面才會生效

```text
\\App\Models\User.php

<?php
​
public function getNameBrowseAttribute()
{
    return $this->name ?? '無名氏';
}
```

其他頁面都有類似的作法可以採用，如下面所列：

```text
\\App\Models\User.php

<?php
​
public function getNameReadAttribute()
{
    //
}
​
public function getNameEditAttribute()
{
    //
}
​
public function getNameAddAttribute()
{
    //
}
```

