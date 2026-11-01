# موشن‌لیب — کتابخانهٔ تکنیک‌های موشن

سایت استاتیک (بدون نیاز به build روی هاست) که تکنیک‌های موشن گرافیک، رنگ‌های دقیق، زمان‌بندی و کد آماده را نشان می‌دهد.

## ساختار

```
index.html          صفحهٔ اصلی
assets/style.css    استایل
assets/app.js       منطق سایت
assets/data.js      داده‌ها (خودکار ساخته می‌شود؛ دستی ویرایش نکن)
src/techniques*.js  منبع داده‌ها؛ هر فایل مربوط به چند ویدیو
build.py            فایل‌های src را به assets/data.js تبدیل می‌کند
.htaccess           فشرده‌سازی، کش و HTTPS برای هاستینگر
```

## اضافه کردن ویدیوی جدید

1. تکنیک‌ها را در یک فایل جدید مثل `src/techniques7.js` بنویس.
2. اجرا کن: `python3 build.py`
3. تغییرات را commit و push کن.

## اتصال به هاستینگر (hPanel)

1. در hPanel: **Advanced ← Git**.
2. آدرس HTTPS مخزن عمومی را بزن، شاخه `main`.
3. مسیر نصب: `public_html` (دامنهٔ اصلی) یا پوشهٔ ساب‌دامین.
4. Create را بزن و بعد **Auto Deployment** را روشن کن. آدرس Webhook را در تنظیمات مخزن GitHub (Settings ← Webhooks) با Content type `application/json` و رویداد push اضافه کن.

از این به بعد هر push خودش روی سایت می‌نشیند.
