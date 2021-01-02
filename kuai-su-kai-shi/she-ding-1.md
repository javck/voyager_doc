# 設定

當你安裝完Voyager，你將能找到一個新的設定檔案 config/voyager.php。在這個檔案裡頭你將能夠找到各類的選項來讓你修改Voyager的安裝設定。

> 💡快速筆記 
>
> 假如你發現設定檔被快取了，請記得在修改完設定之後，呼叫 php artisan config:clear

接下來我們將會好好的來看這個設定檔，並對這些設定選項加以詳細說明。

**使用者**

![](https://i.imgur.com/FYqiXkx.png)

**add\_default\_role\_on\_register:** 是否要在建立一個新使用者時為其賦予一個預設的角色 

**default\_role:** 預設的角色名稱 

**admin\_permission:** 要能夠進到後台所需要具備的權限 

**namespace:** 應用的使用者模型的命名空間 

**redirect:** 當使用者登入之後要轉址到哪裡

**控制器**

![](https://i.imgur.com/IbTsf2D.png)

你能夠指定Voyager套件的預設控制器命名空間。假如你想要複寫任何一個Voyager的核心控制器，你能夠複製Voyager的控制器檔案，並修改這個設定到你自定義控制器所在的位置

> 💡複寫單一控制器 
>
> 假如你只想要複寫單一個控制器，你可以考慮加入以下程式碼到你的AppServiceProvider類別裡頭的register方法。 $this-&gt;app-&gt;bind\(VoyagerBreadController::class,MyBreadController::class\);

**模型**

![](https://i.imgur.com/uYXHIvt.png)

你能夠指定你模型的命名空間又或者是位置。這將在Voyager的資料庫管理員為你建立Model模型時會用到，如果不設定的話舊會使用預設的應用命名空間。

**素材**

![](https://i.imgur.com/gArqIli.png)

你可能想要去指定不同的素材路徑，比如你的網站是放在子資料夾之下就需要把該資料夾作為路徑的起始。又比如假如你想要複寫這些素材以進行客製的話也需要設定這個

> 💡升級Voyager套件 
>
> 當升級到更新的Voyager版本時，座落於/vendor/tcg/voyager/assets資料夾的素材們就需要作複寫。因此當你客製好了新的素材樣式之後，就需要把新素材所在位置設定在這裡

**儲存**

![](https://i.imgur.com/4xVpnAZ.png)

預設Voyager套件使用public本地儲存庫。你能夠指定去使用任何一個在你的config/filesystems.php裡頭所設定的儲存機制。這意味著你可以使用S3.Google Cloud Storage或者任何一個你想要使用的儲存系統

**資料庫**

![](https://i.imgur.com/CyUEjBv.png)

你可能想要在Voyager的資料庫管理員隱藏一些表格。在這個地方你可以指定哪些表格需要被隱藏。至於autoload\_migrations允許你在執行 php artisan migrate 指令時去排除Voyager的遷移檔

**多語系**

![](https://i.imgur.com/N3ySefQ.png)

你能夠設定是否要開啟多語系功能。除此之外，你也能夠去指定預設使用的語言以及所要需要支持的語系。 這裡可以了解更多的多語系資訊，請點[這裡](../he-xin-guan-nian/duo-yu-xi.md).

**資訊面板**

![](https://i.imgur.com/11zANXS.png)

在資訊面板的設定部分，你可以加入navbar\_items ，讓 data\_tables支援responsive，並且管理你的所有widget

* **'navbar\_items**'讓你編輯用戶下拉選單的各個項目，比如 'route'用來決定該項目的連結, 'icon\_class'設定該項目的Icon圖案
* **'target\_blank'**則決定了點擊後是否要開啟新的視窗
* \(未證實\)如果你把data\_tables的responsive設為true的話，就可以讓datatables的顯示支持RWD

widgets這邊你能管理所有顯示在資訊面板的widget。如果不曉得該怎麼撰寫widget類別，你可以到 tcg/voyager/src/Widgets這個資料夾來參考範例Widget類別是怎麼寫的

**主色系**

![](https://i.imgur.com/YWUH8gy.png)

Voyager管理資訊面板的主色系是淡藍色，你能夠透過修改 primary\_color屬性來設成你想要的顏色

**顯示開發者提示**

![](https://i.imgur.com/khNObGS.png)

在Voyager的管理後台有不少的開發者提示訊息又或者是通知來告訴你該如何去取得某些Voyager參數。如果你不想要顯示這些提示的話，可以把 show\_dev\_tips設為false

**額外的樣式**

![](https://i.imgur.com/5QXxDZf.png)

你能夠加入你自定義的樣式表用來調整Voyager後台，這表示你能夠為Voyager後台設計出全新的主題風格。 如需了解更多，可以參考 [這裡](https://voyager-docs.devdojo.com/customization/additional-css-js).

**額外的JS腳本**

![](https://i.imgur.com/mWAVOcS.png)

就跟先前的額外樣式相同。你可以加入你自己的JS腳本用以在Voyager後台執行，你可以根據你的需要加入多個腳本進去 如需了解更多，可以參考 [這裡](https://voyager-docs.devdojo.com/customization/additional-css-js).

**Google地圖**

![](https://i.imgur.com/3sb76bU.png)

這裡有一個新的資料類型 coordinates，它允許你去加入一個Google地圖。使用者能夠透過拖拉地圖上大頭釘的方式來將經緯度存到資料庫裡頭。 在這個設定你能夠設定Google地圖Key以及中心點座標。預設是把這些設定放在.env檔案裡頭。

**允許的Mimetypes**

要允許哪些檔案能夠透過多媒體管理員來進行上傳，你可以定義 allowed\_mimetypes

![](https://i.imgur.com/hfnlzdY.png)

使用者只能夠上傳檔案格式有列在裡頭的檔案類型之內容，如果需要允許所有類型的內容，可改用以下設定

![](https://i.imgur.com/m9OhwUT.png)

