// بيانات العقارات النموذجية
const SAMPLE_PROPERTIES = [
    {
        id: 1,
        title: "فيلا فاخرة مع مسبح خاص في حي الياسمين",
        type: "villa",
        purpose: "sale",
        price: 3500000,
        area: 450,
        city: "riyadh",
        cityName: "الرياض",
        district: "حي الياسمين",
        rooms: 6,
        bathrooms: 5,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200"
        ],
        description: "فيلا استثنائية بتصميم معماري فريد تجمع بين الفخامة والراحة. تتميز بمسبح خاص وحديقة واسعة، غرف نوم ماستر، صالة استقبال فاخرة، مطبخ مجهز بالكامل، ومواقف سيارات مغطاة. الموقع استراتيجي قريب من جميع الخدمات والمدارس العالمية.",
        phone: "+966595305559",
        owner: "مكتب أضواء الفيصلية",
        featured: true,
        createdAt: "2026-01-15"
    },
    {
        id: 2,
        title: "شقة حديثة مفروشة بالكامل في حي غرناطة",
        type: "apartment",
        purpose: "rent",
        price: 2500,
        priceUnit: "شهرياً",
        area: 150,
        city: "muzahmiya",
        cityName: "المزاحمية",
        district: "حي غرناطة",
        rooms: 3,
        bathrooms: 2,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200"
        ],
        description: "شقة فاخرة مفروشة بالكامل في حي غرناطة الراقي بالمزاحمية. تتميز بتصميم عصري، إضاءة طبيعية، شرفة واسعة، وأجهزة منزلية حديثة. قريبة من الخدمات والمدارس والأسواق. الإيجار شامل الصيانة.",
        phone: "+966509503345",
        owner: "مكتب أضواء الفيصلية",
        featured: true,
        createdAt: "2026-02-10"
    },
    {
        id: 3,
        title: "معرض تجاري في موقع مميز على شارع رئيسي",
        type: "shop",
        purpose: "rent",
        price: 12000,
        priceUnit: "شهرياً",
        area: 250,
        city: "riyadh",
        cityName: "الرياض",
        district: "طريق الملك فهد",
        rooms: 0,
        bathrooms: 1,
        image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200",
            "https://images.unsplash.com/photo-1582539510889-4d5b1c9c9bf0?w=1200",
            "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=1200"
        ],
        description: "معرض تجاري بموقع استراتيجي على شارع الملك فهد، واجهة زجاجية واسعة، مساحة مفتوحة قابلة للتقسيم، مخزن خلفي، ومواقف سيارات. مناسب لجميع الأنشطة التجارية. الإيجار سنوي قابل للتفاوض.",
        phone: "+966595305559",
        owner: "مكتب أضواء الفيصلية",
        featured: true,
        createdAt: "2026-01-28"
    },
    {
        id: 4,
        title: "أرض سكنية بمخطط معتمد في حي النرجس",
        type: "land",
        purpose: "sale",
        price: 1800000,
        area: 600,
        city: "riyadh",
        cityName: "الرياض",
        district: "حي النرجس",
        rooms: 0,
        bathrooms: 0,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200",
            "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=1200"
        ],
        description: "أرض سكنية بمخطط معتمد بالكامل، جميع الخدمات متوفرة (كهرباء، مياه، صرف صحي). على شارعين، مساحة مثالية لبناء فيلا أو عمارة سكنية. موقع هادئ وقريب من المساجد والمدارس.",
        phone: "+966509503345",
        owner: "مكتب أضواء الفيصلية",
        featured: false,
        createdAt: "2026-02-05"
    },
    {
        id: 5,
        title: "فيلا عصرية مع حديقة كبيرة في حي الملقا",
        type: "villa",
        purpose: "sale",
        price: 4200000,
        area: 500,
        city: "riyadh",
        cityName: "الرياض",
        district: "حي الملقا",
        rooms: 7,
        bathrooms: 6,
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
            "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200",
            "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200"
        ],
        description: "فيلا مودرن بتصميم معماري فريد من نوعه. تتكون من دورين plus ملحق خارجي. تتميز بحديقة كبيرة مع نظام ري ذكي، مجلس خارجي، غرفة سائق، صالة ألعاب، وجيم مجهز. التشطيبات من أفخر الخامات الإيطالية.",
        phone: "+966595305559",
        owner: "مكتب أضواء الفيصلية",
        featured: true,
        createdAt: "2026-01-20"
    },
    {
        id: 6,
        title: "شقة دوبلكس راقية في حي الفيصلية",
        type: "apartment",
        purpose: "sale",
        price: 850000,
        area: 200,
        city: "muzahmiya",
        cityName: "المزاحمية",
        district: "حي الفيصلية",
        rooms: 4,
        bathrooms: 3,
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200"
        ],
        description: "شقة دوبلكس فاخرة بتشطيبات راقية في حي الفيصلية بالمزاحمية، تتميز بالاتساع والإضاءة الطبيعية. تتضمن صالة كبيرة، مطبخ مفتوح، غرفة خادمة، وأربع غرف نوم. قريبة من الخدمات والطريق العام.",
        phone: "+966509503345",
        owner: "مكتب أضواء الفيصلية",
        featured: false,
        createdAt: "2026-02-15"
    },
    {
        id: 7,
        title: "محل تجاري على طريق الملك فيصل",
        type: "shop",
        purpose: "rent",
        price: 4000,
        priceUnit: "شهرياً",
        area: 100,
        city: "muzahmiya",
        cityName: "المزاحمية",
        district: "حي غرناطة - طريق الملك فيصل",
        rooms: 0,
        bathrooms: 1,
        image: "https://images.unsplash.com/photo-1582539510889-4d5b1c9c9bf0?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1582539510889-4d5b1c9c9bf0?w=1200",
            "https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=1200",
            "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1200"
        ],
        description: "محل تجاري بموقع مميز على طريق الملك فيصل بحي غرناطة بالمزاحمية، واجهة زجاجية جذابة، مساحة مثالية للأنشطة التجارية المختلفة. الموقع حيوي ومقابل للمحلات والمرافق الخدمية.",
        phone: "+966595305559",
        owner: "مكتب أضواء الفيصلية",
        featured: false,
        createdAt: "2026-02-01"
    },
    {
        id: 8,
        title: "فيلا فاخرة مع مسبح خاص في حي غرناطة",
        type: "villa",
        purpose: "sale",
        price: 2800000,
        area: 600,
        city: "muzahmiya",
        cityName: "المزاحمية",
        district: "حي غرناطة",
        rooms: 7,
        bathrooms: 6,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
            "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200",
            "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200"
        ],
        description: "فيلا استثنائية في حي غرناطة الراقي بالمزاحمية. تصميم معماري فريد يجمع بين الأصالة والحداثة. تتميز بمسبح خاص، حديقة واسعة، مصعد داخلي، جاكوزي، مجلس خارجي فاخر، وغرفة سينما. فرصة نادرة بحي راقي.",
        phone: "+966509503345",
        owner: "مكتب أضواء الفيصلية",
        featured: true,
        createdAt: "2026-01-05"
    },
    {
        id: 9,
        title: "شقة عائلية مريحة في حي السلام",
        type: "apartment",
        purpose: "rent",
        price: 1800,
        priceUnit: "شهرياً",
        area: 120,
        city: "muzahmiya",
        cityName: "المزاحمية",
        district: "حي السلام",
        rooms: 3,
        bathrooms: 2,
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200"
        ],
        description: "شقة عائلية ممتازة بتشطيبات حديثة في حي السلام بالمزاحمية، قريبة من الخدمات والمدارس. تتضمن صالة، مطبخ مجهز، وثلاث غرف نوم. الإيجار شامل مواقف السيارات.",
        phone: "+966595305559",
        owner: "مكتب أضواء الفيصلية",
        featured: false,
        createdAt: "2026-02-20"
    },
    {
        id: 10,
        title: "أرض تجارية على شارعين في حي غرناطة",
        type: "land",
        purpose: "sale",
        price: 1800000,
        area: 900,
        city: "muzahmiya",
        cityName: "المزاحمية",
        district: "حي غرناطة",
        rooms: 0,
        bathrooms: 0,
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200",
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200"
        ],
        description: "أرض تجارية بموقع متميز على شارعين في حي غرناطة بالمزاحمية، مناسبة لمشاريع تجارية وسكنية. جميع الخدمات والبنى التحتية متوفرة. قريبة من طريق الملك فيصل.",
        phone: "+966509503345",
        owner: "مكتب أضواء الفيصلية",
        featured: false,
        createdAt: "2026-01-25"
    },
    {
        id: 11,
        title: "فيلا مودرن مفروشة في حي الروضة",
        type: "villa",
        purpose: "rent",
        price: 8000,
        priceUnit: "شهرياً",
        area: 350,
        city: "muzahmiya",
        cityName: "المزاحمية",
        district: "حي الروضة",
        rooms: 5,
        bathrooms: 4,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
            "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200",
            "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200"
        ],
        description: "فيلا مودرن للإيجار السنوي في حي الروضة بالمزاحمية، مفروشة بالكامل بأفخم الأثاث. تتميز بمسبح خاص، حديقة، مجلس خارجي. قريبة من طريق الملك فيصل والخدمات.",
        phone: "+966595305559",
        owner: "مكتب أضواء الفيصلية",
        featured: false,
        createdAt: "2026-02-08"
    },
    {
        id: 12,
        title: "شقة فاخرة مع خدمات فندقية",
        type: "apartment",
        purpose: "rent",
        price: 6000,
        priceUnit: "شهرياً",
        area: 160,
        city: "riyadh",
        cityName: "الرياض",
        district: "برج المملكة",
        rooms: 2,
        bathrooms: 2,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
        gallery: [
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200"
        ],
        description: "شقة فاخرة مع خدمات فندقية متكاملة، إطلالة خلابة على المدينة، أمن وحراسة 24 ساعة، صالة رياضية، مسبح، ومواقف سيارات. مفروشة بالكامل بأفخم الأثاث.",
        phone: "+966509503345",
        owner: "مكتب أضواء الفيصلية",
        featured: false,
        createdAt: "2026-02-12"
    }
];

