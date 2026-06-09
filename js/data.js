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

// ============================================
// إعدادات التخزين السحابي (GitHub Repository API)
// ============================================
// البيانات تُحفظ مباشرة في ملفات JSON في الخزانة
// التوكن يُحفظ في localStorage فقط (لا يُرفع على GitHub)
const CLOUD_CONFIG = {
    enabled: true,
    githubToken: localStorage.getItem('githubToken') || '',
    repo: 'Mutakola123/adwa',
    branch: 'main',
    sha_properties: '',
    sha_requests: ''
};

// حفظ توكن GitHub (من لوحة التحكم فقط)
function setGitHubToken(token) {
    CLOUD_CONFIG.githubToken = token;
    localStorage.setItem('githubToken', token);
}

// تحميل التوكن المحفوظ
function loadGitHubToken() {
    const stored = localStorage.getItem('githubToken');
    if (stored) CLOUD_CONFIG.githubToken = stored;
}
loadGitHubToken();

// حفظ بيانات في GitHub Repository
async function saveToCloud(key, data) {
    if (!CLOUD_CONFIG.enabled || !CLOUD_CONFIG.githubToken) return false;
    try {
        const filename = `${key}.json`;
        const shaKey = `sha_${key}`;
        const sha = CLOUD_CONFIG[shaKey] || '';
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));

        const body = {
            message: `Update ${filename} - ${new Date().toISOString()}`,
            content: content,
            branch: CLOUD_CONFIG.branch
        };
        if (sha) body.sha = sha;

        const res = await fetch(
            `https://api.github.com/repos/${CLOUD_CONFIG.repo}/contents/data/${filename}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${CLOUD_CONFIG.githubToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );

        if (res.ok) {
            const result = await res.json();
            CLOUD_CONFIG[shaKey] = result.content.sha;
            return true;
        }
        return false;
    } catch (err) {
        console.error('خطأ في الحفظ السحابي:', err);
        return false;
    }
}

// جلب بيانات من GitHub Repository
async function loadFromCloud(key) {
    if (!CLOUD_CONFIG.enabled || !CLOUD_CONFIG.githubToken) return null;
    try {
        const filename = `${key}.json`;
        const res = await fetch(
            `https://api.github.com/repos/${CLOUD_CONFIG.repo}/contents/data/${filename}?t=${Date.now()}`,
            {
                headers: {
                    'Authorization': `token ${CLOUD_CONFIG.githubToken}`,
                    'Cache-Control': 'no-cache'
                }
            }
        );
        if (!res.ok) return null;
        const fileData = await res.json();
        CLOUD_CONFIG[`sha_${key}`] = fileData.sha;
        const content = decodeURIComponent(escape(atob(fileData.content)));
        return JSON.parse(content);
    } catch (err) {
        console.error('خطأ في الجلب السحابي:', err);
        return null;
    }
}

// تحميل الإعدادات السحابية من localStorage
function loadCloudConfig() {
    const stored = localStorage.getItem('cloudConfig');
    if (stored) {
        const config = JSON.parse(stored);
        Object.assign(CLOUD_CONFIG, config);
    }
}
loadCloudConfig();

// حفظ الإعدادات السحابية
function saveCloudConfig(config) {
    Object.assign(CLOUD_CONFIG, config);
    localStorage.setItem('cloudConfig', JSON.stringify(CLOUD_CONFIG));
}

// ============================================
// إدارة العقارات (محلي + سحابي)
// ============================================

let _propertiesSynced = false;
let _requestsSynced = false;

// مزامنة من السحابة
async function syncFromCloud() {
    try {
        const cloudProps = await loadFromCloud('properties');
        if (cloudProps && Array.isArray(cloudProps)) {
            localStorage.setItem('properties', JSON.stringify(cloudProps));
        }
        const cloudReqs = await loadFromCloud('requests');
        if (cloudReqs && Array.isArray(cloudReqs)) {
            localStorage.setItem('propertyRequests', JSON.stringify(cloudReqs));
        }
    } catch (err) {
        console.warn('تعذر المزامنة السحابية:', err);
    }
}

