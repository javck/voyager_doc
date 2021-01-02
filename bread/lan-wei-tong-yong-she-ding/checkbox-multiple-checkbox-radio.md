# Checkbox/Multiple Checkbox/Radio

**Checkbox**

```text
{
    "on" : "On Text",
    "off" : "Off Text",
    "checked" : true
}
```

在Voyager，Checkbox會以toggle開關這種樣貌來呈現，你可以設定開或關要顯示的文字內容。假如checked設為true的話該輸入項會設為開啟，否則預設是關閉的

**Multiple Checkbox**

```text
{
    "checked" : true,
    "options": {
        "選項1的值": "選項1的顯示文字",
        "選項2的值": "選項2的顯示文字"
    }
}
```

你能夠根據你的需要去建立多個Checkbox

**Radio Button**

```text
{
    "default" : "選項1的值",
    "options" : {
        "選項1的值": "選項1的顯示文字",
        "選項2的值"": "選項2的顯示文字"
    }
}
```

Radio Button的用法和dropdown完全相同，你可以設定一個預設值當沒有輸入的時候可以用，而選項的部分可以透過options屬性來提供

