// ============================================
// التطبيق الرئيسي - مكتب أضواء الفيصلية للخدمات العقارية
// ============================================

// متغيرات عامة
let allProperties = [];
let filteredProperties = [];
let currentFilters = {
    type: 'all',
    city: 'all',
    purpose: 'all',
    maxPrice: 10000000,
    minArea: 0,
    search: ''
};
let currentSort = 'newest';
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
let currentModalProperty = null;
let currentGalleryIndex = 0;

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    setupForms();
    setupFileUploads();
    setupNavigation();
    setupSearch();
    setupFilters();
    setupModal();
    setupScrollEffects();
    setupAnimations();
    setupCounters();
    setupGallery();
    setupFilterToggle();
    try {
        await loadProperties();
    } catch (err) {
        console.error('خطأ في تحميل العقارات:', err);
    }
}

// ============================================
// تحميل وعرض العقارات
// ============================================
async function loadProperties() {
    allProperties = await getApprovedProperties();
    applyFilters();
}

function renderProperties(properties) {
    const grid = document.getElementById('listingsGrid');
    const noResults = document.getElementById('noResults');
    const countEl = document.getElementById('resultsCount');

    if (!grid) return;

    countEl.textContent = formatNumber(properties.length);

    if (properties.length === 0) {
        grid.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    grid.innerHTML = properties.map(property => createPropertyCard(property)).join('');

    // إضافة مستمعي الأحداث للبطاقات
    document.querySelectorAll('.property-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.property-favorite')) return;
            const id = parseInt(card.dataset.id);
            openPropertyModal(id);
        });
    });

    document.querySelectorAll('.property-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleFavorite(id, btn);
        });
    });
}

function createPropertyCard(property) {
    const isFavorite = favorites.includes(property.id);
    const typeName = PROPERTY_TYPES[property.type] || property.type;
    const purposeText = property.purpose === 'sale' ? 'للبيع' : 'للإيجار';
    const purposeClass = property.purpose === 'sale' ? 'sale' : 'rent';

    return `
        <article class="property-card fade-in" data-id="${property.id}">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'">
                <span class="property-badge ${purposeClass}">${purposeText}</span>
                <span class="property-type-badge">
                    <i class="fas fa-${getPropertyIcon(property.type)}"></i>
                    ${typeName}
                </span>
                <button class="property-favorite ${isFavorite ? 'active' : ''}" data-id="${property.id}" aria-label="إضافة للمفضلة">
                    <i class="fa${isFavorite ? 's' : 'r'} fa-heart"></i>
                </button>
            </div>
            <div class="property-info">
                <h3 class="property-title">${property.title}</h3>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${property.cityName} - ${property.district}</span>
                </div>
                <div class="property-features">
                    <div class="property-feature">
                        <i class="fas fa-ruler-combined"></i>
                        <span>${formatNumber(property.area)} م²</span>
                    </div>
                    ${property.rooms > 0 ? `
                    <div class="property-feature">
                        <i class="fas fa-bed"></i>
                        <span>${property.rooms} غرف</span>
                    </div>
                    ` : ''}
                    ${property.bathrooms > 0 ? `
                    <div class="property-feature">
                        <i class="fas fa-bath"></i>
                        <span>${property.bathrooms} حمام</span>
                    </div>
                    ` : ''}
                </div>
                <div class="property-price-row">
                    <div class="property-price">
                        ${formatNumber(property.price)}
                        <small>ر.س ${property.priceUnit || ''}</small>
                    </div>
                    <span class="property-view-btn">
                        التفاصيل
                        <i class="fas fa-arrow-left"></i>
                    </span>
                </div>
            </div>
        </article>
    `;
}

function getPropertyIcon(type) {
    const icons = {
        villa: 'house',
        apartment: 'building',
        shop: 'store',
        land: 'map'
    };
    return icons[type] || 'home';
}