// تهيئة البيانات
async function initializeProperties() {
    if (!_propertiesSynced) {
        await syncFromCloud();
        _propertiesSynced = true;
    }
    const stored = localStorage.getItem('properties');
    if (!stored) {
        const initial = SAMPLE_PROPERTIES.map(p => ({ ...p, status: 'approved' }));
        localStorage.setItem('properties', JSON.stringify(initial));
        await saveToCloud('properties', initial);
    }
}

// الحصول على جميع العقارات
async function getAllProperties() {
    await initializeProperties();
    const stored = localStorage.getItem('properties');
    return stored ? JSON.parse(stored) : [];
}

// الحصول على العقارات المعتمدة فقط (لعرضها للزوار)
async function getApprovedProperties() {
    const all = await getAllProperties();
    return all.filter(p => p.status === 'approved');
}

// الحصول على عقار بالمعرف
async function getPropertyById(id) {
    const properties = await getAllProperties();
    return properties.find(p => p.id === parseInt(id));
}

// إضافة عقار جديد (كمعلق - يحتاج موافقة الإدارة)
async function addProperty(property) {
    const properties = await getAllProperties();
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    property.id = newId;
    property.createdAt = new Date().toISOString().split('T')[0];
    property.status = 'pending';
    properties.push(property);
    localStorage.setItem('properties', JSON.stringify(properties));
    // حفظ في السحابة أيضاً
    await saveToCloud('properties', properties);
    return property;
}

// إضافة عقار معتمد مباشرة (للمشرف)
async function addApprovedProperty(property) {
    const properties = await getAllProperties();
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    property.id = newId;
    property.createdAt = new Date().toISOString().split('T')[0];
    property.status = 'approved';
    properties.push(property);
    localStorage.setItem('properties', JSON.stringify(properties));
    await saveToCloud('properties', properties);
    return property;
}

// تحديث عقار
async function updateProperty(id, updates) {
    const properties = await getAllProperties();
    const index = properties.findIndex(p => p.id === parseInt(id));
    if (index > -1) {
        properties[index] = { ...properties[index], ...updates };
        localStorage.setItem('properties', JSON.stringify(properties));
        await saveToCloud('properties', properties);
        return properties[index];
    }
    return null;
}

// حذف عقار
async function deleteProperty(id) {
    const properties = await getAllProperties();
    const filtered = properties.filter(p => p.id !== parseInt(id));
    localStorage.setItem('properties', JSON.stringify(filtered));
    await saveToCloud('properties', filtered);
    return true;
}

// تغيير حالة عقار (موافقة/رفض)
async function setPropertyStatus(id, status) {
    return await updateProperty(id, { status });
}

// ============================================
// إدارة طلبات العملاء (محلي + سحابي)
// ============================================

// الحصول على طلبات العملاء
async function getCustomerRequests() {
    if (!_requestsSynced) {
        const cloudReqs = await loadFromCloud('requests');
        if (cloudReqs && Array.isArray(cloudReqs)) {
            localStorage.setItem('propertyRequests', JSON.stringify(cloudReqs));
        }
        _requestsSynced = true;
    }
    const stored = localStorage.getItem('propertyRequests');
    return stored ? JSON.parse(stored) : [];
}

// تحديث حالة طلب
async function updateRequestStatus(id, status) {
    const requests = await getCustomerRequests();
    const index = requests.findIndex(r => r.id === parseInt(id));
    if (index > -1) {
        requests[index].status = status;
        localStorage.setItem('propertyRequests', JSON.stringify(requests));
        await saveToCloud('requests', requests);
        return requests[index];
    }
    return null;
}

// حذف طلب
async function deleteRequest(id) {
    const requests = await getCustomerRequests();
    const filtered = requests.filter(r => r.id !== parseInt(id));
    localStorage.setItem('propertyRequests', JSON.stringify(filtered));
    await saveToCloud('requests', filtered);
    return true;
}

