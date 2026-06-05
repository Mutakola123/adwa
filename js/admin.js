// ============================================
// لوحة التحكم - مكتب أضواء الفيصلية
// ============================================

let currentView = 'dashboard';
let confirmCallback = null;

// تهيئة لوحة التحكم
let captchaAnswer = 0;
let activityTimer = null;

document.addEventListener('DOMContentLoaded', async () => {
    // تهيئة النظام الأمني أولاً (ضروري قبل أي عملية مصادقة)
    await initializeSecurity();
    checkAuth();
    generateCaptcha();
    setupLoginForm();
    setupAdminListeners();
    startActivityTracking();
});

function checkAuth() {
    if (isAdminLoggedIn()) {
        showDashboard();
        const session = getAdminSession();
        document.getElementById('adminUsername').textContent = session.username;
        if (session.mustChangePassword) {
            showToast('تنبيه أمني', 'يجب تغيير كلمة المرور الافتراضية فوراً', 'warning');
            setTimeout(() => switchView('security'), 1000);
        }
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    generateCaptcha();
    updateAttemptsWarning();
}

function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
    refreshAll();
    startSessionTimer();
}

// توليد Captcha بسيط
function generateCaptcha() {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = a + b;
    const questionEl = document.getElementById('captchaQuestion');
    if (questionEl) questionEl.textContent = `${a} + ${b} = ؟`;
    const ansEl = document.getElementById('captchaAnswer');
    if (ansEl) ansEl.value = '';
}

// تحديث تحذير المحاولات
function updateAttemptsWarning() {
    const attempts = getLoginAttempts();
    const warningEl = document.getElementById('attemptsWarning');
    const textEl = document.getElementById('attemptsText');
    if (!warningEl || !textEl) return;

    const lockStatus = isAccountLocked();
    if (lockStatus.locked) {
        warningEl.style.display = 'flex';
        warningEl.style.background = 'rgba(220, 38, 38, 0.15)';
        warningEl.style.color = '#dc2626';
        textEl.textContent = `🔒 الحساب مقفل. حاول بعد ${lockStatus.remainingMinutes} دقيقة`;
        document.getElementById('loginUsername').disabled = true;
        document.getElementById('loginPassword').disabled = true;
        document.getElementById('captchaAnswer').disabled = true;
        document.querySelector('.login-btn').disabled = true;
    } else if (attempts.count > 0) {
        warningEl.style.display = 'flex';
        warningEl.style.background = 'rgba(234, 179, 8, 0.15)';
        warningEl.style.color = '#ca8a04';
        const remaining = SECURITY_CONFIG.MAX_LOGIN_ATTEMPTS - attempts.count;
        textEl.textContent = `⚠️ تبقى ${remaining} محاولة قبل قفل الحساب`;
        document.getElementById('loginUsername').disabled = false;
        document.getElementById('loginPassword').disabled = false;
        document.getElementById('captchaAnswer').disabled = false;
        document.querySelector('.login-btn').disabled = false;
    } else {
        warningEl.style.display = 'none';
        document.getElementById('loginUsername').disabled = false;
        document.getElementById('loginPassword').disabled = false;
        document.getElementById('captchaAnswer').disabled = false;
        document.querySelector('.login-btn').disabled = false;
    }
}