// ============================================
// نظام الفلترة والبحث
// ============================================
function setupSearch() {
    const searchForm = document.getElementById('searchForm');
    if (!searchForm) return;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(searchForm);
        currentFilters.type = formData.get('type');
        currentFilters.city = formData.get('city');
        currentFilters.purpose = formData.get('purpose');

        // تحديث أزرار التبويب
        document.querySelectorAll('.search-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.purpose === currentFilters.purpose || (tab.dataset.purpose === 'all' && currentFilters.purpose === 'all'));
        });

        // تحديث الفلاتر المرئية
        document.querySelectorAll('#typeChips .chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.type === currentFilters.type);
        });
        document.querySelectorAll('#cityChips .chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.city === currentFilters.city);
        });

        applyFilters();

        // التمرير إلى قسم العقارات
        document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
    });

    // أزرار التبويب في شريط البحث
    document.querySelectorAll('.search-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const purpose = tab.dataset.purpose;
            document.getElementById('searchPurpose').value = purpose;
        });
    });
}

function setupFilters() {
    // شرائح النوع
    document.querySelectorAll('#typeChips .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('#typeChips .chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilters.type = chip.dataset.type;
            applyFilters();
        });
    });

    // شرائح المدينة
    document.querySelectorAll('#cityChips .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('#cityChips .chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilters.city = chip.dataset.city;
            applyFilters();
        });
    });

    // شريط السعر
    const maxPrice = document.getElementById('maxPrice');
    const maxPriceLabel = document.getElementById('maxPriceLabel');
    if (maxPrice) {
        maxPrice.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            currentFilters.maxPrice = value;
            maxPriceLabel.textContent = formatNumber(value);
        });
        maxPrice.addEventListener('change', applyFilters);
    }

    // شريط المساحة
    const minArea = document.getElementById('minArea');
    const minAreaLabel = document.getElementById('minAreaLabel');
    if (minArea) {
        minArea.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            currentFilters.minArea = value;
            minAreaLabel.textContent = formatNumber(value);
        });
        minArea.addEventListener('change', applyFilters);
    }

    // إعادة تعيين
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }

    // الترتيب
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            applyFilters();
        });
    }
}

