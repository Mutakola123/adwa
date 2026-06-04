// ============================================
// لوحة التحكم - مكتب أضواء الفيصلية
// ============================================

let currentView = 'dashboard';
let confirmCallback = null;

// تهيئة لوحة التحكم
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    setupLoginForm();
    setupAdminListeners();
});

function checkAuth() {
    if (isAdminLoggedIn()) {
        showDashboard();
        const session = getAdminSession();
        document.getElementById('adminUsername').textContent = session.username;
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
    refreshAll();
}

// ============================================
// تسجيل الدخول
// ============================================
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('loginPassword');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        const errorEl = document.getElementById('loginError');

        errorEl.textContent = '';
        errorEl.classList.remove('show');

        const session = adminLogin(username, password);
        if (session) {
            showDashboard();
            document.getElementById('adminUsername').textContent = session.username;
            showToast('مرحباً', `أهلاً ${session.username} في لوحة التحكم`, 'success');
        } else {
            errorEl.textContent = 'اسم المستخدم أو كلمة المرور غير صحيحة';
            errorEl.classList.add('show');
        }
    });

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.querySelector('i').className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
}

// ============================================
// مستمعات الأحداث
// ============================================
function setupAdminListeners() {
    // التنقل بين الأقسام
    document.querySelectorAll('.sidebar-link[data-view]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(link.dataset.view);
        });
    });

    // تسجيل الخروج
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        adminLogout();
        showLogin();
        showToast('تم تسجيل الخروج', 'نراك قريباً', 'success');
    });

    // زر القائمة في الموبايل
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            document.querySelector('.admin-sidebar').classList.toggle('active');
        });
    }

    // البحث في العقارات
    const propertiesSearch = document.getElementById('propertiesSearch');
    if (propertiesSearch) {
        propertiesSearch.addEventListener('input', renderPropertiesTable);
    }

    // فلتر العقارات
    const propertiesFilter = document.getElementById('propertiesFilter');
    if (propertiesFilter) {
        propertiesFilter.addEventListener('change', renderPropertiesTable);
    }

    // نموذج إضافة عقار
    const adminAddForm = document.getElementById('adminAddForm');
    if (adminAddForm) {
        adminAddForm.addEventListener('submit', handleAdminAdd);
    }

    // نموذج تعديل العقار
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', handleEditSubmit);
    }

    const editModalClose = document.getElementById('editModalClose');
    const editCancel = document.getElementById('editCancel');
    if (editModalClose) editModalClose.addEventListener('click', closeEditModal);
    if (editCancel) editCancel.addEventListener('click', closeEditModal);

    // نافذة التأكيد
    const confirmCancel = document.getElementById('confirmCancel');
    const confirmOk = document.getElementById('confirmOk');
    if (confirmCancel) confirmCancel.addEventListener('click', closeConfirmModal);
    if (confirmOk) {
        confirmOk.addEventListener('click', () => {
            if (confirmCallback) confirmCallback();
            closeConfirmModal();
        });
    }

    // إغلاق النوافذ بالنقر خارجها
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
}

// ============================================
// التنقل بين الأقسام
// ============================================
function switchView(view) {
    currentView = view;
    document.querySelectorAll('.admin-view').forEach(v => v.style.display = 'none');
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));

    const targetView = document.getElementById(`view-${view}`);
    if (targetView) targetView.style.display = 'block';

    const activeLink = document.querySelector(`.sidebar-link[data-view="${view}"]`);
    if (activeLink) activeLink.classList.add('active');

    const titles = {
        dashboard: 'الإحصائيات',
        properties: 'إدارة العقارات',
        pending: 'عقارات في الانتظار',
        requests: 'طلبات العملاء',
        add: 'إضافة عقار جديد'
    };
    document.getElementById('viewTitle').textContent = titles[view] || view;

    // إغلاق القائمة في الموبايل
    document.querySelector('.admin-sidebar').classList.remove('active');

    // تحديث البيانات
    if (view === 'dashboard') renderDashboard();
    if (view === 'properties') renderPropertiesTable();
    if (view === 'pending') renderPending();
    if (view === 'requests') renderRequests();
}

