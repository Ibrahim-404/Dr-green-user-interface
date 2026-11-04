# 📋 سجل تاسكات الإصلاح والتشغيل (Project Tasks & Tickets Log)
**المشروع:** Dr. Green Ecosystem (Backend, Frontend, Database, Dashboard, Mobile)  
**الحالة:** مكتملة (Done ✅)

---

## 📌 جدول ملخص التاسكات (Sprint Summary)

| كود التاسك (Task ID) | الجزء (Module) | النوع (Type) | عنوان التاسك (Task Title) | الحالة |
| :--- | :--- | :--- | :--- | :--- |
| **`TASK-FE-01`** | Frontend (Web) | Bug Fix / Setup | تثبيت الحزم وحل تعارضات الـ Peer Dependencies | Done ✅ |
| **`TASK-FE-02`** | Frontend (Web) | Configuration | تحديث الـ Base URL للربط بالـ Local Backend | Done ✅ |
| **`TASK-FE-03`** | Frontend (Web) | Deployment | تشغيل ومراقبة خادم التطوير (Angular Dev Server) | Done ✅ |
| **`TASK-BE-01`** | Backend (.NET) | Bug Fix / Security | فك حظر الصلاحيات عن الأقسام العامة (401 Unauthorized) | Done ✅ |
| **`TASK-BE-02`** | Backend (.NET) | Bug Fix / Security | إتاحة تفاصيل وقوائم المنتجات للزوار بدون توكن | Done ✅ |
| **`TASK-BE-03`** | Backend (.NET) | Configuration | ضبط منافذ الاستماع والبيئة (Port 5200 & Dev Env) | Done ✅ |
| **`TASK-DB-01`** | Database / Backend | Bug Fix | حل انهيار الـ API لصفحة من نحن (400 Bad Request) | Done ✅ |
| **`TASK-DB-02`** | Database | Data Seeding | حقن بيانات تجريبية نشطة لملء الموقع (Categories & Products) | Done ✅ |
| **`TASK-DB-03`** | Database | Data Seeding | حقن وسائط وسلايدر الهوم والنصائح (Ads & Tips Seeding) | Done ✅ |
| **`TASK-DASH-01`** | Dashboard | Configuration | توجيه لوحة التحكم للسيرفر المحلي وفصل المنفذ (Port 4201) | Done ✅ |
| **`TASK-MOB-01`** | Mobile App | Configuration | ضبط إعدادات الشبكة والـ IP لتطبيق الموبايل والـ Emulators | Done ✅ |

---

## 🛠️ تفاصيل التاسكات (Detailed Task Specifications)

### 🔹 [TASK-FE-01] تثبيت الحزم وحل تعارضات الـ Peer Dependencies
* **الجزء المسؤول:** Frontend (Website - Angular 18)
* **المشكلة:** مجلد `node_modules` لم يكن موجوداً، وعند محاولة التثبيت العادية يفشل الأمر بسبب تعارض إصدارات مكتبات `@abacritt/angularx-social-login` و `ngx-owl-carousel-o` مع إصدار Angular الحديث.
* **ما تم تنفيذه:**
  * تشغيل أمر التثبيت مع تجاهل تعارض الأقران:
    ```bash
    npm install --legacy-peer-deps
    ```
* **معايير الاكتمال (Acceptance Criteria):**
  * بناء مجلد `node_modules` بالكامل بنجاح بدون أخطاء `ERESOLVE`.

---

### 🔹 [TASK-FE-02] تحديث الـ Base URL للربط بالـ Local Backend
* **الجزء المسؤول:** Frontend (Website)
* **المشكلة:** الموقع كان يرسل جميع طلبات الـ HTTP إلى رابط استضافة قديم غير موجود (`http://drgreen-api.runasp.net/`).
* **الملفات المعدلة:**
  * `src/environments/environment.ts`
  * `src/environments/environment.development.ts`
* **ما تم تنفيذه:**
  * تعديل متغير `baseURL` ليشير إلى السيرفر المحلي:
    ```typescript
    export const environment = {
      production: false,
      baseURL: 'http://localhost:5200/',
    };
    ```
* **معايير الاكتمال (Acceptance Criteria):**
  * جميع نداءات الـ Services مثل `AuthService`, `PagesService`, `SharedService` تتوجه إلى المنفذ `5200`.

---