// ============================================
// تسجيل الدخول
// ============================================
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('loginPassword');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        const captchaInput = parseInt(document.getElementById('captchaAnswer').value);
        const errorEl = document.getElementById('loginError');
        const btn = loginForm.querySelector('.login-btn');

        errorEl.textContent = '';
        errorEl.classList.remove('show');

        // التحقق من حالة القفل
        const lockStatus = isAccountLocked();
        if (lockStatus.locked) {
            errorEl.textContent = `الحساب مقفل. حاول بعد ${lockStatus.remainingMinutes} دقيقة`;
            errorEl.classList.add('show');
            return;
        }

        // التحقق من الـ Captcha
        if (isNaN(captchaInput) || captchaInput !== captchaAnswer) {
            errorEl.textContent = 'إجابة التحقق غير صحيحة';
            errorEl.classList.add('show');
            generateCaptcha();
            return;
        }

        // تعطيل الزر أثناء المعالجة
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحقق...';

        try {
            const result = await adminLogin(username, password);

            if (result.success) {
                showDashboard();
                document.getElementById('adminUsername').textContent = result.session.username;
                loginForm.reset();
                if (result.session.mustChangePassword) {
                    showToast('تنبيه أمني', 'يجب تغيير كلمة المرور الافتراضية فوراً', 'warning');
                    setTimeout(() => switchView('security'), 800);
                } else {
                    showToast('مرحباً', `أهلاً ${result.session.username}`, 'success');
                }
            } else {
                errorEl.textContent = result.message;
                errorEl.classList.add('show');
                generateCaptcha();
                updateAttemptsWarning();
            }
        } catch (err) {
            errorEl.textContent = 'حدث خطأ في تسجيل الدخول';
            errorEl.classList.add('show');
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-sign-in-alt"></i><span>تسجيل الدخول</span>';
        }
    });

    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.querySelector('i').className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    });
}

// تتبع نشاط المستخدم (لقفل الجلسة عند الخمول)
function startActivityTracking() {
    const events = ['mousedown', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(evt => {
        document.addEventListener(evt, () => {
            if (isAdminLoggedIn()) updateActivity();
        }, { passive: true });
    });
}

// مؤقت الجلسة - يعرض الوقت المتبقي ويغلق عند انتهاء الجلسة
function startSessionTimer() {
    if (activityTimer) clearInterval(activityTimer);
    activityTimer = setInterval(() => {
        if (!isAdminLoggedIn()) {
            clearInterval(activityTimer);
            showLogin();
            showToast('انتهت الجلسة', 'تم تسجيل خروجك تلقائياً بسبب الخمول', 'warning');
            return;
        }
        updateSessionInfo();
    }, 30000); // كل 30 ثانية
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

    // نموذج تغيير كلمة المرور
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', handleChangePassword);
    }

    // مؤشر قوة كلمة المرور
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', updatePasswordStrength);
    }

    // إعدادات التخزين السحابي
    const cloudinaryConfigForm = document.getElementById('cloudinaryConfigForm');
    if (cloudinaryConfigForm) {
        cloudinaryConfigForm.addEventListener('submit', handleCloudinaryConfig);
    }
    const testCloudinaryBtn = document.getElementById('testCloudinaryBtn');
    if (testCloudinaryBtn) {
        testCloudinaryBtn.addEventListener('click', testCloudinaryConnection);
    }
    const disableCloudinaryBtn = document.getElementById('disableCloudinaryBtn');
    if (disableCloudinaryBtn) {
        disableCloudinaryBtn.addEventListener('click', disableCloudinary);
    }

    // رفع الصور في نماذج لوحة التحكم
    if (typeof setupSingleFileUpload === 'function') {
        setupSingleFileUpload('adminMainImageInput', null, 'adminMainImageUpload');
        setupSingleFileUpload('editMainImageInput', null, 'editMainImageUpload');
        setupGalleryFileUpload('adminGalleryImageInput', null, 'adminGalleryImageUpload');
    }
}

// تقييم قوة كلمة المرور
function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/'`~]/.test(password)) score++;
    return score;
}

function updatePasswordStrength() {
    const password = document.getElementById('newPassword').value;
    const strengthEl = document.getElementById('passwordStrength');
    if (!strengthEl) return;
    const score = getPasswordStrength(password);
    const levels = [
        { text: '', class: '' },
        { text: 'ضعيفة جداً', class: 'strength-very-weak' },
        { text: 'ضعيفة', class: 'strength-weak' },
        { text: 'متوسطة', class: 'strength-medium' },
        { text: 'جيدة', class: 'strength-good' },
        { text: 'قوية جداً', class: 'strength-very-strong' }
    ];
    if (password.length === 0) {
        strengthEl.innerHTML = '';
        return;
    }
    const level = levels[score];
    strengthEl.innerHTML = `<div class="strength-bar ${level.class}"><span></span></div><span class="strength-text">${level.text}</span>`;
}