// ============================================
// تحديث البيانات
// ============================================
function refreshAll() {
    updateCounts();
    renderDashboard();
    renderPropertiesTable();
    renderPending();
    renderRequests();
}

function updateCounts() {
    const all = getAllProperties();
    const approved = all.filter(p => p.status === 'approved');
    const pending = all.filter(p => p.status === 'pending');
    const requests = getCustomerRequests();

    document.getElementById('propertiesCount').textContent = all.length;
    document.getElementById('pendingCount').textContent = pending.length;
    document.getElementById('requestsCount').textContent = requests.length;
}

// ============================================
// لوحة الإحصائيات
// ============================================
function renderDashboard() {
    const all = getAllProperties();
    const approved = all.filter(p => p.status === 'approved');
    const pending = all.filter(p => p.status === 'pending');
    const requests = getCustomerRequests();
    const sale = all.filter(p => p.purpose === 'sale');
    const rent = all.filter(p => p.purpose === 'rent');

    document.getElementById('statTotal').textContent = formatNumber(all.length);
    document.getElementById('statApproved').textContent = formatNumber(approved.length);
    document.getElementById('statPending').textContent = formatNumber(pending.length);
    document.getElementById('statRequests').textContent = formatNumber(requests.length);
    document.getElementById('statSale').textContent = formatNumber(sale.length);
    document.getElementById('statRent').textContent = formatNumber(rent.length);

    // مخطط الأنواع
    renderTypeChart(all);
    // مخطط المدن
    renderCityChart(all);
    // أحدث العقارات
    renderRecentList(all.slice(-5).reverse());
}

function renderTypeChart(properties) {
    const types = ['villa', 'apartment', 'shop', 'land'];
    const labels = { villa: 'فيلا', apartment: 'شقة', shop: 'معرض', land: 'أرض' };
    const counts = types.map(t => properties.filter(p => p.type === t).length);
    const max = Math.max(...counts, 1);

    const chart = document.getElementById('typeChart');
    chart.innerHTML = types.map((type, i) => `
        <div class="bar-item">
            <div class="bar-label">${labels[type]}</div>
            <div class="bar-container">
                <div class="bar-fill" style="width: ${(counts[i] / max) * 100}%"></div>
                <span class="bar-value">${counts[i]}</span>
            </div>
        </div>
    `).join('');
}

function renderCityChart(properties) {
    const cities = ['riyadh', 'muzahmiya'];
    const labels = { riyadh: 'الرياض', muzahmiya: 'المزاحمية' };
    const counts = cities.map(c => properties.filter(p => p.city === c).length);
    const max = Math.max(...counts, 1);

    const chart = document.getElementById('cityChart');
    chart.innerHTML = cities.map((city, i) => `
        <div class="bar-item">
            <div class="bar-label">${labels[city]}</div>
            <div class="bar-container">
                <div class="bar-fill" style="width: ${(counts[i] / max) * 100}%"></div>
                <span class="bar-value">${counts[i]}</span>
            </div>
        </div>
    `).join('');
}

function renderRecentList(recent) {
    const list = document.getElementById('recentList');
    if (recent.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: var(--gray-500); padding: 20px;">لا توجد عقارات</p>';
        return;
    }
    list.innerHTML = recent.map(p => `
        <div class="recent-item">
            <img src="${p.image}" alt="${p.title}" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200'">
            <div class="recent-info">
                <h4>${p.title}</h4>
                <p>${p.cityName} - ${p.district}</p>
            </div>
            <div class="recent-meta">
                <span class="status-badge ${p.status}">${p.status === 'approved' ? 'معتمد' : 'في الانتظار'}</span>
                <span class="recent-price">${formatNumber(p.price)} ر.س</span>
            </div>
        </div>
    `).join('');
}