### 🔹 [TASK-FE-03] تشغيل ومراقبة خادم التطوير (Angular Dev Server)
* **الجزء المسؤول:** Frontend (Website)
* **ما تم تنفيذه:**
  * تشغيل الخادم في بيئة التطوير مع التحديث التلقائي (Hot-Reload) عبر:
    ```bash
    npm start
    ```
* **معايير الاكتمال (Acceptance Criteria):**
  * استجابة الموقع بنجاح على الرابط: `http://localhost:4200/` بكود `200 OK`.

---

### 🔹 [TASK-BE-01] فك حظر الصلاحيات عن الأقسام العامة (401 Unauthorized)
* **الجزء المسؤول:** Backend (.NET 8 WebApi)
* **المشكلة:** عند زيارة الصفحة الرئيسية يتم طلب قائمة الأقسام عبر `api/Category/GetAllCategories`، فيقوم السيرفر بالرد بـ `401 Unauthorized` بسبب سياسة `FallbackPolicyProvider` التي تطلب JWT Token إجبارياً لكل endpoint.
* **الملف المعدل:**
  * `AF.DRGreen.WebApi2\Controllers\BasicData\CategoryController.cs`
* **ما تم تنفيذه:**
  * استدعاء `using Microsoft.AspNetCore.Authorization;`.
  * إضافة سمة `[AllowAnonymous]` فوق الدوال التالية:
    * `[HttpPost("GetAllCategories")]`
    * `[HttpGet("GetAllCategoryWithProducts/{userId}")]`
    * `[HttpGet("GetAllCategoriesWithoutPagination")]`
    * `[HttpGet("GetCategoryById/{id}")]`
* **معايير الاكتمال (Acceptance Criteria):**
  * تجربة استدعاء `POST /api/Category/GetAllCategories` بدون Bearer Token ويعيد `200 OK`.

---

### 🔹 [TASK-BE-02] إتاحة تفاصيل وقوائم المنتجات للزوار بدون توكن
* **الجزء المسؤول:** Backend (.NET 8 WebApi)
* **المشكلة:** دوال تفاصيل المنتجات وفلاتر الأقسام كانت محمية وتمنع زوار المتجر غير المسجلين من تصفح تفاصيل أي منتج.
* **الملف المعدل:**
  * `AF.DRGreen.WebApi2\Controllers\Products\ProductController.cs`
* **ما تم تنفيذه:**
  * إضافة سمة `[AllowAnonymous]` للدوال:
    * `GetProductById(int id)`
    * `GetProductByCategoryId(int categoryId)`
    * `GetProductsByCategoryIds([FromQuery] List<int> categoryIds)`
* **معايير الاكتمال (Acceptance Criteria):**
  * إمكانية فتح صفحة تفاصيل أي منتج للزائر بدون تسجيل دخول.

---

### 🔹 [TASK-BE-03] ضبط منافذ الاستماع والبيئة (Port 5200 & Dev Env)
* **الجزء المسؤول:** Backend (.NET 8 WebApi)
* **المشكلة:** عند تشغيل ملف الـ `.exe` في الخلفية كان يبدأ ببيئة `Production` الافتراضية على منفذ `5000`، فيتوقف الموقع عن الاتصال به.
* **ما تم تنفيذه:**
  * ضبط وسائط التشغيل الإجبارية:
    ```bash
    AF.DRGreen.WebApi2.exe --urls "http://localhost:5200" --environment "Development"
    ```
* **معايير الاكتمال (Acceptance Criteria):**
  * عمل Swagger UI على: `http://localhost:5200/swagger`.
  * استجابة جميع طلبات الـ HTTP من المنفذ `5200`.

---

### 🔹 [TASK-DB-01] حل انهيار الـ API لصفحة من نحن (400 Bad Request)
* **الجزء المسؤول:** Database & Backend
* **المشكلة:** استدعاء `GET /api/LookUps/GetLookUpByStatus?type=10` كان يرمي خطأ `400 Bad Request (NotFound)` لأن كود `LookUpsBusiness.cs` يرمي استثناء في حال عدم وجود سجل لنوع الـ LookUp في الجدول.
* **ما تم تنفيذه:**
  * حقن السجلات الأساسية داخل جدول `dbo.LookUps` في قاعدة البيانات المحلية `AF.DRGreen`:
    * Type 10: "من نحن" (`About Us`)
    * Type 20: "رؤيتنا" (`Vision`)
    * Type 30: "رسالتنا" (`Mission`)
    * Type 40: "قيمنا" (`Our Values`)