function setupFilterToggle() {
    const toggle = document.getElementById('filterToggle');
    const content = document.getElementById('filtersContent');
    if (toggle && content) {
        toggle.addEventListener('click', () => {
            content.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        // فتح الفلترة تلقائياً في الشاشات الكبيرة
        if (window.innerWidth > 768) {
            content.classList.add('active');
        }
    }
}

function applyFilters() {
    filteredProperties = allProperties.filter(property => {
        if (currentFilters.type !== 'all' && property.type !== currentFilters.type) return false;
        if (currentFilters.city !== 'all' && property.city !== currentFilters.city) return false;
        if (currentFilters.purpose !== 'all' && property.purpose !== currentFilters.purpose) return false;
        if (property.price > currentFilters.maxPrice) return false;
        if (property.area < currentFilters.minArea) return false;
        if (currentFilters.search) {
            const search = currentFilters.search.toLowerCase();
            const searchable = `${property.title} ${property.cityName} ${property.district} ${property.description}`.toLowerCase();
            if (!searchable.includes(search)) return false;
        }
        return true;
    });

    // تطبيق الترتيب
    sortProperties();

    renderProperties(filteredProperties);
}

function sortProperties() {
    switch (currentSort) {
        case 'price-asc':
            filteredProperties.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProperties.sort((a, b) => b.price - a.price);
            break;
        case 'area-desc':
            filteredProperties.sort((a, b) => b.area - a.area);
            break;
        case 'newest':
        default:
            filteredProperties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
    }
}

function resetFilters() {
    currentFilters = {
        type: 'all',
        city: 'all',
        purpose: 'all',
        maxPrice: 10000000,
        minArea: 0,
        search: ''
    };
    currentSort = 'newest';

    // إعادة تعيين الواجهة
    document.querySelectorAll('#typeChips .chip').forEach(c => c.classList.toggle('active', c.dataset.type === 'all'));
    document.querySelectorAll('#cityChips .chip').forEach(c => c.classList.toggle('active', c.dataset.city === 'all'));
    document.getElementById('maxPrice').value = 10000000;
    document.getElementById('maxPriceLabel').textContent = '10,000,000';
    document.getElementById('minArea').value = 0;
    document.getElementById('minAreaLabel').textContent = '0';
    document.getElementById('sortBy').value = 'newest';
    document.getElementById('searchType').value = 'all';
    document.getElementById('searchCity').value = 'all';
    document.getElementById('searchPurpose').value = 'all';
    document.querySelectorAll('.search-tab').forEach(t => t.classList.toggle('active', t.dataset.purpose === 'all'));

    applyFilters();

    showToast('تم إعادة تعيين الفلاتر', 'تم استعادة الإعدادات الافتراضية', 'success');
}

// ============================================
// نظام المفضلة
// ============================================
function toggleFavorite(id, btn) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
        btn.classList.remove('active');
        btn.querySelector('i').className = 'far fa-heart';
        showToast('تمت الإزالة', 'تم إزالة العقار من المفضلة', 'success');
    } else {
        favorites.push(id);
        btn.classList.add('active');
        btn.querySelector('i').className = 'fas fa-heart';
        showToast('تمت الإضافة', 'تم إضافة العقار إلى المفضلة', 'success');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ============================================
// نافذة تفاصيل العقار
// ============================================
function setupModal() {
    const modal = document.getElementById('propertyModal');
    const closeBtn = document.getElementById('modalClose');

    if (closeBtn) {
        closeBtn.addEventListener('click', closePropertyModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closePropertyModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePropertyModal();
    });
}

async function openPropertyModal(id) {
    const property = await getPropertyById(id);
    if (!property) return;

    currentModalProperty = property;
    currentGalleryIndex = 0;

    const modal = document.getElementById('propertyModal');
    const modalBody = document.getElementById('modalBody');
    const typeName = PROPERTY_TYPES[property.type] || property.type;
    const purposeText = property.purpose === 'sale' ? 'للبيع' : 'للإيجار';
    const purposeClass = property.purpose === 'sale' ? 'sale' : 'rent';
    const phoneClean = property.phone.replace(/[^\d+]/g, '');

    const allImages = [property.image, ...(property.gallery || [])].filter(Boolean);
    const uniqueImages = [...new Set(allImages)];

    modalBody.innerHTML = `
        <div class="property-gallery">
            <div class="gallery-main">
                <img id="mainImage" src="${uniqueImages[0]}" alt="${property.title}">
                ${uniqueImages.length > 1 ? `
                <button class="gallery-nav prev" onclick="changeGalleryImage(-1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <button class="gallery-nav next" onclick="changeGalleryImage(1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                ` : ''}
            </div>
            ${uniqueImages.length > 1 ? `
            <div class="gallery-thumbs" id="galleryThumbs">
                ${uniqueImages.map((img, idx) => `
                    <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" onclick="selectGalleryImage(${idx})">
                        <img src="${img}" alt="صورة ${idx + 1}">
                    </div>
                `).join('')}
            </div>
            ` : ''}
        </div>
        <div class="property-details">
            <div class="property-details-header">
                <h2 class="property-details-title">${property.title}</h2>
                <div class="property-details-badges">
                    <span class="detail-badge ${purposeClass}">${purposeText}</span>
                    <span class="detail-badge type">${typeName}</span>
                </div>
            </div>

            <div class="property-details-price">
                <div class="label">${property.purpose === 'rent' ? 'الإيجار الشهري' : 'السعر الإجمالي'}</div>
                <div class="price">${formatNumber(property.price)} <span style="font-size: 1rem; color: var(--gray-600);">ر.س</span></div>
            </div>

            <div class="property-details-info">
                <div class="info-box">
                    <i class="fas fa-ruler-combined"></i>
                    <div class="info-label">المساحة</div>
                    <div class="info-value">${formatNumber(property.area)} م²</div>
                </div>
                <div class="info-box">
                    <i class="fas fa-map-marker-alt"></i>
                    <div class="info-label">الموقع</div>
                    <div class="info-value">${property.cityName}</div>
                </div>
                <div class="info-box">
                    <i class="fas fa-map-pin"></i>
                    <div class="info-label">الحي</div>
                    <div class="info-value">${property.district}</div>
                </div>
                <div class="info-box">
                    <i class="fas fa-${property.type === 'land' ? 'map' : 'home'}"></i>
                    <div class="info-label">النوع</div>
                    <div class="info-value">${typeName}</div>
                </div>
                ${property.rooms > 0 ? `
                <div class="info-box">
                    <i class="fas fa-bed"></i>
                    <div class="info-label">الغرف</div>
                    <div class="info-value">${property.rooms} غرف</div>
                </div>
                ` : ''}
                ${property.bathrooms > 0 ? `
                <div class="info-box">
                    <i class="fas fa-bath"></i>
                    <div class="info-label">دورات المياه</div>
                    <div class="info-value">${property.bathrooms} حمام</div>
                </div>
                ` : ''}
            </div>

            <div class="property-details-description">
                <h3><i class="fas fa-align-right"></i> وصف العقار</h3>
                <p>${property.description}</p>
            </div>

            <div class="property-contact">
                <a href="https://wa.me/${phoneClean.replace('+', '')}?text=${encodeURIComponent('مرحباً، أرغب بالاستفسار عن العقار: ' + property.title)}" target="_blank" class="contact-btn whatsapp">
                    <i class="fab fa-whatsapp"></i>
                    تواصل عبر الواتساب
                </a>
                <a href="tel:${phoneClean}" class="contact-btn phone">
                    <i class="fas fa-phone"></i>
                    اتصال هاتفي
                </a>
            </div>
        </div>
    `;

    // تخزين الصور للاستخدام في المعرض
    modalBody.dataset.images = JSON.stringify(uniqueImages);
    modalBody.dataset.title = property.title;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modal.querySelector('.modal-content').scrollTop = 0;
    }, 100);
}

function closePropertyModal() {
    const modal = document.getElementById('propertyModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    currentModalProperty = null;
}

function changeGalleryImage(direction) {
    const modalBody = document.getElementById('modalBody');
    const images = JSON.parse(modalBody.dataset.images || '[]');
    if (images.length === 0) return;

    currentGalleryIndex = (currentGalleryIndex + direction + images.length) % images.length;
    updateGalleryImage(images);
}

function selectGalleryImage(index) {
    const modalBody = document.getElementById('modalBody');
    const images = JSON.parse(modalBody.dataset.images || '[]');
    if (index < 0 || index >= images.length) return;

    currentGalleryIndex = index;
    updateGalleryImage(images);
}

function updateGalleryImage(images) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
            mainImage.src = images[currentGalleryIndex];
            mainImage.style.opacity = '1';
        }, 200);
    }

    document.querySelectorAll('.gallery-thumb').forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === currentGalleryIndex);
    });
}