// المدن المتاحة
const CITIES = {
    all: "جميع المدن",
    riyadh: "الرياض",
    muzahmiya: "المزاحمية"
};

// أنواع العقارات
const PROPERTY_TYPES = {
    all: "الكل",
    villa: "فيلا",
    apartment: "شقة",
    shop: "معرض تجاري",
    land: "أرض"
};

// أغراض العقارات
const PROPERTY_PURPOSES = {
    all: "الكل",
    sale: "للبيع",
    rent: "للإيجار"
};

// تهيئة البيانات
function initializeProperties() {
    const stored = localStorage.getItem('properties');
    if (!stored) {
        // إضافة status: 'approved' لجميع العقارات النموذجية
        const initial = SAMPLE_PROPERTIES.map(p => ({ ...p, status: 'approved' }));
        localStorage.setItem('properties', JSON.stringify(initial));
    }
}

// الحصول على جميع العقارات
function getAllProperties() {
    initializeProperties();
    const stored = localStorage.getItem('properties');
    return stored ? JSON.parse(stored) : [];
}

// الحصول على العقارات المعتمدة فقط (لعرضها للزوار)
function getApprovedProperties() {
    return getAllProperties().filter(p => p.status === 'approved');
}

// الحصول على عقار بالمعرف
function getPropertyById(id) {
    const properties = getAllProperties();
    return properties.find(p => p.id === parseInt(id));
}