// تغيير كلمة المرور
async function handleChangePassword(e) {
    e.preventDefault();
    const form = e.target;
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword !== confirmPassword) {
        showToast('خطأ', 'كلمة المرور الجديدة وتأكيدها غير متطابقتين', 'error');
        return;
    }

    const strength = getPasswordStrength(newPassword);
    if (strength < 3) {
        showToast('كلمة مرور ضعيفة', 'يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز', 'warning');
        return;
    }

    const session = getAdminSession();
    if (!session) {
        showToast('خطأ', 'الجلسة منتهية، سجل الدخول مرة أخرى', 'error');
        return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const oldHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحديث...';

    try {
        const result = await changePassword(session.username, oldPassword, newPassword);
        if (result.success) {
            showToast('نجح', result.message, 'success');
            form.reset();
            document.getElementById('passwordStrength').innerHTML = '';
        } else {
            showToast('فشل', result.message, 'error');
        }
    } catch (err) {
        showToast('خطأ', 'حدث خطأ أثناء تغيير كلمة المرور', 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = oldHtml;
    }
}

// تحديث معلومات الجلسة
function updateSessionInfo() {
    const session = getAdminSession();
    if (!session) return;

    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setText('sessionUser', session.username);
    setText('sessionRole', session.role === 'superadmin' ? 'مدير عام' : 'مشرف');
    setText('sessionLoginTime', new Date(session.loginTime).toLocaleString('ar-SA'));

    if (session.lastActivity) {
        const lastAct = new Date(session.lastActivity);
        const diff = Math.floor((Date.now() - lastAct.getTime()) / 1000 / 60);
        setText('sessionLastActivity', diff < 1 ? 'الآن' : `منذ ${diff} دقيقة`);
    }

    if (session.lastActivity) {
        const expiresAt = new Date(session.lastActivity).getTime() + (SECURITY_CONFIG.INACTIVITY_TIMEOUT * 1000);
        const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000 / 60));
        setText('sessionExpiresIn', `${remaining} دقيقة`);
    }

    renderLoginLog();
}

// عرض سجل محاولات الدخول
function renderLoginLog() {
    const log = getLoginLog();
    const container = document.getElementById('loginLog');
    if (!container) return;

    if (log.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-history"></i><p>لا توجد محاولات مسجلة</p></div>';
        return;
    }

    const html = log.slice(0, 20).map(entry => {
        let icon, status, color;
        if (entry.success === true) {
            icon = 'fa-check-circle'; status = 'نجح'; color = 'success';
        } else if (entry.success === 'logout') {
            icon = 'fa-sign-out-alt'; status = 'خروج'; color = 'info';
        } else {
            icon = 'fa-times-circle'; status = 'فشل'; color = 'danger';
        }
        const time = new Date(entry.timestamp).toLocaleString('ar-SA');
        return `<div class="log-entry log-${color}">
            <i class="fas ${icon}"></i>
            <span class="log-user">${entry.username}</span>
            <span class="log-status">${status}</span>
            <span class="log-time">${time}</span>
        </div>`;
    }).join('');
    container.innerHTML = html;
}
// ============================================
// التخزين السحابي (Cloudinary)
// ============================================
function handleCloudinaryConfig(e) {
    e.preventDefault();
    const form = e.target;
    const config = {
        cloudName: form.cloudName.value.trim(),
        uploadPreset: form.uploadPreset.value.trim(),
        folder: form.folder.value.trim() || ''
    };

    if (!config.cloudName || !config.uploadPreset) {
        showToast('خطأ', 'يجب إدخال Cloud Name و Upload Preset', 'error');
        return;
    }

    if (setCloudinaryConfig(config)) {
        showToast('تم الحفظ', 'تم حفظ إعدادات Cloudinary بنجاح', 'success');
        updateCloudStorageUI();
    } else {
        showToast('خطأ', 'فشل حفظ الإعدادات', 'error');
    }
}

