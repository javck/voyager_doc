# 無法進入後台，也沒出現任何錯誤

**症狀**：能夠正常登入，但是無法進入後台，一直被轉回前台

**原因**：Voyager後台的權限是透過permissions.permission_role這些管理權限的表格來判斷使用者有無權限進入後台，如果沒有的話是會被轉回前台的
所以如果登入沒有問題，但是進不了後台，一般會是兩個可能原因

* 所登入的角色不預備browse_admin權限(假如你沒改的話)
* 你的權限表格裡頭沒有任何權限資料

**解法**：

* 原因1的解法就是為登入角色加上browse_admin權限
* 原因2的解法就是重新執行一次 php artisan voyager:install來生成資料

