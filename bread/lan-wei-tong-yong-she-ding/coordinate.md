# Coordinate

這個我沒有用過，應該是用來設定地圖的經緯度座標，需要搭配資料庫欄位的設定才能夠正常執行，以下僅根據文件來進行簡要翻譯

**showLatLngInput / showAutocompleteInput**

是否要開啟自動完成輸入以及經緯度輸入功能，預設為true

```text
{
  "showAutocompleteInput": false,
  "showLatLngInput": false
}
```

**onChange**

當改變時要觸發什麼JS方法，比如當使用自動完成地址來重設另一個輸入項選單就會用到，觸發間隔約為0.3秒

```text
{
  "onChange": "myFunction"
}
```

第一個參數是事件類型，類型有"mapDragged". "latLngChanged". "placeChanged" 第二個參數則是資料物件，包含lat.lng和place屬性

```text
function myFunction(eventType, data) {
  console.log('eventType', eventType);
  console.log('data.lat', data.lat);
  console.log('data.lng', data.lng);
  console.log('data.place', data.place);
}
```