function setupGallery() {
    // التنقل بلوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('propertyModal');
        if (!modal || !modal.classList.contains('active')) return;

        if (e.key === 'ArrowLeft') changeGalleryImage(1);
        if (e.key === 'ArrowRight') changeGalleryImage(-1);
    });
}

// ============================================
// النماذج
// ============================================
function setupForms() {
    // نموذج إضافة عقار
    const addForm = document.getElementById('addPropertyForm');
    if (addForm) {
        addForm.addEventListener('submit', handleAddProperty);
    }

    // نموذج اطلب عقارك
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        requestForm.addEventListener('submit', handleRequestProperty);
    }

    // نموذج النشرة البريدية
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('تم الاشتراك', 'شكراً لاشتراكك في نشرتنا البريدية', 'success');
            newsletterForm.reset();
        });
    }
}

async function handleAddProperty(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // التحقق من الحقول المطلوبة
    const title = formData.get('title');
    const type = formData.get('type');
    const purpose = formData.get('purpose');
    const price = parseInt(formData.get('price'));
    const area = parseInt(formData.get('area'));
    const city = formData.get('city');
    const district = formData.get('district');
    const phone = formData.get('phone');
    const description = formData.get('description');

    if (!title || !type || !purpose || !price || !area || !city || !district || !phone || !description) {
        showToast('خطأ', 'يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    // الحصول على الصورة الرئيسية من الحقل المخفي
    const imageData = form.querySelector('#mainImageData').value;
    const image = imageData || DEFAULT_IMAGE;

    // الحصول على صور المعرض من الحقل المخفي
    const galleryData = form.querySelector('#galleryImageData').value;
    let gallery = [];
    if (galleryData) {
        try {
            gallery = JSON.parse(galleryData);
        } catch (e) {
            gallery = [];
        }
    }

    const newProperty = {
        title: title,
        type: type,
        purpose: purpose,
        price: price,
        area: area,
        city: city,
        cityName: CITIES[city] || 'الرياض',
        district: district,
        rooms: parseInt(formData.get('rooms')) || 0,
        bathrooms: parseInt(formData.get('bathrooms')) || 0,
        image: getPropertyImage(image),
        gallery: gallery.length > 0 ? gallery : [image || DEFAULT_IMAGE],
        description: description,
        phone: phone,
        owner: formData.get('owner') || 'مستخدم',
        priceUnit: purpose === 'rent' ? 'شهرياً' : ''
    };

    await addProperty(newProperty);

    showToast('تم استلام طلبك', 'سيتم مراجعة العقار من قبل الإدارة ونشره قريباً', 'success');
    e.target.reset();
    // إعادة تعيين معاينات الصور
    resetImageUploads('mainImageUpload');
    resetImageUploads('galleryImageUpload');

    setTimeout(() => {
        document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

async function handleRequestProperty(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const request = {
        id: Date.now(),
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        type: formData.get('type'),
        purpose: formData.get('purpose'),
        location: formData.get('location'),
        budget: formData.get('budget'),
        details: formData.get('details'),
        status: 'new',
        createdAt: new Date().toISOString()
    };

    try {
        const localData = JSON.parse(localStorage.getItem('propertyRequests') || '[]');
        localData.push(request);
        localStorage.setItem('propertyRequests', JSON.stringify(localData));
        saveToCloud('requests', localData).catch(() => {});
        showToast('تم إرسال طلبك', 'سنتواصل معك في أقرب وقت ممكن (' + localData.length + ' طلبات محفوظة)', 'success');
        e.target.reset();
    } catch (err) {
        showToast('خطأ', 'حدث خطأ أثناء إرسال الطلب: ' + err.message, 'error');
    }
}

// ============================================
// رفع الملفات (الصور)
// ============================================
function setupFileUploads() {
    // الصورة الرئيسية في نموذج إضافة عقار
    setupSingleFileUpload('mainImageInput', 'mainImageData', 'mainImageUpload');

    // صور المعرض في نموذج إضافة عقار
    setupGalleryFileUpload('galleryImageInput', 'galleryImageData', 'galleryImageUpload');
}

// رفع صورة واحدة
function setupSingleFileUpload(inputId, hiddenId, wrapperId) {
    const input = document.getElementById(inputId);
    const wrapper = document.getElementById(wrapperId);
    if (!input || !wrapper) return;

    // البحث عن الحقل المخفي - إما بـ ID أو داخل الـwrapper
    const hidden = hiddenId ? document.getElementById(hiddenId) : wrapper.querySelector('input[type="hidden"]');
    if (!hidden) return;

    const dropArea = wrapper.querySelector('.file-upload-area');
    const preview = wrapper.querySelector('.file-preview');
    const previewImg = preview.querySelector('img');
    const fileName = preview.querySelector('.file-preview-name');
    const fileMeta = preview.querySelector('.file-preview-meta');
    const removeBtn = preview.querySelector('.file-remove-btn');

    // النقر على منطقة الرفع
    dropArea.addEventListener('click', () => input.click());

    // Drag and drop
    ['dragenter', 'dragover'].forEach(evt => {
        dropArea.addEventListener(evt, (e) => {
            e.preventDefault();
            dropArea.classList.add('dragging');
        });
    });
    ['dragleave', 'drop'].forEach(evt => {
        dropArea.addEventListener(evt, (e) => {
            e.preventDefault();
            dropArea.classList.remove('dragging');
        });
    });
    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            input.files = files;
            input.dispatchEvent(new Event('change'));
        }
    });

    // معالجة اختيار الملف
    input.addEventListener('change', async () => {
        const file = input.files[0];
        if (!file) return;

        // إظهار loading
        dropArea.classList.add('loading');

        // إضافة شريط تقدم
        let progressContainer = dropArea.querySelector('.upload-progress');
        if (!progressContainer) {
            progressContainer = document.createElement('div');
            progressContainer.className = 'upload-progress';
            progressContainer.innerHTML = '<div class="upload-progress-bar"></div><div class="upload-progress-text">0%</div>';
            dropArea.appendChild(progressContainer);
        }
        const progressBar = progressContainer.querySelector('.upload-progress-bar');
        const progressText = progressContainer.querySelector('.upload-progress-text');
        progressContainer.style.display = 'block';
        progressBar.style.width = '0%';
        progressText.textContent = '0%';

        const onProgress = (percent) => {
            progressBar.style.width = percent + '%';
            progressText.textContent = percent + '%';
        };

        const result = await processImageUpload(file, onProgress);
        dropArea.classList.remove('loading');
        progressContainer.style.display = 'none';

        if (!result.success) {
            showToast('خطأ في الصورة', result.error, 'error');
            input.value = '';
            return;
        }

        // الحصول على URL النهائي (سحابي أو محلي)
        const finalUrl = result.storage === 'cloud' ? result.url : result.dataUrl;
        const storageBadge = result.storage === 'cloud' ? '☁️ سحابي' : '💾 محلي';

        // عرض المعاينة
        previewImg.src = finalUrl;
        fileName.textContent = file.name;
        const metaText = `${result.width || '?'}×${result.height || '?'} • ${formatFileSize(file.size)} • ${storageBadge}`;
        fileMeta.textContent = metaText;
        dropArea.style.display = 'none';
        preview.style.display = 'flex';

        // حفظ البيانات في الحقل المخفي
        hidden.value = finalUrl;

        // تنبيه في حالة التحذير
        if (result.warning) {
            showToast('تنبيه', result.warning, 'warning');
        }
    });

    // زر الحذف
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetImageUploads(wrapperId);
    });
}

