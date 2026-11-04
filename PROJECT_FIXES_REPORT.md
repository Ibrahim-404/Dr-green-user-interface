# تقرير التعديلات والإصلاحات الشاملة لمشروع Dr. Green
**تاريخ التقرير:** أكتوبر 2026  
**حالة النظام:** يعمل بالكامل محلياً (Backend + Database + Frontend + Dashboard + Mobile)

---

## 📌 الفهرس
1. [نظرة عامة على حالة المشروع قبل وبعد التعديلات](#1-نظرة-عامة)
2. [تعديلات الواجهة الأمامية للموقع (Frontend - Angular Website)](#2-الواجهة-الأمامية-frontend)
3. [تعديلات الخادم والـ API (Backend - .NET 8 WebApi)](#3-الخادم-backend)
4. [إصلاحات وتغذية قاعدة البيانات (Database & Data Seeding)](#4-قاعدة-البيانات-database)
5. [تجهيز وربط لوحة التحكم (Admin Dashboard)](#5-لوحة-التحكم-dashboard)
6. [إعدادات وتوافق تطبيق الموبايل (Mobile App Integration)](#6-تطبيق-الموبايل-mobile)
7. [دليل أوامر التشغيل والروابط المحلية](#7-دليل-التشغيل-والروابط)

---

## 1. نظرة عامة
المشروع تم بناؤه مسبقاً، لكنه كان يواجه مشاكل وتوقفات متداخلة تمنعه من العمل:
* **الـ Frontend:** لم يكن يحتوي على مجلد الحزم `node_modules`، وكان موجهاً لسيرفرات قديمة مغلقة على الإنترنت.
* **الـ Backend:** كان يمنع الزوار من عرض الأقسام والمنتجات بسبب قيود الصلاحيات والتوكن (`401 Unauthorized`).
* **قاعدة البيانات:** كانت فارغة تماماً (0 سجلات)، مما سبب انهيار بعض الـ APIs (`400 Bad Request`) وظهور الموقع كصفحة فارغة بدون محتوى.
* **الـ Mobile & Dashboard:** كانت تشير إلى نطاقات متوقفة أو `localhost` غير مهيأ للأجهزة المحمولة.

---

## 2. الواجهة الأمامية (Frontend - Angular Website)

### 2.1. تثبيت الحزم وحل تعارضات الـ Peer Dependencies
* **المشكلة:** مجلد `node_modules` كان مفقوداً، وعند التثبيت التقليدي تفشل العملية بسبب تعارضات بين حزم Angular 18 والمكتبات الخارجية (مثل `@abacritt/angularx-social-login`, `ngx-owl-carousel-o`, إلخ).
* **الحل:** تم التثبيت الناجح عبر تجاوز تعارضات الأقران:
  ```bash
  npm install --legacy-peer-deps
  ```

### 2.2. إعادة توجيه الـ Base URL للـ Local Backend
* **المشكلة:** ملفات البيئة كانت موجهة لرابط خارجي لم يعد يعمل (`http://drgreen-api.runasp.net/`).
* **الملفات المعدلة:**
  * `src/environments/environment.development.ts`
  * `src/environments/environment.ts`
* **التعديل:**
  ```typescript
  export const environment = {
    production: false, // أو true في ملف الإنتاج
    baseURL: 'http://localhost:5200/',
  };
  ```

### 2.3. تشغيل خادم التطوير (Angular Dev Server)
* تم بدء تشغيل خادم التطوير ومراقبة التغييرات (Hot Reload) عبر:
  ```bash
  npm start
  # يعادل: ng serve
  ```
  يعمل الموقع الآن على: `http://localhost:4200/`

---

## 3. الخادم (Backend - .NET 8 WebApi)

### 3.1. إلغاء اشتراط التوكن لقراءة الأقسام العامة (حل خطأ `401 Unauthorized`)
* **المشكلة:** كود الـ Backend يحتوي على سياسة أمان افتراضية صارمة (`FallbackPolicyProvider`) تشترط وجود تسجيل دخول وتوكن (`JWT Bearer Token`) لأي Endpoint لا يحمل تصريحاً صريحاً. بما أن شريط القائمة (Navbar) والفوتر يطلبان الأقسام لجميع الزوار، كان السيرفر يرفض الطلب بـ `401 Unauthorized`.
* **الملف المعدل:** 
  `D:\Haggag\AF.DRGreen.API-master\AF.DRGreen.WebApi2\Controllers\BasicData\CategoryController.cs`
* **التعديل:** إضافة سمة `[AllowAnonymous]` واستدعاء مكتبة `Microsoft.AspNetCore.Authorization` للدوال التالية:
  * `GetAllCategories(PaginationParam paginationParam)`
  * `GetAllCategoryWithProducts(int userId)`
  * `GetAllCategoriesWithoutPagination()`
  * `GetCategoryById(int id)`

### 3.2. إتاحة تفاصيل وقوائم المنتجات للزوار
* **الملف المعدل:** 
  `D:\Haggag\AF.DRGreen.API-master\AF.DRGreen.WebApi2\Controllers\Products\ProductController.cs`
* **التعديل:** إضافة سمة `[AllowAnonymous]` على:
  * `GetProductById(int id)`
  * `GetProductByCategoryId(int categoryId)`
  * `GetProductsByCategoryIds([FromQuery] List<int> categoryIds)`

### 3.3. ضبط منافذ التشغيل ووسائط الإقلاع (Ports & Runtime Arguments)
* **المشكلة:** عند تشغيل الـ `.exe` مباشرة بدون وسائط بيئة، كان ASP.NET Core يعمل في بيئة `Production` الافتراضية ويستمع للمنفذ `5000`، مما يجعله غير متوافق مع منفذ الـ Frontend (5200).
* **الحل:** تم ضبط أمر الإقلاع لتحديد المنفذ والبيئة بشكل صريح:
  ```bash
  AF.DRGreen.WebApi2.exe --urls "http://localhost:5200" --environment "Development"
  ```

---

## 4. قاعدة البيانات (Database & Data Seeding)

### 4.1. حل خطأ `400 Bad Request` لبيانات "من نحن" (LookUps)
* **المشكلة:** دالة `GetByTypeAsync(type)` في الملف:
  `AF.DRGreen.Application\Business\BasicData\LookUpsBusiness.cs` (سطر 83)  
  ترمي استثناء صريحاً `ExceptionCommonReponse(MessageReturn.Common_NotFound, 400)` إذا لم تجد سجلاً لنوع الـ LookUp المطلوب. وعند طلب الموقع للنوع `10` (`AboutUs`) ينهار الطلب بكود 400.
* **الحل:** تم حقن السجلات الأساسية في جدول `dbo.LookUps` في قاعدة البيانات المحلية `AF.DRGreen`:
  * النوع `10` = من نحن (`AboutUs`)
  * النوع `20` = رؤيتنا (`Vision`)
  * النوع `30` = رسالتنا (`Mission`)
  * النوع `40` = قيمنا (`OurValue`)

### 4.2. حقن بيانات تجريبية (Sample Seeding) لعرض محتوى الموقع
* **المشكلة:** قاعدة البيانات كانت تحتوي على 0 أقسام، 0 منتجات، 0 إعلانات، و0 نصائح، مما يجعل جميع مصفوفات الـ API ترجع فارغة `[]`.
* **الحل:** تم تنفيذ استعلامات SQL لإضافة:
  1. **قسم تجريبي (`Categories`):** "مكملات غذائية / Supplements" بحالة `CategoryStatus = 10` (Published).
  2. **منتج تجريبي (`Products`):** "شاي أخضر عضوي / Organic Green Tea" بسعر 100 وحالة `Status = 10` (Published).
  3. **ربط المنتج بالقسم (`ProductCategories`):** ربط المنتج بالقسم رقم 1.
  4. **إعلان تجريبي (`Adses` & `AdsImages`):** لتشغيل السلايدر الرئيسي في الصفحة الأولى.
  5. **نصيحة تجريبية (`Tipses`):** لتشغيل قسم النصائح والتغذية ومنع أخطاء `TypeError` في القوالب.

---

## 5. لوحة التحكم (Admin Dashboard)

* **المشكلة:** لوحة التحكم في `drgreen-dashboard-main` كانت تشير لنفس السيرفر الخارجي القديم المتوقف.
* **الحل:** 
  * توحيد عنوان الـ API في ملف `src/environments/environment.ts` بالداشبورد ليشير إلى:
    ```typescript
    let domain = 'http://localhost:5200/';
    ```
  * تشغيل الداشبورد على منفذها المخصص: `http://localhost:4201/` لعدم التعارض مع الموقع (4200).

---

## 6. تطبيق الموبايل (Mobile App Integration)

لتشغيل تطبيق الموبايل مع الـ Backend المحلي بنجاح، تم اعتماد التالي:
1. **تجنب استخدام `localhost` في كود الموبايل:**
   * داخل محاكي الأندرويد (Android Emulator) أو الهاتف الحقيقي، تعني كلمة `localhost` جهاز الموبايل نفسه وليس الكمبيوتر.
   * **للـ Emulator:** يتم استخدام `http://10.0.2.2:5200/` كـ Base URL.
   * **للهاتف الحقيقي (Wi-Fi):** يتم استخدام عنوان IP الكمبيوتر المحلي:
     ```
     http://192.168.0.25:5200/
     ```
2. **استخدام بروتوكول `HTTP` محلياً:**
   * استخدام HTTP بدلاً من HTTPS لتجنب رفض تطبيق الموبايل لشهادات الـ SSL الذاتية غير المعتمدة (Self-signed certificate errors).

---

## 7. دليل التشغيل والروابط

| الخدمة | التقنية | الرابط المحلي |
| :--- | :--- | :--- |
| **الـ Backend (API)** | .NET 8 WebApi | `http://localhost:5200/` |
| **مستندات الـ API** | Swagger UI | `http://localhost:5200/swagger` |
| **الموقع (Frontend)** | Angular 18 | `http://localhost:4200/` |
| **لوحة التحكم (Dashboard)** | Angular | `http://localhost:4201/` |
| **قاعدة البيانات (Database)** | SQL Server LocalDB | `(localdb)\mssqllocaldb` - DB: `AF.DRGreen` |

### أوامر سريعة للتشغيل مستقبلاً:
```powershell
# 1. تشغيل الـ Backend
cd "D:\Haggag\AF.DRGreen.API-master\AF.DRGreen.WebApi2"
dotnet run --urls "http://localhost:5200"

# 2. تشغيل الموقع
cd "d:\DrGreen_AllData\drGreen-website-main"
npm start

# 3. تشغيل الداشبورد (في نافذة منفصلة)
cd "d:\DrGreen_AllData\drgreen-dashboard-main"
npm start
```