* **معايير الاكتمال (Acceptance Criteria):**
  * استجابة الـ API بـ `200 OK` وإرجاع بيانات "من نحن" في الهوم وصفحة About.

---

### 🔹 [TASK-DB-02] حقن بيانات تجريبية نشطة لملء الموقع (Categories & Products)
* **الجزء المسؤول:** Database (SQL Server LocalDB)
* **المشكلة:** جداول الأقسام والمنتجات كانت فارغة (0 سجلات)، مما جعل الموقع يظهر فارغاً بدون عناصر.
* **ما تم تنفيذه:**
  * إدخال قسم تجريبي نشط:
    * `NameAr`: "مكملات غذائية"، `NameEn`: "Supplements"، `CategoryStatus = 10` (Published).
  * إدخال منتج تجريبي نشط:
    * `NameAr`: "شاي أخضر عضوي"، `NameEn`: "Organic Green Tea"، `Price`: 120، `ActualPrice`: 100، `Status = 10` (Published).
  * ربط المنتج بالقسم في جدول `dbo.ProductCategories`.
* **معايير الاكتمال (Acceptance Criteria):**
  * ظهور القسم في الـ Navbar والـ Footer.
  * ظهور المنتج في قسم الأكثر مبيعاً (Bestsellers) وصفحة المنتجات.

---

### 🔹 [TASK-DB-03] حقن وسائط وسلايدر الهوم والنصائح (Ads & Tips Seeding)
* **الجزء المسؤول:** Database (SQL Server LocalDB)
* **المشكلة:** سلايدر الإعلانات كان يختفي، وصفحة النصائح كانت تنهار بـ `TypeError: undefined (reading 'id')` بسبب فراغ المصفوفة.
* **ما تم تنفيذه:**
  * إضافة إعلان في `dbo.Adses` وصورة مرتبطة في `dbo.AdsImages`.
  * إضافة نصيحة غذائية في `dbo.Tipses` بحالة منشورة (`Status = 10`).
* **معايير الاكتمال (Acceptance Criteria):**
  * ظهور السلايدر الرئيسي في الصفحة الأولى.
  * فتح صفحة النصائح `tips` بنجاح دون أي خطأ في الكونسول.

---

### 🔹 [TASK-DASH-01] توجيه لوحة التحكم للسيرفر المحلي وفصل المنفذ
* **الجزء المسؤول:** Admin Dashboard
* **المشكلة:** لوحة التحكم في `drgreen-dashboard-main` كانت موجهة لنفس السيرفر الخارجي القديم.
* **ما تم تنفيذه:**
  * توجيه متغير الـ `domain` في `src/environments/environment.ts` بالداشبورد إلى:
    ```typescript
    let domain = 'http://localhost:5200/';
    ```
  * تشغيلها على منفذ منفصل `http://localhost:4201/` لتجنب التضارب مع موقع الويب (4200).
* **معايير الاكتمال (Acceptance Criteria):**
  * عمل الداشبورد محلياً وقدرتها على إدارة بيانات الـ Local Backend.

---

### 🔹 [TASK-MOB-01] ضبط إعدادات الشبكة والـ IP لتطبيق الموبايل
* **الجزء المسؤول:** Mobile App (Flutter / React Native / Android)
* **المشكلة:** تطبيق الموبايل يفشل في الاتصال بـ `localhost` لأن `localhost` في جهاز الهاتف تشير إلى الهاتف نفسه، كما يفشل مع الـ HTTPS المحلي بسبب شهادات SSL الذاتية.
* **ما تم تنفيذه:**
  * اعتماد عنوان الـ IP الفعلي للجهاز في إعدادات التطبيق:
    * للأجهزة الحقيقية عبر الواي فاي: `http://192.168.0.25:5200/api/`
    * لمُحاكي أندرويد (Android Emulator): `http://10.0.2.2:5200/api/`
  * استخدام بروتوكول `HTTP` محلياً لتجاوز مشاكل فحص الشهادات.
* **معايير الاكتمال (Acceptance Criteria):**
  * استجابة الـ Endpoints بنجاح من داخل تطبيق الموبايل.