// ============================================
// نظام المصادقة الآمن (Secure Authentication)
// ============================================

const SECURITY_CONFIG = {
    PBKDF2_ITERATIONS: 100000,    // عدد دورات التشفير
    KEY_LENGTH: 256,               // طول المفتاح بالبت
    HASH_ALGO: 'SHA-256',
    MAX_LOGIN_ATTEMPTS: 5,        // عدد المحاولات قبل القفل
    LOCKOUT_DURATION: 15 * 60,    // مدة القفل (15 دقيقة بالثواني)
    SESSION_DURATION: 30 * 60,    // مدة الجلسة (30 دقيقة بالثواني)
    INACTIVITY_TIMEOUT: 30 * 60,  // مهلة الخمول
};

// توليد نص عشوائي آمن
function generateRandomString(length = 32) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

// توليد Salt عشوائي
function generateSalt(length = 16) {
    return generateRandomString(length);
}

// تشفير كلمة المرور باستخدام PBKDF2
async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
    );
    const derivedBits = await crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: encoder.encode(salt),
            iterations: SECURITY_CONFIG.PBKDF2_ITERATIONS,
            hash: SECURITY_CONFIG.HASH_ALGO
        },
        keyMaterial,
        SECURITY_CONFIG.KEY_LENGTH
    );
    return Array.from(new Uint8Array(derivedBits), b => b.toString(16).padStart(2, '0')).join('');
}

// مقارنة آمنة لكلمات المرور
async function verifyPassword(password, salt, hash) {
    if (hash && hash.startsWith('FALLBACK_')) {
        const fallbackPassword = hash.replace('FALLBACK_', '');
        return password === fallbackPassword;
    }
    const computedHash = await hashPassword(password, salt);
    return computedHash === hash;
}

// الحصول على قائمة المشرفين (متزامن)
function getAdmins() {
    const stored = localStorage.getItem('adminAccounts');
    return stored ? JSON.parse(stored) : [];
}

// التحقق من توفر crypto.subtle
function isSecureContextAvailable() {
    return typeof crypto !== 'undefined' && typeof crypto.subtle !== 'undefined';
}

// تهيئة النظام الأمني - يجب استدعاؤها عند تحميل الصفحة
async function initializeSecurity() {
    const admins = getAdmins();
    if (admins.length === 0) {
        if (isSecureContextAvailable()) {
            await initializeDefaultAdmin();
        } else {
            console.warn('crypto.subtle غير متاح - سيتم استخدام تشفير بديل');
            const defaultAdmin = {
                username: 'admin',
                salt: 'fallback_salt',
                hash: 'FALLBACK_admin123',
                role: 'superadmin',
                createdAt: new Date().toISOString(),
                lastPasswordChange: new Date().toISOString(),
                mustChangePassword: true
            };
            localStorage.setItem('adminAccounts', JSON.stringify([defaultAdmin]));
        }
    } else {
        // التحقق من ترقية المشرفين القدامى (إن وجدوا)
        let needsUpdate = false;
        for (const admin of admins) {
            if (admin.hash === 'LEGACY_PLAIN' || admin._legacy) {
                // إعادة تشفير كلمة المرور القديمة 'admin123' بشكل آمن
                const salt = generateSalt();
                const hash = await hashPassword('admin123', salt);
                admin.salt = salt;
                admin.hash = hash;
                admin.mustChangePassword = true;
                delete admin._legacy;
                delete admin._legacyPassword;
                needsUpdate = true;
            }
        }
        if (needsUpdate) {
            localStorage.setItem('adminAccounts', JSON.stringify(admins));
        }
    }
}

// تهيئة المشرف الافتراضي (مرة واحدة فقط)
async function initializeDefaultAdmin() {
    const salt = generateSalt();
    const defaultPassword = 'admin123'; // كلمة المرور الافتراضية
    const hash = await hashPassword(defaultPassword, salt);
    const defaultAdmin = {
        username: 'admin',
        salt: salt,
        hash: hash,
        role: 'superadmin',
        createdAt: new Date().toISOString(),
        lastPasswordChange: new Date().toISOString(),
        mustChangePassword: true  // إجبار تغيير كلمة المرور
    };
    localStorage.setItem('adminAccounts', JSON.stringify([defaultAdmin]));
}