async function testCloudinaryConnection() {
    const config = getCloudinaryConfig();
    if (!config) {
        showToast('تنبيه', 'يرجى حفظ الإعدادات أولاً', 'warning');
        return;
    }

    const btn = document.getElementById('testCloudinaryBtn');
    const oldHtml = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الاختبار...';

    try {
        // اختبار عبر ping لـ API
        const testUrl = `https://res.cloudinary.com/${config.cloudName}/image/upload/sample.jpg`;
        const response = await fetch(testUrl, { method: 'HEAD' });

        if (response.ok) {
            localStorage.setItem('cloudinaryLastTest', new Date().toISOString());
            showToast('نجح الاتصال ✓', 'Cloudinary يعمل بشكل صحيح', 'success');
        } else {
            showToast('فشل', `الخادم استجاب بـ ${response.status}. تحقق من Cloud Name`, 'error');
        }
    } catch (err) {
        showToast('فشل الاتصال', 'تعذر الوصول لـ Cloudinary. تحقق من الاتصال بالإنترنت', 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = oldHtml;
        updateCloudStorageUI();
    }
}

function disableCloudinary() {
    showConfirm(
        'تعطيل التخزين السحابي',
        'هل أنت متأكد من تعطيل Cloudinary؟ الصور الجديدة ستحفظ محلياً فقط في المتصفح',
        () => {
            localStorage.removeItem(CLOUDINARY_CONFIG_KEY);
            const form = document.getElementById('cloudinaryConfigForm');
            if (form) form.reset();
            showToast('تم التعطيل', 'تم تعطيل التخزين السحابي', 'success');
            updateCloudStorageUI();
        }
    );
}

function updateCloudStorageUI() {
    const config = getCloudinaryConfig();
    const isEnabled = !!config;

    // تحديث حالة البطاقة العلوية
    const statusIcon = document.getElementById('cloudStatusIcon');
    const statusTitle = document.getElementById('cloudStatusTitle');
    const statusDesc = document.getElementById('cloudStatusDesc');
    const statusBadge = document.getElementById('cloudStatusBadge');
    const statusCard = document.getElementById('cloudStatusCard');

    if (isEnabled) {
        statusCard.classList.add('active');
        statusCard.classList.remove('inactive');
        statusIcon.innerHTML = '<i class="fas fa-cloud-upload-alt"></i>';
        statusTitle.textContent = 'التخزين السحابي مفعّل';
        statusDesc.textContent = 'الصور الجديدة تُرفع إلى Cloudinary تلقائياً';
        statusBadge.textContent = 'نشط ✓';
        statusBadge.className = 'cloud-status-badge success';
    } else {
        statusCard.classList.add('inactive');
        statusCard.classList.remove('active');
        statusIcon.innerHTML = '<i class="fas fa-cloud"></i>';
        statusTitle.textContent = 'التخزين السحابي معطّل';
        statusDesc.textContent = 'الصور تُحفظ محلياً في المتصفح (حد 5-10MB)';
        statusBadge.textContent = 'غير مفعّل';
        statusBadge.className = 'cloud-status-badge warning';
    }

    // ملء الحقول
    if (config) {
        const form = document.getElementById('cloudinaryConfigForm');
        if (form) {
            form.cloudName.value = config.cloudName || '';
            form.uploadPreset.value = config.uploadPreset || '';
            form.folder.value = config.folder || '';
        }
    }

    // إظهار/إخفاء زر التعطيل
    const disableBtn = document.getElementById('disableCloudinaryBtn');
    if (disableBtn) {
        disableBtn.style.display = isEnabled ? 'inline-flex' : 'none';
    }

    // تحديث الإحصائيات
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setText('statCloudStatus', isEnabled ? '✓ مفعّل' : '✗ معطّل');
    setText('statProvider', isEnabled ? 'Cloudinary' : 'لا يوجد (محلي)');
    setText('statCloudName', config ? config.cloudName : '-');
    setText('statFolder', config ? (config.folder || '/') : '-');

    const lastTest = localStorage.getItem('cloudinaryLastTest');
    if (lastTest) {
        setText('statLastTest', new Date(lastTest).toLocaleString('ar-SA'));
    } else {
        setText('statLastTest', 'لم يتم');
    }
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
        add: 'إضافة عقار جديد',
        security: 'الأمان وكلمة المرور',
        cloud: 'التخزين السحابي'
    };
    document.getElementById('viewTitle').textContent = titles[view] || view;

    // إغلاق القائمة في الموبايل
    document.querySelector('.admin-sidebar').classList.remove('active');

    // تحديث البيانات
    if (view === 'dashboard') renderDashboard();
    if (view === 'properties') renderPropertiesTable();
    if (view === 'pending') renderPending();
    if (view === 'requests') renderRequests();
    if (view === 'security') updateSessionInfo();
    if (view === 'cloud') updateCloudStorageUI();
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
    if (!property) {
        showToast('خطأ', 'لم يتم العثور على العقار', 'error');
        return;
    }

    const form = document.getElementById('editForm');
    // استخدام querySelector للوصول للحقول بأمان
    form.querySelector('[name="id"]').value = property.id;
    form.querySelector('[name="title"]').value = property.title || '';
    form.querySelector('[name="type"]').value = property.type || 'villa';
    form.querySelector('[name="purpose"]').value = property.purpose || 'sale';
    form.querySelector('[name="price"]').value = property.price || 0;
    form.querySelector('[name="area"]').value = property.area || 0;
    form.querySelector('[name="city"]').value = property.city || 'riyadh';
    form.querySelector('[name="district"]').value = property.district || '';
    form.querySelector('[name="rooms"]').value = property.rooms || 0;
    form.querySelector('[name="bathrooms"]').value = property.bathrooms || 0;
    form.querySelector('[name="phone"]').value = property.phone || '';
    form.querySelector('[name="image"]').value = property.image || '';
    form.querySelector('[name="description"]').value = property.description || '';
    form.querySelector('[name="status"]').value = property.status || 'pending';

    document.getElementById('editModal').classList.add('active');
};

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
}

function handleEditSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const id = formData.get('id');

    if (!id) {
        showToast('خطأ', 'لم يتم تحديد العقار. يرجى إعادة فتح نافذة التعديل', 'error');
        return;
    }

    // التحقق من الحقول المطلوبة
    const title = formData.get('title');
    const price = parseInt(formData.get('price'));
    const area = parseInt(formData.get('area'));
    const phone = formData.get('phone');

    if (!title || !price || !area || !phone) {
        showToast('خطأ', 'يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    // الحصول على الصورة الجديدة إن وُجدت
    const imageData = form.querySelector('[name="imageData"]').value;
    const existingProperty = getPropertyById(id);
    const finalImage = imageData || (existingProperty ? existingProperty.image : DEFAULT_IMAGE);

    const updates = {
        title: title,
        type: formData.get('type'),
        purpose: formData.get('purpose'),
        price: price,
        area: area,
        city: formData.get('city'),
        cityName: CITIES[formData.get('city')] || 'الرياض',
        district: formData.get('district'),
        rooms: parseInt(formData.get('rooms')) || 0,
        bathrooms: parseInt(formData.get('bathrooms')) || 0,
        phone: phone,
        image: getPropertyImage(finalImage),
        description: formData.get('description'),
        status: formData.get('status'),
        priceUnit: formData.get('purpose') === 'rent' ? 'شهرياً' : ''
    };

    const result = updateProperty(id, updates);
    if (result) {
        closeEditModal();
        showToast('تم التحديث', 'تم حفظ التغييرات بنجاح', 'success');
        refreshAll();
    } else {
        showToast('خطأ', 'فشل حفظ التغييرات. يرجى المحاولة مرة أخرى', 'error');
    }
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
    const imageData = form.querySelector('[name="imageData"]').value;
    const image = imageData || DEFAULT_IMAGE;

    // الحصول على صور المعرض
    const galleryData = form.querySelector('[name="galleryData"]').value;
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
        owner: 'مكتب أضواء الفيصلية',
        featured: formData.get('featured') === 'on',
        priceUnit: purpose === 'rent' ? 'شهرياً' : ''
    };

    addApprovedProperty(newProperty);
    showToast('تمت الإضافة', 'تم نشر العقار بنجاح', 'success');
    e.target.reset();
    if (typeof resetImageUploads === 'function') {
        resetImageUploads('adminMainImageUpload');
        resetImageUploads('adminGalleryImageUpload');
    }
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