// ============================================
// جدول العقارات
// ============================================
function renderPropertiesTable() {
    const tbody = document.getElementById('propertiesTableBody');
    if (!tbody) return;

    let properties = getAllProperties();

    const search = document.getElementById('propertiesSearch')?.value.trim().toLowerCase() || '';
    const filter = document.getElementById('propertiesFilter')?.value || 'all';

    if (search) {
        properties = properties.filter(p =>
            p.title.toLowerCase().includes(search) ||
            p.cityName.includes(search) ||
            p.district.toLowerCase().includes(search) ||
            (p.description && p.description.toLowerCase().includes(search))
        );
    }

    if (filter !== 'all') {
        properties = properties.filter(p => p.status === filter);
    }

    if (properties.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 40px; color: var(--gray-500);">لا توجد عقارات</td></tr>`;
        return;
    }

    tbody.innerHTML = properties.map(p => `
        <tr>
            <td>
                <div class="table-property">
                    <img src="${p.image}" alt="${p.title}" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100'">
                    <div>
                        <strong>${p.title}</strong>
                        <small>${p.district}</small>
                    </div>
                </div>
            </td>
            <td><span class="type-pill">${PROPERTY_TYPES[p.type] || p.type}</span></td>
            <td>${p.cityName}</td>
            <td><strong>${formatNumber(p.price)}</strong><br><small>ر.س</small></td>
            <td>${formatNumber(p.area)} م²</td>
            <td>
                <span class="status-badge ${p.status}">
                    ${p.status === 'approved' ? 'معتمد' : 'في الانتظار'}
                </span>
                ${p.featured ? '<span class="status-badge featured">مميز</span>' : ''}
            </td>
            <td>
                <div class="action-buttons">
                    ${p.status === 'pending' ? `<button class="action-btn approve" onclick="approveProperty(${p.id})" title="موافقة"><i class="fas fa-check"></i></button>` : ''}
                    <button class="action-btn edit" onclick="openEditModal(${p.id})" title="تعديل"><i class="fas fa-edit"></i></button>
                    <button class="action-btn view" onclick="viewProperty(${p.id})" title="عرض"><i class="fas fa-eye"></i></button>
                    <button class="action-btn delete" onclick="confirmDeleteProperty(${p.id})" title="حذف"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

// ============================================
// العقارات المعلقة
// ============================================
function renderPending() {
    const grid = document.getElementById('pendingGrid');
    const empty = document.getElementById('pendingEmpty');
    if (!grid) return;

    const pending = getAllProperties().filter(p => p.status === 'pending');

    if (pending.length === 0) {
        grid.style.display = 'none';
        empty.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    empty.style.display = 'none';

    grid.innerHTML = pending.map(p => `
        <div class="pending-card">
            <div class="pending-image">
                <img src="${p.image}" alt="${p.title}" onerror="this.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'">
                <span class="pending-badge">معلق</span>
            </div>
            <div class="pending-content">
                <h3>${p.title}</h3>
                <div class="pending-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${p.cityName} - ${p.district}</span>
                    <span><i class="fas fa-ruler-combined"></i> ${formatNumber(p.area)} م²</span>
                    <span><i class="fas fa-money-bill-wave"></i> ${formatNumber(p.price)} ر.س</span>
                </div>
                <p class="pending-desc">${(p.description || '').substring(0, 150)}...</p>
                <div class="pending-info">
                    <div><strong>المالك:</strong> ${p.owner || 'غير محدد'}</div>
                    <div><strong>الهاتف:</strong> <a href="tel:${p.phone}">${p.phone}</a></div>
                </div>
                <div class="pending-actions">
                    <button class="btn btn-success" onclick="approveProperty(${p.id})">
                        <i class="fas fa-check"></i> موافقة ونشر
                    </button>
                    <button class="btn btn-secondary" onclick="openEditModal(${p.id})">
                        <i class="fas fa-edit"></i> تعديل
                    </button>
                    <button class="btn btn-danger" onclick="confirmDeleteProperty(${p.id})">
                        <i class="fas fa-trash"></i> رفض وحذف
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// طلبات العملاء
// ============================================
function renderRequests() {
    const list = document.getElementById('requestsList');
    const empty = document.getElementById('requestsEmpty');
    if (!list) return;

    const requests = getCustomerRequests().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (requests.length === 0) {
        list.style.display = 'none';
        empty.style.display = 'block';
        return;
    }

    list.style.display = 'flex';
    empty.style.display = 'none';

    const typeLabels = { villa: 'فيلا', apartment: 'شقة', shop: 'معرض تجاري', land: 'أرض' };
    const purposeLabels = { sale: 'شراء', rent: 'إيجار' };

    list.innerHTML = requests.map(r => `
        <div class="request-card ${r.status || 'new'}">
            <div class="request-header">
                <div>
                    <h3>${r.name}</h3>
                    <div class="request-contact">
                        <a href="tel:${r.phone}"><i class="fas fa-phone"></i> ${r.phone}</a>
                        ${r.email ? `<a href="mailto:${r.email}"><i class="fas fa-envelope"></i> ${r.email}</a>` : ''}
                        <a href="https://wa.me/${r.phone.replace(/[^\d]/g, '')}" target="_blank"><i class="fab fa-whatsapp"></i> واتساب</a>
                    </div>
                </div>
                <span class="request-status ${r.status || 'new'}">${getRequestStatusText(r.status)}</span>
            </div>
            <div class="request-body">
                <div class="request-details">
                    <div class="request-detail">
                        <i class="fas fa-building"></i>
                        <span>${typeLabels[r.type] || r.type}</span>
                    </div>
                    <div class="request-detail">
                        <i class="fas fa-tag"></i>
                        <span>${purposeLabels[r.purpose] || r.purpose}</span>
                    </div>
                    ${r.location ? `<div class="request-detail"><i class="fas fa-map-marker-alt"></i><span>${r.location}</span></div>` : ''}
                    ${r.budget ? `<div class="request-detail"><i class="fas fa-money-bill-wave"></i><span>${formatNumber(r.budget)} ر.س</span></div>` : ''}
                </div>
                <p class="request-text">${r.details}</p>
            </div>
            <div class="request-footer">
                <small><i class="fas fa-clock"></i> ${new Date(r.createdAt).toLocaleString('ar-SA')}</small>
                <div class="request-actions">
                    ${(!r.status || r.status === 'new') ? `<button class="btn btn-sm btn-primary" onclick="setRequestStatus(${r.id}, 'contacted')"><i class="fas fa-phone"></i> تم التواصل</button>` : ''}
                    ${r.status === 'contacted' ? `<button class="btn btn-sm btn-success" onclick="setRequestStatus(${r.id}, 'closed')"><i class="fas fa-check-double"></i> إغلاق</button>` : ''}
                    ${r.status === 'closed' ? `<button class="btn btn-sm btn-secondary" onclick="setRequestStatus(${r.id}, 'new')"><i class="fas fa-undo"></i> إعادة فتح</button>` : ''}
                    <button class="btn btn-sm btn-danger" onclick="confirmDeleteRequest(${r.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    `).join('');
}

function getRequestStatusText(status) {
    switch (status) {
        case 'contacted': return 'تم التواصل';
        case 'closed': return 'مغلق';
        default: return 'جديد';
    }
}

// ============================================
// العمليات على العقارات
// ============================================
window.approveProperty = function(id) {
    setPropertyStatus(id, 'approved');
    showToast('تمت الموافقة', 'تم نشر العقار بنجاح', 'success');
    refreshAll();
};

window.openEditModal = function(id) {
    const property = getPropertyById(id);
    if (!property) return;

    const form = document.getElementById('editForm');
    form.id.value = property.id;
    form.title.value = property.title;
    form.type.value = property.type;
    form.purpose.value = property.purpose;
    form.price.value = property.price;
    form.area.value = property.area;
    form.city.value = property.city;
    form.district.value = property.district;
    form.rooms.value = property.rooms || 0;
    form.bathrooms.value = property.bathrooms || 0;
    form.phone.value = property.phone;
    form.image.value = property.image;
    form.description.value = property.description;
    form.status.value = property.status || 'pending';

    document.getElementById('editModal').classList.add('active');
};

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
}

function handleEditSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');

    const updates = {
        title: formData.get('title'),
        type: formData.get('type'),
        purpose: formData.get('purpose'),
        price: parseInt(formData.get('price')),
        area: parseInt(formData.get('area')),
        city: formData.get('city'),
        cityName: CITIES[formData.get('city')],
        district: formData.get('district'),
        rooms: parseInt(formData.get('rooms')) || 0,
        bathrooms: parseInt(formData.get('bathrooms')) || 0,
        phone: formData.get('phone'),
        image: getPropertyImage(formData.get('image')),
        description: formData.get('description'),
        status: formData.get('status'),
        priceUnit: formData.get('purpose') === 'rent' ? 'شهرياً' : ''
    };

    updateProperty(id, updates);
    closeEditModal();
    showToast('تم التحديث', 'تم حفظ التغييرات بنجاح', 'success');
    refreshAll();
}