// الحصول على محاولات الدخول الفاشلة
function getLoginAttempts() {
    return JSON.parse(localStorage.getItem('loginAttempts') || '{"count": 0, "lastAttempt": null, "lockedUntil": null}');
}

// حفظ محاولات الدخول
function saveLoginAttempts(attempts) {
    localStorage.setItem('loginAttempts', JSON.stringify(attempts));
}

// التحقق من حالة القفل
function isAccountLocked() {
    const attempts = getLoginAttempts();
    if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
        const remaining = Math.ceil((attempts.lockedUntil - Date.now()) / 1000 / 60);
        return { locked: true, remainingMinutes: remaining };
    }
    // مسح بيانات القفل المنتهية
    if (attempts.lockedUntil && Date.now() >= attempts.lockedUntil) {
        attempts.lockedUntil = null;
        attempts.count = 0;
        saveLoginAttempts(attempts);
    }
    return { locked: false };
}

// تسجيل محاولة فاشلة
function recordFailedAttempt() {
    const attempts = getLoginAttempts();
    attempts.count++;
    attempts.lastAttempt = new Date().toISOString();

    if (attempts.count >= SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS) {
        attempts.lockedUntil = Date.now() + (SECURITY_CONFIG.LOCKOUT_DURATION * 1000);
        attempts.count = 0;
    }
    saveLoginAttempts(attempts);
    return attempts;
}

// مسح المحاولات الفاشلة عند نجاح تسجيل الدخول
function clearLoginAttempts() {
    localStorage.removeItem('loginAttempts');
}

// الحصول على سجل محاولات الدخول
function getLoginLog() {
    return JSON.parse(localStorage.getItem('loginLog') || '[]');
}

// إضافة محاولة إلى السجل
function addToLoginLog(username, success) {
    const log = getLoginLog();
    log.unshift({
        username,
        success,
        timestamp: new Date().toISOString(),
        ip: 'local'  // لا يمكن الحصول على IP حقيقي client-side
    });
    // الاحتفاظ بآخر 50 محاولة فقط
    if (log.length > 50) log.pop();
    localStorage.setItem('loginLog', JSON.stringify(log));
}

// تسجيل دخول المشرف
async function adminLogin(username, password) {
    // التحقق من حالة القفل
    const lockStatus = isAccountLocked();
    if (lockStatus.locked) {
        return {
            success: false,
            locked: true,
            message: `الحساب مقفل. حاول بعد ${lockStatus.remainingMinutes} دقيقة`
        };
    }

    const admins = getAdmins();
    const admin = admins.find(a => a.username === username);

    if (!admin) {
        recordFailedAttempt();
        addToLoginLog(username, false);
        return { success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' };
    }

    const isValid = await verifyPassword(password, admin.salt, admin.hash);

    if (!isValid) {
        const attempts = recordFailedAttempt();
        addToLoginLog(username, false);

        const remaining = SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS - attempts.count;
        if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
            return {
                success: false,
                locked: true,
                message: 'تم قفل الحساب لمدة 15 دقيقة بعد محاولات فاشلة متكررة'
            };
        }
        return {
            success: false,
            message: `بيانات الدخول غير صحيحة. تبقى ${remaining} محاولة`
        };
    }

    // نجح تسجيل الدخول
    clearLoginAttempts();
    addToLoginLog(username, true);

    // توليد token جلسة آمن
    const sessionToken = generateRandomString(64);
    const session = {
        username: admin.username,
        role: admin.role,
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        token: sessionToken,
        mustChangePassword: admin.mustChangePassword || false
    };
    localStorage.setItem('adminSession', JSON.stringify(session));
    return { success: true, session };
}