// إضافة عقار جديد (كمعلق - يحتاج موافقة الإدارة)
function addProperty(property) {
    const properties = getAllProperties();
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    property.id = newId;
    property.createdAt = new Date().toISOString().split('T')[0];
    property.status = 'pending'; // العقارات الجديدة تكون معلقة افتراضياً
    properties.push(property);
    localStorage.setItem('properties', JSON.stringify(properties));
    return property;
}

// إضافة عقار معتمد مباشرة (للمشرف)
function addApprovedProperty(property) {
    const properties = getAllProperties();
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    property.id = newId;
    property.createdAt = new Date().toISOString().split('T')[0];
    property.status = 'approved';
    properties.push(property);
    localStorage.setItem('properties', JSON.stringify(properties));
    return property;
}

// تحديث عقار
function updateProperty(id, updates) {
    const properties = getAllProperties();
    const index = properties.findIndex(p => p.id === parseInt(id));
    if (index > -1) {
        properties[index] = { ...properties[index], ...updates };
        localStorage.setItem('properties', JSON.stringify(properties));
        return properties[index];
    }
    return null;
}

// حذف عقار
function deleteProperty(id) {
    const properties = getAllProperties();
    const filtered = properties.filter(p => p.id !== parseInt(id));
    localStorage.setItem('properties', JSON.stringify(filtered));
    return true;
}