// رفع عدة صور (المعرض)
function setupGalleryFileUpload(inputId, hiddenId, wrapperId) {
    const input = document.getElementById(inputId);
    const wrapper = document.getElementById(wrapperId);
    if (!input || !wrapper) return;

    // البحث عن الحقل المخفي - إما بـ ID أو داخل الـwrapper
    const hidden = hiddenId ? document.getElementById(hiddenId) : wrapper.querySelector('input[type="hidden"]');
    if (!hidden) return;

    const dropArea = wrapper.querySelector('.file-upload-area');
    const previewContainer = wrapper.querySelector('.gallery-preview');
    let galleryData = [];

    dropArea.addEventListener('click', () => input.click());

    // Drag and drop
    ['dragenter', 'dragover'].forEach(evt => {
        dropArea.addEventListener(evt, (e) => {
            e.preventDefault();
            dropArea.classList.add('dragging');
        });
    });
    ['dragleave', 'drop'].forEach(evt => {
        dropArea.addEventListener(evt, (e) => {
            e.preventDefault();
            dropArea.classList.remove('dragging');
        });
    });
    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }
    });

    input.addEventListener('change', async () => {
        if (input.files.length > 0) {
            await handleFiles(input.files);
        }
    });

    async function handleFiles(files) {
        dropArea.classList.add('loading');
        for (const file of files) {
            const result = await processImageUpload(file);
            if (result.success) {
                const finalUrl = result.storage === 'cloud' ? result.url : result.dataUrl;
                galleryData.push(finalUrl);
                addGalleryThumb(finalUrl, galleryData.length - 1);
                if (result.warning) {
                    showToast('تنبيه', `${file.name}: ${result.warning}`, 'warning');
                }
            } else {
                showToast('خطأ', `${file.name}: ${result.error}`, 'error');
            }
        }
        dropArea.classList.remove('loading');
        hidden.value = JSON.stringify(galleryData);
        input.value = '';
    }

    function addGalleryThumb(dataUrl, index) {
        const thumb = document.createElement('div');
        thumb.className = 'gallery-thumb';
        thumb.innerHTML = `
            <img src="${dataUrl}" alt="صورة ${index + 1}">
            <button type="button" class="gallery-thumb-remove" data-index="${index}"><i class="fas fa-times"></i></button>
        `;
        previewContainer.appendChild(thumb);
        thumb.querySelector('.gallery-thumb-remove').addEventListener('click', () => {
            galleryData.splice(index, 1);
            thumb.remove();
            // إعادة تحديث الفهارس
            previewContainer.querySelectorAll('.gallery-thumb').forEach((t, i) => {
                t.querySelector('.gallery-thumb-remove').dataset.index = i;
            });
            hidden.value = JSON.stringify(galleryData);
        });
    }
}