// تحديث نشاط المستخدم
function updateActivity() {
    const session = JSON.parse(localStorage.getItem('adminSession') || 'null');
    if (session) {
        session.lastActivity = new Date().toISOString();
        localStorage.setItem('adminSession', JSON.stringify(session));
    }
}

// تسجيل الخروج
function adminLogout() {
    const session = getAdminSession();
    if (session) {
        addToLoginLog(session.username, 'logout');
    }
    localStorage.removeItem('adminSession');
}

// التحقق من حالة تسجيل الدخول
function isAdminLoggedIn() {
    const session = JSON.parse(localStorage.getItem('adminSession') || 'null');
    if (!session || !session.token) return false;

    // التحقق من انتهاء الجلسة
    const lastActivity = new Date(session.lastActivity || session.loginTime).getTime();
    const now = Date.now();
    const inactiveSeconds = (now - lastActivity) / 1000;

    if (inactiveSeconds > SECURITY_CONFIG.INACTIVITY_TIMEOUT) {
        adminLogout();
        return false;
    }
    return true;
}

// الحصول على جلسة المشرف
function getAdminSession() {
    return JSON.parse(localStorage.getItem('adminSession') || 'null');
}

// تغيير كلمة المرور
async function changePassword(username, oldPassword, newPassword) {
    const admins = getAdmins();
    const index = admins.findIndex(a => a.username === username);

    if (index === -1) {
        return { success: false, message: 'المستخدم غير موجود' };
    }

    const admin = admins[index];
    const isValid = await verifyPassword(oldPassword, admin.salt, admin.hash);

    if (!isValid) {
        return { success: false, message: 'كلمة المرور الحالية غير صحيحة' };
    }

    if (newPassword.length < 8) {
        return { success: false, message: 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل' };
    }

    // توليد salt جديد وhash كلمة المرور الجديدة
    if (isSecureContextAvailable()) {
        const newSalt = generateSalt();
        const newHash = await hashPassword(newPassword, newSalt);
        admins[index].salt = newSalt;
        admins[index].hash = newHash;
    } else {
        admins[index].salt = 'fallback_salt';
        admins[index].hash = 'FALLBACK_' + newPassword;
    }
    admins[index].lastPasswordChange = new Date().toISOString();
    admins[index].mustChangePassword = false;

    localStorage.setItem('adminAccounts', JSON.stringify(admins));

    // تحديث الجلسة
    const session = getAdminSession();
    if (session) {
        session.mustChangePassword = false;
        localStorage.setItem('adminSession', JSON.stringify(session));
    }

    return { success: true, message: 'تم تغيير كلمة المرور بنجاح' };
}

// إضافة مشرف جديد
async function addAdmin(username, password, role = 'admin') {
    const admins = getAdmins();
    if (admins.find(a => a.username === username)) {
        return { success: false, message: 'اسم المستخدم موجود بالفعل' };
    }
    if (password.length < 8) {
        return { success: false, message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' };
    }

    const salt = generateSalt();
    const hash = await hashPassword(password, salt);
    admins.push({
        username,
        salt,
        hash,
        role,
        createdAt: new Date().toISOString(),
        lastPasswordChange: new Date().toISOString(),
        mustChangePassword: false
    });
    localStorage.setItem('adminAccounts', JSON.stringify(admins));
    return { success: true, message: 'تمت إضافة المشرف بنجاح' };
}

// حذف مشرف
function removeAdmin(username) {
    const admins = getAdmins();
    // لا يمكن حذف المشرف الأخير
    if (admins.length <= 1) {
        return { success: false, message: 'لا يمكن حذف آخر مشرف' };
    }
    // لا يمكن حذف superadmin الوحيد
    const superadmins = admins.filter(a => a.role === 'superadmin');
    const adminToRemove = admins.find(a => a.username === username);
    if (adminToRemove && adminToRemove.role === 'superadmin' && superadmins.length <= 1) {
        return { success: false, message: 'لا يمكن حذف آخر مدير عام' };
    }
    const filtered = admins.filter(a => a.username !== username);
    localStorage.setItem('adminAccounts', JSON.stringify(filtered));
    return { success: true, message: 'تم حذف المشرف' };
}

// تنسيق الأرقام بفواصل الآلاف
function formatNumber(num) {
    return num.toLocaleString('en-US');
}

// الصورة الافتراضية للعقارات التي لا تحتوي على صورة
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800';
const DEFAULT_GALLERY_IMAGE = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200';

// إعدادات معالجة الصور المرفوعة
const IMAGE_CONFIG = {
    MAX_FILE_SIZE: 5 * 1024 * 1024,    // 5 ميجابايت كحد أقصى
    MAX_WIDTH: 1200,                    // أقصى عرض للضغط
    MAX_HEIGHT: 1200,                   // أقصى ارتفاع للضغط
    JPEG_QUALITY: 0.85,                 // جودة الضغط (0-1)
    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
};

// ============================================
// التخزين السحابي (Cloudinary)
// ============================================
const CLOUDINARY_CONFIG_KEY = 'cloudinaryConfig';

// الحصول على إعدادات Cloudinary
function getCloudinaryConfig() {
    const stored = localStorage.getItem(CLOUDINARY_CONFIG_KEY);
    if (!stored) return null;
    try {
        return JSON.parse(stored);
    } catch (e) {
        return null;
    }
}

// حفظ إعدادات Cloudinary
function setCloudinaryConfig(config) {
    if (!config || !config.cloudName || !config.uploadPreset) {
        localStorage.removeItem(CLOUDINARY_CONFIG_KEY);
        return false;
    }
    localStorage.setItem(CLOUDINARY_CONFIG_KEY, JSON.stringify(config));
    return true;
}

// التحقق من تفعيل التخزين السحابي
function isCloudStorageEnabled() {
    const config = getCloudinaryConfig();
    return !!(config && config.cloudName && config.uploadPreset);
}

// رفع صورة إلى Cloudinary
async function uploadToCloudinary(file, onProgress) {
    const config = getCloudinaryConfig();
    if (!config) {
        return { success: false, error: 'التخزين السحابي غير مفعّل' };
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', config.uploadPreset);

    // إعدادات إضافية للتحسين التلقائي
    if (config.folder) formData.append('folder', config.folder);

    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable && onProgress) {
                const percent = Math.round((e.loaded / e.total) * 100);
                onProgress(percent);
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve({
                        success: true,
                        url: response.secure_url,
                        publicId: response.public_id,
                        width: response.width,
                        height: response.height,
                        bytes: response.bytes,
                        format: response.format
                    });
                } catch (e) {
                    resolve({ success: false, error: 'فشل في معالجة استجابة الخادم' });
                }
            } else {
                try {
                    const error = JSON.parse(xhr.responseText);
                    resolve({
                        success: false,
                        error: error.error?.message || `فشل الرفع (${xhr.status})`
                    });
                } catch (e) {
                    resolve({ success: false, error: `فشل الرفع (${xhr.status})` });
                }
            }
        });

        xhr.addEventListener('error', () => {
            resolve({ success: false, error: 'فشل الاتصال بالخادم' });
        });

        xhr.addEventListener('abort', () => {
            resolve({ success: false, error: 'تم إلغاء الرفع' });
        });

        const url = `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`;
        xhr.open('POST', url);
        xhr.send(formData);
    });
}