// تغيير حالة عقار (موافقة/رفض)
function setPropertyStatus(id, status) {
    return updateProperty(id, { status });
}

// الحصول على طلبات العملاء
function getCustomerRequests() {
    const stored = localStorage.getItem('propertyRequests');
    return stored ? JSON.parse(stored) : [];
}

// تحديث حالة طلب
function updateRequestStatus(id, status) {
    const requests = getCustomerRequests();
    const index = requests.findIndex(r => r.id === parseInt(id));
    if (index > -1) {
        requests[index].status = status;
        localStorage.setItem('propertyRequests', JSON.stringify(requests));
        return requests[index];
    }
    return null;
}

// حذف طلب
function deleteRequest(id) {
    const requests = getCustomerRequests();
    const filtered = requests.filter(r => r.id !== parseInt(id));
    localStorage.setItem('propertyRequests', JSON.stringify(requests));
    return true;
}

// ============================================
// نظام المصادقة (Authentication)
// ============================================

const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

function adminLogin(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const session = {
            username,
            loginTime: new Date().toISOString(),
            token: btoa(`${username}:${Date.now()}`)
        };
        localStorage.setItem('adminSession', JSON.stringify(session));
        return session;
    }
    return null;
}

function adminLogout() {
    localStorage.removeItem('adminSession');
}

function isAdminLoggedIn() {
    const session = JSON.parse(localStorage.getItem('adminSession') || 'null');
    if (!session) return false;
    // الجلسة صالحة لمدة 24 ساعة
    const loginTime = new Date(session.loginTime).getTime();
    const now = Date.now();
    const hoursPassed = (now - loginTime) / (1000 * 60 * 60);
    if (hoursPassed > 24) {
        adminLogout();
        return false;
    }
    return true;
}

function getAdminSession() {
    return JSON.parse(localStorage.getItem('adminSession') || 'null');
}

// تنسيق الأرقام بفواصل الآلاف
function formatNumber(num) {
    return num.toLocaleString('en-US');
}

// الصورة الافتراضية للعقارات التي لا تحتوي على صورة
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800';
const DEFAULT_GALLERY_IMAGE = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200';

// الحصول على الصورة (أو الصورة الافتراضية إذا كانت فارغة)
function getPropertyImage(image) {
    return (image && image.trim()) ? image : DEFAULT_IMAGE;
}

// تنسيق السعر
function formatPrice(price, unit) {
    if (unit === 'شهرياً') {
        return `${formatNumber(price)} <small>ر.س / شهرياً</small>`;
    }
    return `${formatNumber(price)} <small>ر.س</small>`;
}