window.viewProperty = function(id) {
    const property = getPropertyById(id);
    if (!property) return;
    // تخزين العقار المختار وعرضه
    sessionStorage.setItem('previewProperty', JSON.stringify(property));
    window.open(`index.html?preview=${id}`, '_blank');
};

window.confirmDeleteProperty = function(id) {
    const property = getPropertyById(id);
    showConfirm(
        'حذف العقار',
        `هل أنت متأكد من حذف "${property.title}"؟ لا يمكن التراجع عن هذا الإجراء.`,
        () => {
            deleteProperty(id);
            showToast('تم الحذف', 'تم حذف العقار بنجاح', 'success');
            refreshAll();
        }
    );
};

// ============================================
// إضافة عقار جديد (للمشرف)
// ============================================
function handleAdminAdd(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const gallery = formData.get('gallery')
        ? formData.get('gallery').split(',').map(s => s.trim()).filter(s => s)
        : [];

    const newProperty = {
        title: formData.get('title'),
        type: formData.get('type'),
        purpose: formData.get('purpose'),
        price: parseInt(formData.get('price')),
        area: parseInt(formData.get('area')),
        city: formData.get('city'),
        cityName: CITIES[formData.get('city')],
        district: formData.get('district'),
        rooms: parseInt(formData.get('rooms')) || 0,
        bathrooms: parseInt(formData.get('bathrooms')) || 0,
        image: getPropertyImage(formData.get('image')),
        gallery: gallery.length > 0 ? gallery : [DEFAULT_IMAGE],
        description: formData.get('description'),
        phone: formData.get('phone'),
        owner: 'مكتب أضواء الفيصلية',
        featured: formData.get('featured') === 'on',
        priceUnit: formData.get('purpose') === 'rent' ? 'شهرياً' : ''
    };

    addApprovedProperty(newProperty);
    showToast('تمت الإضافة', 'تم نشر العقار بنجاح', 'success');
    e.target.reset();
    refreshAll();
    switchView('properties');
}

// ============================================
// عمليات الطلبات
// ============================================
window.setRequestStatus = function(id, status) {
    updateRequestStatus(id, status);
    showToast('تم التحديث', 'تم تحديث حالة الطلب', 'success');
    renderRequests();
    updateCounts();
};

window.confirmDeleteRequest = function(id) {
    showConfirm(
        'حذف الطلب',
        'هل أنت متأكد من حذف هذا الطلب؟',
        () => {
            deleteRequest(id);
            showToast('تم الحذف', 'تم حذف الطلب', 'success');
            renderRequests();
            updateCounts();
        }
    );
};

// ============================================
// نافذة التأكيد
// ============================================
function showConfirm(title, message, callback) {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    confirmCallback = callback;
    document.getElementById('confirmModal').classList.add('active');
}

function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
    confirmCallback = null;
}

// ============================================
// الإشعارات
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