// معالجة الصورة - رفع سحابي أو محلي
async function processImageUpload(file, onProgress) {
    // التحقق من صحة الملف
    const validation = validateImageFile(file);
    if (!validation.valid) {
        return { success: false, error: validation.error, storage: 'none' };
    }

    // إذا كان التخزين السحابي مفعّل
    if (isCloudStorageEnabled()) {
        if (onProgress) onProgress(0);

        // ضغط الصورة أولاً
        const compressed = await compressImage(file);
        if (!compressed.success) {
            return { success: false, error: compressed.error, storage: 'local' };
        }

        // تحويل data URL إلى Blob للرفع
        const blob = await (await fetch(compressed.dataUrl)).blob();

        // رفع إلى Cloudinary
        const uploadResult = await uploadToCloudinary(blob, onProgress);
        if (uploadResult.success) {
            return {
                success: true,
                storage: 'cloud',
                url: uploadResult.url,
                publicId: uploadResult.publicId,
                width: uploadResult.width,
                height: uploadResult.height,
                bytes: uploadResult.bytes,
                originalSize: file.size
            };
        } else {
            // fallback إلى التخزين المحلي عند فشل السحابة
            return {
                success: true,
                storage: 'local',
                dataUrl: compressed.dataUrl,
                warning: 'فشل الرفع السحابي، تم الحفظ محلياً',
                originalSize: file.size
            };
        }
    } else {
        // تخزين محلي فقط
        const compressed = await compressImage(file);
        if (!compressed.success) {
            return { success: false, error: compressed.error, storage: 'none' };
        }
        return {
            success: true,
            storage: 'local',
            dataUrl: compressed.dataUrl,
            originalSize: file.size
        };
    }
}