// إعادة تعيين منطقة رفع
function resetImageUploads(wrapperId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;
    const input = wrapper.querySelector('.file-input');
    const dropArea = wrapper.querySelector('.file-upload-area');
    const preview = wrapper.querySelector('.file-preview');
    const galleryPreview = wrapper.querySelector('.gallery-preview');
    const hidden = wrapper.querySelector('input[type="hidden"]');

    if (input) input.value = '';
    if (dropArea) dropArea.style.display = '';
    if (preview) preview.style.display = 'none';
    if (galleryPreview) galleryPreview.innerHTML = '';
    if (hidden) hidden.value = '';
}

// ============================================
// التنقل
// ============================================
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // تحديث الرابط النشط عند التمرير
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ============================================
// تأثيرات التمرير
// ============================================
function setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
    });

    if (scrollTop) {
        scrollTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // اختصارات لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        // Ctrl+Alt+A لفتح لوحة التحكم
        if (e.ctrlKey && e.altKey && e.key === 'a') {
            e.preventDefault();
            window.location.href = 'admin.html';
        }
    });
}

// ============================================
// عدادات الإحصائيات
// ============================================
function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        element.textContent = formatNumber(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = formatNumber(target);
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// الرسوم المتحركة
// ============================================
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .contact-item, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// نظام الإشعارات (Toasts)
// ============================================
function showToast(title, message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const iconMap = {
        success: 'fa-check',
        error: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${iconMap[type]}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlide 0.3s reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ============================================
// البحث الذكي - Google Custom Search + داخلي
// ============================================

// 1) عند تحميل الصفحة: التحقق من URL params
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
        const input = document.getElementById('searchInput');
        if (input) {
            input.value = q;
            currentFilters.search = q;
            applyFilters();
        }
    }
});

