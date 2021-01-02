# 進階安裝

這一節是針對那些想要安裝Voyager套件到已經存在的舊Laravel專案，或者是想要自己進行手動安裝的用戶。假如這不是你的情況，你可以退回上一節又或者是跳過這一節。

第一件事情要做的是要把Voyager的素材檔案佈署到專案裡頭，你能夠透過以下指令輕鬆做到這一點。

```text
php artisan vendor:publish - -provider=“TCG\Voyager\VoyagerServiceProvider"
php artisan vendor:publish - -provider=“Intervention\Image\ImageServiceProviderLaravelRecent"
```

下一步，呼叫 php artisan migrate 來遷移所有Voyager的表格

> 💡快速筆記 
>
> 假如你有需要修改Migration檔案，比如你想要使用其他表格而非users來儲存用戶資料，不要進行遷移。相對的，將Voyager的Migration檔案複製進到database/migrations，進行你的修改，然後關閉設定選項database.autoload\_migrations，最後才進行遷移

現在，開啟你的User模型\(通常是app/User.php 又或者是app/Models/User.php\)，並讓這個類別改為繼承\TCG\Voyager\Models\User而非原先的Authenticatable

![](https://i.imgur.com/4oLpbJJ.png)

在下一步，你需要加入Voyager路由到你的routes/web.php檔案裡頭

![](https://i.imgur.com/bjkoY6b.png)

現在呼叫 php artisan db:seed --class=VoyagerDatabaseSeeder來生成需要的資料

呼叫 php artisan hook:setup 來安裝 hooks系統

呼叫 php artisan storage:link來建立 storage捷徑到public資料夾內

最後，呼叫 composer dump-autoload來完成你的安裝!

