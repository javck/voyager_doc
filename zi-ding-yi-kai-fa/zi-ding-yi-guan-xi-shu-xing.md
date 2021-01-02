# 自定義關係屬性

在Voyager 1.1版本之後，你就能夠定義額外屬性作為關係來顯示

舉個例子說明，每個文章Post都有作者User，而你希望顯示作者的全名。為了達成這個目的，需要先定義一個Accessor\(Java稱為getter\)如下：

```text
\\App\Models\User.php
public function getFullNameAttribute()
{
    return "{$this->first_name} {$this->last_name}";
}
```

接著，我們需要告訴Voyager有個Accessor我們想要使用，同樣在User.php裡頭加入：

```text
\\App\Models\User.php

public $additional_attributes = ['full_name'];
```

> 記得屬性名稱會根據蛇底式命名法來調整，也是每個單字間用\_隔開，單字首字母為小寫

就這樣，你現在能在顯示關係內容時改用 full\_name囉！

![](https://i.imgur.com/BwKxMho.png)

