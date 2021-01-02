# TinyMCE

假如你想要客製Voyager裡頭的TinyMCE輸入項，你能夠在你的voyager設定檔內加入額外的JS檔案。在這個檔案你必須定義一個像這樣的方法

```text
function tinymce_init_callback(editor)
{
    //...
}
```

假如你需要在TinyMCE初始化之前去調整它，你可以使用以下方法

```text
function tinymce_setup_callback(editor)
{
    //...
}
```

假如你想要客製TinyMCE的初始化設定選項，你可以在BREAD的可選細項內去合併你的設定，像這樣：

```text
{
    "tinymceOptions" : {
        "name": "value"
    }
}
```

假如你想要在rich\_text\_box以外的輸入項去使用tinyMCE，你需要去進行初始化，使用：tinymce.init\(window.voyagerTinyMCE.getConfig\(\)\);

至於相關可用的變數.函式與設定選項，可以參考[TinyMCE文件](https://www.tinymce.com/docs/api/tinymce/tinymce.editor/)