// 2) فتح/إغلاق شريط البحث الذكي
function toggleQuickSearch() {
    const box = document.getElementById('quickSearchBox');
    if (box) box.classList.toggle('open');
}

// 3) بحث Google مخصص - يفتح modal بنتائج
async function handleGoogleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('googleCSEQuery').value.trim();
    if (!query) return false;

    // تحديث URL (مهم لـ SEO)
    const url = new URL(window.location);
    url.searchParams.set('q', query);
    window.history.pushState({}, '', url);

    // عرض شاشة التحميل
    const modal = document.getElementById('googleSearchResults');
    const titleEl = document.getElementById('searchResultsTitle');
    const queryEl = document.getElementById('searchResultsQuery');
    const contentEl = document.getElementById('searchResultsContent');
    const fullLink = document.getElementById('googleFullSearchLink');

    titleEl.textContent = '🔍 جاري البحث...';
    queryEl.textContent = `البحث عن: "${query}"`;
    contentEl.innerHTML = '<div style="text-align:center; padding:40px;"><div class="loader"></div><p style="color:#666; margin-top:16px;">يبحث في موقعنا...</p></div>';
    modal.style.display = 'block';
    fullLink.href = `https://www.google.com/search?q=${encodeURIComponent(query + ' site:Mutakola123.github.io/adwa')}`;

    // البحث الداخلي أولاً
    const localResults = searchLocalProperties(query);

    setTimeout(() => {
        if (localResults.length > 0) {
            contentEl.innerHTML = renderLocalResults(localResults, query);
        } else {
            contentEl.innerHTML = `
                <div style="text-align:center; padding:40px 20px;">
                    <div style="font-size:3rem; margin-bottom:16px;">🤷‍♂️</div>
                    <h3 style="color:#1e3a8a; margin:0 0 12px;">لا توجد نتائج في موقعنا</h3>
                    <p style="color:#666; margin:0 0 24px;">جرّب البحث في Google الكامل عن "${escapeHtml(query)}"</p>
                    <a href="https://www.google.com/search?q=${encodeURIComponent(query + ' site:Mutakola123.github.io/adwa')}" target="_blank" rel="noopener" style="display:inline-block; background:#4285f4; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:700;">🔍 بحث في Google الكامل</a>
                </div>
            `;
        }
    }, 500);

    return false;
}

