# خطة تحسين SEO - مكتب أضواء الفيصلية

---

## ✅ ما تم إنجازه (موجود حالياً)

| العنصر | الحالة |
|---|---|
| Meta Description | ✅ مكتوب بالعربي |
| Meta Keywords | ✅ موجود |
| Open Graph Tags | ✅ موجود |
| Twitter Cards | ✅ موجود |
| Schema.org | ✅ 6 أنواع (RealEstateAgent, Organization, LocalBusiness, BreadcrumbList, WebSite, FAQPage, Speakable) |
| Canonical URL | ✅ موجود |
| robots.txt | ✅ موجود |
| sitemap.xml | ✅ موجود |
| Google Verification | ✅ موجود |
| Mobile Responsive | ✅ موجود |
| RTL Support | ✅ موجود |

---

## 🔧 التحسينات المطلوبة فوراً

### 1. إنشاء صورة OG مخصصة (مهم جداً!)
الـ `og:image` الحالي هو شعار SVG، لكن Google يحتاج صورة PNG/JPG بحجم 1200x630 بكسل.

**الحل:** أنشئ صورة PNG للشعار بأحجام مختلفة:

### 2. إنشاء ملف `browserconfig.xml` (لـ Bing)
```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
    <msapplication>
        <tile>
            <square150x150logo src="images/logo-icon.svg"/>
            <TileColor>#d4af37</TileColor>
        </tile>
    </msapplication>
</browserconfig>
```

### 3. إضافة `hreflang` tags
```html
<link rel="alternate" hreflang="ar" href="https://Mutakola123.github.io/adwa/" />
<link rel="alternate" hreflang="en" href="https://Mutakola123.github.io/adwa/?lang=en" />
```

### 4. تحسين السرعة (Page Speed)
- ✅ الخطوط محسّنة بـ `preconnect`
- ✅ CSS في ملف منفصل
- ✅ JS في ملفات منفصلة
- ⚠️ يمكن تحسين حجم الصور

### 5. إضافة `manifest.json` (للجوال)
```json
{
    "name": "مكتب أضواء الفيصلية للخدمات العقارية",
    "short_name": "أضواء الفيصلية",
    "start_url": "https://Mutakola123.github.io/adwa/",
    "display": "standalone",
    "background_color": "#1a1a2e",
    "theme_color": "#d4af37",
    "icons": [
        {"src": "images/logo-icon.svg", "sizes": "any", "type": "image/svg+xml"}
    ]
}
```

---

## 📊 خطة التسويق الرقمي

### المرحلة الأولى: الأسبوع 1-2 (تأسيس)
| المهمة | التفاصيل |
|---|---|
| إنشاء Google Business Profile | https://business.google.com |
| تسجيل الموقع في Google Search Console | https://search.google.com/search-console |
| تسجيل الموقع في Bing Webmaster | https://www.bing.com/webmasters |
| إنشاء حسابات سوشيال ميديا | تويتر، إنستقرام، سناب، تيك توك |

### المرحلة الثانية: الأسبوع 3-4 (محتوى)
| المهمة | التفاصيل |
|---|---|
| نشر محتوى يومي | منشور واحد يومياً على الأقل |
| إنشاء صور احترافية | لجميع العقارات |
| كتابة مقالات قصيرة | نصائح عقارية |

### المرحلة الثالثة: الشهر 2 (توسع)
| المهمة | التفاصيل |
|---|---|
| شراكات مع مدونين | مدونين محليين في المزاحمية |
| إعلانات مدفوعة | Google Ads + تويتر |
| بناء قوائم بريدية | جمع إيميلات العملاء |

---

## 🔑 الكلمات المفتاحية المستهدفة

### كلمات أساسية (Volume عالي):
```
عقارات المزاحمية
عقارات الرياض
فيلا للبيع المزاحمية
شقة للإيجار المزاحمية
مكتب عقاري المزاحمية
أرض للبيع المزاحمية
```

### كلمات ذيل طويل (Volume منخفض - تنافس أقل):
```
فيلا 5 غرف حي الياسمين الرياض
شقة مفروشة حي غرناطة المزاحمية
استراحة للإيجار المزاحمية
استشارة عقارية مجانية المزاحمية
شراء عقار في المزاحمية
أفضل مكتب عقاري في المزاحمية
```

### كلمات خدماتية:
```
استشارة عقارية مجانية
تقييم عقار
إبرام عقود عقارية
إدارة أملاك
بيع عقار بسرعة
شراء عقار بدون دفعة أولى
```

---

## 📱 خطط النشر على السوشيال ميديا

### تويتر (3-5 منشورات يومياً):
- صباحاً: إحصائية أو نصيحة
- ظهراً: عرض عقار
- مساءً: سؤال تفاعلي

### إنستقرام (1-2 منشور + 3-5 ستوريز):
- بوست: صورة احترافية + وصف طويل
- ريلز: فيديو قصير للعقار
- ستوري: نصائح يومية

### سناب شات (2-3 قصص):
- ستوري واحدة صباحاً
- ستوري بالعقار
- ستوري تفاعلية (استطلاع)

### تيك توك (1-2 فيديو يومياً):
- فيديو عقاري قصير
- نصائح عقارية سريعة

---

## 📈 قياس النتائج

### مؤشرات الأداء الرئيسية:
| المؤشر | الهدف الشهري |
|---|---|
| زيارات الموقع | +1000 |
| مكالمات هاتفية | +50 |
| رسائل واتساب | +100 |
| حسابات سوشيال ميديا | +500 متابع |
| ظهور في Google | الصفحة الأولى لـ 5 كلمات |

### أدوات التتبع:
- Google Analytics: تتبع الزيارات
- Google Search Console: تتبع الظهور
- Bitly: تتبع الروابط
- Spreadsheet: تسجيل المكالمات

---

## 🔗 روابط مفيدة

| الرابط | الغرض |
|---|---|
| https://search.google.com/search-console | Google Search Console |
| https://analytics.google.com | Google Analytics |
| https://business.google.com | Google Business Profile |
| https://www.bing.com/webmasters | Bing Webmaster |
| https://search.google.com/test/rich-results | فحص Schema |
| https://pagespeed.web.dev | فحص سرعة الموقع |