// الحصول على الصورة (أو الصورة الافتراضية إذا كانت فارغة)
function getPropertyImage(image) {
    return (image && image.trim()) ? image : DEFAULT_IMAGE;
}

// التحقق من صحة ملف الصورة
function validateImageFile(file) {
    if (!file) return { valid: false, error: 'لم يتم اختيار ملف' };
    if (!IMAGE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
        return { valid: false, error: 'نوع الملف غير مدعوم. استخدم JPG أو PNG أو WebP' };
    }
    if (file.size > IMAGE_CONFIG.MAX_FILE_SIZE) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(1);
        return { valid: false, error: `حجم الملف كبير (${sizeMB} ميجابايت). الحد الأقصى 5 ميجابايت` };
    }
    return { valid: true };
}

// تحويل ملف الصورة إلى base64
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => reject(new Error('فشل في قراءة الملف'));
        reader.readAsDataURL(file);
    });
}

// تحميل صورة من data URL
function loadImage(dataUrl) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('فشل في تحميل الصورة'));
        img.src = dataUrl;
    });
}

// ضغط الصورة باستخدام Canvas
async function compressImage(file) {
    try {
        // التحقق من صحة الملف
        const validation = validateImageFile(file);
        if (!validation.valid) {
            throw new Error(validation.error);
        }

        // تحويل إلى base64
        const dataUrl = await readFileAsDataURL(file);

        // تحميل الصورة
        const img = await loadImage(dataUrl);

        // حساب الأبعاد الجديدة مع الحفاظ على النسبة
        let width = img.width;
        let height = img.height;

        if (width > IMAGE_CONFIG.MAX_WIDTH || height > IMAGE_CONFIG.MAX_HEIGHT) {
            const ratio = Math.min(
                IMAGE_CONFIG.MAX_WIDTH / width,
                IMAGE_CONFIG.MAX_HEIGHT / height
            );
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
        }

        // رسم الصورة على Canvas بالأبعاد الجديدة
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // خلفية بيضاء للصور الشفافة (PNG → JPEG)
        if (file.type === 'image/png' || file.type === 'image/webp') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // تحويل Canvas إلى JPEG مضغوط
        const compressedDataUrl = canvas.toDataURL('image/jpeg', IMAGE_CONFIG.JPEG_QUALITY);

        // حساب نسبة الضغط
        const originalSize = dataUrl.length;
        const compressedSize = compressedDataUrl.length;
        const ratio = Math.round((1 - compressedSize / originalSize) * 100);

        return {
            success: true,
            dataUrl: compressedDataUrl,
            originalSize: file.size,
            compressedSize: compressedSize,
            width: width,
            height: height,
            compressionRatio: ratio
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
}

// تنسيق حجم الملف للعرض
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

// تنسيق السعر
function formatPrice(price, unit) {
    if (unit === 'شهرياً') {
        return `${formatNumber(price)} <small>ر.س / شهرياً</small>`;
    }
    return `${formatNumber(price)} <small>ر.س</small>`;
}