// 4) بحث محلي في العقارات
function searchLocalProperties(query) {
    if (!allProperties || allProperties.length === 0) return [];
    const q = query.toLowerCase();
    const keywords = q.split(/\s+/).filter(k => k.length > 0);

    return allProperties.filter(p => {
        const haystack = [
            p.title, p.description, p.type, p.city, p.neighborhood,
            p.address, p.features ? p.features.join(' ') : '',
            p.price ? p.price.toString() : ''
        ].join(' ').toLowerCase();

        return keywords.every(keyword => haystack.includes(keyword));
    });
}

// 5) عرض النتائج المحلية
function renderLocalResults(results, query) {
    const html = results.map(p => `
        <div class="search-result-item" style="background:#f9f6f0; border-radius:12px; padding:20px; margin-bottom:12px; border-right:4px solid #fbbf24;">
            <h3 style="color:#1e3a8a; margin:0 0 8px; font-size:1.15rem;">
                <a href="#listings" onclick="openProperty(${p.id})" style="color:inherit; text-decoration:none;">${highlightText(p.title, query)}</a>
            </h3>
            <div style="color:#666; font-size:0.9rem; margin-bottom:8px;">
                📍 ${highlightText(p.neighborhood + ' - ' + p.city, query)}
            </div>
            <p style="color:#555; line-height:1.6; margin:8px 0; font-size:0.95rem;">${highlightText((p.description || '').substring(0, 150), query)}${p.description && p.description.length > 150 ? '...' : ''}</p>
            <div style="display:flex; gap:16px; margin-top:12px; flex-wrap:wrap; color:#1e3a8a; font-weight:700;">
                <span>💰 ${formatPrice(p.price)}</span>
                <span>📐 ${p.area} م²</span>
                <span>🏠 ${getTypeLabel(p.type)}</span>
            </div>
        </div>
    `).join('');

    return `
        <div style="background:#e8f5e9; color:#1b5e20; padding:12px 16px; border-radius:8px; margin-bottom:16px; font-size:0.95rem;">
            ✅ وُجد ${results.length} ${results.length === 1 ? 'نتيجة' : 'نتائج'} في موقعنا
        </div>
        ${html}
    `;
}

// 6) إبراز كلمات البحث في النص
function highlightText(text, query) {
    if (!text) return '';
    const keywords = query.split(/\s+/).filter(k => k.length > 2);
    let result = escapeHtml(text);
    keywords.forEach(kw => {
        const regex = new RegExp('(' + escapeRegex(kw) + ')', 'gi');
        result = result.replace(regex, '<mark style="background:#fef3c7; padding:2px 4px; border-radius:3px;">$1</mark>');
    });
    return result;
}

function escapeHtml(text) {
    const map = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'};
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 7) دوال مساعدة
function formatPrice(price) {
    if (!price) return 'السعر عند الطلب';
    return new Intl.NumberFormat('ar-SA').format(price) + ' ريال';
}

function getTypeLabel(type) {
    const labels = {
        'villa': 'فيلا',
        'apartment': 'شقة',
        'land': 'أرض',
        'commercial': 'تجاري',
        'building': 'عمارة',
        'farm': 'مزرعة',
        'shop': 'محل',
        'office': 'مكتب'
    };
    return labels[type] || type;
}

function openProperty(id) {
    document.getElementById('googleSearchResults').style.display = 'none';
    setTimeout(() => {
        const property = allProperties.find(p => p.id === id);
        if (property) {
            showPropertyDetails(id);
            document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
        }
    }, 300);
}

// 8) اختصارات لوحة المفاتيح للبحث
document.addEventListener('keydown', (e) => {
    // Ctrl+K أو / لفتح البحث
    if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName))) {
        e.preventDefault();
        const input = document.getElementById('googleCSEQuery');
        if (input) {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => input.focus(), 300);
        }
    }
    // Escape لإغلاق النتائج
    if (e.key === 'Escape') {
        const modal = document.getElementById('googleSearchResults');
        if (modal) modal.style.display = 'none';
    }
});

// 9) عرض الـFAQ details بأيقونة دوّارة
document.addEventListener('toggle', (e) => {
    if (e.target.classList && e.target.classList.contains('faq-item')) {
        const icon = e.target.querySelector('.faq-icon');
        if (icon) {
            icon.textContent = e.target.open ? '−' : '+';
            icon.style.transform = e.target.open ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    }
}, true);
