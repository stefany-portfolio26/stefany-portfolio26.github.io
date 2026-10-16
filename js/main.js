/* =========================================================
   MAIN.JS — портфолио Stefany Zhuravleva
   Подключается в конце <body> после AOS и data.js.
   Глобальными остаются только функции, которые вызываются из HTML:
   openModal, openGalleryModal, closeModal, closeLightbox,
   copyAction, openWebsiteLightbox.
   ========================================================= */
(() => {
'use strict';

/* ---------- Утилиты ---------- */
const $ = (id) => document.getElementById(id);
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const isTouch = () => window.matchMedia('(hover: none)').matches;
const esc = (s = '') => String(s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const preload = (url) => { const i = new Image(); i.src = url; };

/* ---------- Старт: всегда с самого верха ---------- */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
const refreshAOS = () => { if (typeof AOS !== 'undefined') AOS.refresh(); };


/* =========================================================
   ТОСТ И КОПИРОВАНИЕ
   ========================================================= */
const copyrightMsg = () => t('toast.copyright');
let toastTimer;
let allowCopy = false;   // true только пока копируем сами (кнопки «Email», «Telegram»...)

function showToast(msg, ms = 2000) {
    const toast = $('copy-toast');
    if (!toast) return;
    // \n = вторая строка: на телефоне две строки, на ПК одна строка через « · »
    const narrow = window.matchMedia('(max-width: 700px)').matches;
    toast.textContent = narrow ? msg : msg.replace(/\n/g, ' · ');
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), ms);
}

function legacyCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;top:-100px;opacity:0;user-select:text;-webkit-user-select:text;';
    document.body.appendChild(ta);
    ta.select();
    allowCopy = true;
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    allowCopy = false;
    ta.remove();
    return ok;
}

// Аккаунтов пока нет: вместо копирования показываем сообщение (на английском).
// Когда появятся, удалите нужную строку из списка, и ссылка снова будет копироваться.
const NOT_READY = {
    'toast.telegram': 'toast.telegram_na',
    'toast.behance': 'toast.behance_na'
};

function copyAction(text, message) {
    if (NOT_READY[message]) {
        showToast(t(NOT_READY[message]), 2500);
        return;
    }
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => showToast(t(message)))
            .catch(() => { if (legacyCopy(text)) showToast(t(message)); });
    } else if (legacyCopy(text)) {
        showToast(t(message));
    }
}


/* =========================================================
   НАВИГАЦИЯ: подменю Works на телефоне
   ========================================================= */
const worksItem = document.querySelector('.nav-item-works');
if (worksItem) {
    const worksLink = worksItem.querySelector('a');
    const touchNav = window.matchMedia('(max-width: 700px), (hover: none)');
    const closeWorks = () => worksItem.classList.remove('open');

    worksLink.addEventListener('click', (e) => {
        if (!touchNav.matches) return;
        e.preventDefault();                       // не прыгаем к разделу, а раскрываем меню
        worksItem.classList.toggle('open');
    });
    worksItem.querySelectorAll('.submenu a').forEach(a => a.addEventListener('click', closeWorks));
    document.addEventListener('click', (e) => { if (!e.target.closest('nav')) closeWorks(); });
    window.addEventListener('scroll', closeWorks, { passive: true });
}


/* =========================================================
   НАВЫКИ
   ========================================================= */
// Кнопка «Explore more tools»
(() => {
    const toggle = $('skill-toggle');
    const extra = $('extra-skills');
    if (!toggle || !extra) return;

    const text = toggle.querySelector('.toggle-text');
    const inner = extra.querySelector('.more-skills-inner');
    let isOpen = false;
    let closeTimer, resetTimer;
    window.refreshToggleText = () => { text.textContent = t(isOpen ? 'skills.less' : 'skills.more'); };

    toggle.addEventListener('click', () => {
        clearTimeout(closeTimer);
        clearTimeout(resetTimer);
        isOpen = !isOpen;

        if (isOpen) {
            inner.style.opacity = '';
            inner.style.transition = '';
            extra.classList.add('open');
            toggle.classList.add('active');
            text.textContent = t('skills.less');
            setTimeout(refreshAOS, 100);          // блок успевает начать раскрываться
        } else {
            inner.style.transition = 'opacity 0.2s ease';
            inner.style.opacity = '0';
            closeTimer = setTimeout(() => {
                extra.classList.remove('open');
                toggle.classList.remove('active');
                text.textContent = t('skills.more');
                resetTimer = setTimeout(() => {
                    inner.style.opacity = '';
                    inner.style.transition = '';
                }, 420);
            }, 220);
        }
    });
})();

// Кнопка Adobe Suite
(() => {
    const btn = $('adobe-btn');
    const content = $('adobe-content');
    if (!btn || !content) return;

    btn.addEventListener('click', () => {
        content.classList.toggle('active');
        if (content.classList.contains('active')) {
            setTimeout(() => content.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 300);
        }
        refreshAOS();
    });
})();

// Иконки: ЧБ -> цветная версия при наведении (если задан data-hover)
document.querySelectorAll('.skill-icon[data-hover]').forEach(icon => {
    const original = icon.src;
    const hover = icon.dataset.hover;
    const pill = icon.closest('.skill-pill');
    if (!pill) return;
    pill.addEventListener('mouseenter', () => { icon.src = hover; });
    pill.addEventListener('mouseleave', () => { icon.src = original; });
});


/* =========================================================
   ВИДЕО В КАРТОЧКАХ
   ========================================================= */
document.querySelectorAll('.bento-item').forEach(item => {
    const video = item.querySelector('.bento-video');
    if (!video) return;

    const coverTime = parseFloat(video.dataset.start) || 0;
    const playTime = parseFloat(video.dataset.playFrom) || 0;

    // кадр-обложка
    video.addEventListener('loadedmetadata', () => { video.currentTime = coverTime; });

    // играет только при наведении МЫШИ (палец игнорируем)
    item.addEventListener('pointerenter', (e) => {
        if (e.pointerType !== 'mouse') return;
        video.currentTime = playTime;
        video.playbackRate = parseFloat(video.dataset.speed) || 1;
        video.play().catch(() => {});
    });
    item.addEventListener('pointerleave', (e) => {
        if (e.pointerType !== 'mouse') return;
        video.pause();
        requestAnimationFrame(() => { video.currentTime = coverTime; });
    });
});

// Загружаем видео, только когда карточка почти появилась на экране
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const v = entry.target;
        v.preload = 'metadata';
        v.load();
        videoObserver.unobserve(v);
    });
}, { rootMargin: '300px' });
document.querySelectorAll('.bento-video').forEach(v => videoObserver.observe(v));


/* =========================================================
   КУРСОР, ПАРАЛЛАКС БУКВ, НАКЛОН ТЕЛЕФОНА
   ========================================================= */
const aura = $('cursor-aura');
const letters = document.querySelectorAll('#title-anim span');
const hero = $('home');

// Откуда вылетает каждая буква
const flyPoints = [
    { x: -120, y: -80 }, { x: 50, y: -150 }, { x: -180, y: 60 },
    { x: 100, y: 120 },  { x: -30, y: -100 }, { x: 140, y: -40 },
    { x: -90, y: 110 },  { x: 40, y: -70 },   { x: 80, y: 90 }
];

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetX = mouseX;
let targetY = mouseY;
let heroVisible = true;

const particles = Array.from(letters).map((el, i) => ({
    el,
    v: parseFloat(el.dataset.v) || 0.05,
    flyX: flyPoints[i]?.x || 0,
    flyY: flyPoints[i]?.y || 0
}));

// Мышь
let firstMove = false;
document.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    targetX = e.clientX;
    targetY = e.clientY;
    if (!firstMove) {
        firstMove = true;
        aura?.classList.add('is-moving');
    }
});

// Свечение становится зелёным над интерактивными элементами
const HOVER_SELECTOR = 'a, button, .skill-pill, .bento-item, #skill-toggle, .modal-close, .copy-link, .nav-arrow, .thumb-item';
document.addEventListener('pointerover', (e) => {
    if (e.pointerType !== 'mouse' || !aura) return;
    aura.classList.toggle('active-secondary', !!e.target.closest(HOVER_SELECTOR));
});

// Буквы появляются
setTimeout(() => letters.forEach(s => s.classList.add('visible')), 100);

// Не считаем параллакс, когда героя не видно
if (hero) {
    new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; }).observe(hero);
}

// Главный цикл
function tick() {
    mouseX += (targetX - mouseX) * 0.1;
    mouseY += (targetY - mouseY) * 0.1;

    if (aura) {
        aura.style.left = `${mouseX}px`;
        aura.style.top = `${mouseY}px`;
    }

    if (heroVisible) {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        particles.forEach(p => {
            p.flyX += (0 - p.flyX) * 0.02;
            p.flyY += (0 - p.flyY) * 0.02;
            const x = p.flyX + (cx - mouseX) * p.v;
            const y = p.flyY + (cy - mouseY) * p.v;
            p.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    }
    requestAnimationFrame(tick);
}
tick();

// Наклон телефона двигает буквы
if (isTouch()) {
    let base = null;   // «ровное» положение запоминается само

    const handleTilt = (e) => {
        if (e.gamma === null || e.beta === null) return;
        if (!base) base = { g: e.gamma, b: e.beta };
        const dx = clamp(e.gamma - base.g, -25, 25) / 25;
        const dy = clamp(e.beta - base.b, -25, 25) / 25;
        targetX = window.innerWidth / 2 + dx * window.innerWidth / 2;
        targetY = window.innerHeight / 2 + dy * window.innerHeight / 2;
    };
    const startTilt = () => window.addEventListener('deviceorientation', handleTilt);

    const needsPermission = typeof DeviceOrientationEvent !== 'undefined' &&
                            typeof DeviceOrientationEvent.requestPermission === 'function';
    if (needsPermission) {
        // iPhone / iPad: разрешение можно спросить только после касания
        document.addEventListener('click', () => {
            DeviceOrientationEvent.requestPermission()
                .then(state => { if (state === 'granted') startTilt(); })
                .catch(() => {});
        }, { once: true });
    } else {
        startTilt();   // Android
    }
}


/* =========================================================
   МОДАЛКА ПРОЕКТА
   ========================================================= */
const modal = $('project-modal');
let currentProject = null;     // объект галерей проекта или null (одиночное превью)
let currentGallery = '';       // ключ активной галереи
let currentIndex = 0;
let savedScrollY = 0;
let lightboxMode = 'gallery';  // 'gallery' | 'single'
let currentId = null;          // id проекта из PROJECTS
let currentProjectKey = null;  // ключ в projectsData
let fallbackDesc = '';         // общее описание, если у картинки своего нет

const isModalOpen = () => modal.style.display === 'flex';
const lightbox = () => $('internal-lightbox');
const isLightboxOpen = () => lightbox()?.style.display === 'flex';
const currentItems = () => currentProject[currentGallery];

/* ----- Блокировка прокрутки страницы ----- */
function lockScroll() {
    savedScrollY = window.scrollY || window.pageYOffset;
    document.body.style.top = `-${savedScrollY}px`;
    document.body.classList.add('modal-open');
}
function unlockScroll() {
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' });
}

/* ----- Кнопка «Назад» на телефоне ----- */
let historyPushed = false;
function pushModalState() {
    if (historyPushed) return;
    history.pushState({ modal: true }, '');
    historyPushed = true;
}
window.addEventListener('popstate', () => {
    historyPushed = false;
    // 1) открыт полноэкранный просмотр: закрываем только его
    if (isLightboxOpen()) {
        closeLightboxNow();
        pushModalState();          // модалка осталась, возвращаем «шаг»
        return;
    }
    // 2) иначе закрываем модалку
    if (isModalOpen()) closeModal();
});

/* ----- Открытие ----- */
// openModal(title, tech, category, description, type, src, projectKey?, variant?)
function openModal(title, tech, cat, desc, type, thumb, projectKey = null, variant = '', id = null) {
    currentId = id;
    currentProjectKey = projectKey ? String(projectKey).trim() : null;
    fallbackDesc = desc || '';
    lockScroll();
    pushModalState();

    $('modal-title').textContent = title || 'Проект';
    $('modal-category').textContent = cat || '—';
    $('modal-tech').textContent = tech || '—';
    $('modal-desc').innerHTML = desc || '';
    $('modal-gallery').innerHTML = '';

    currentProject = projectKey ? (projectsData[String(projectKey).trim()] || null) : null;
    if (projectKey && !currentProject) console.error('Галерея не найдена:', projectKey);

    if (currentProject) {
        currentGallery = Object.keys(currentProject)[0];
        currentIndex = 0;
        renderGallery();
    } else {
        renderSingle(type, thumb, title, variant);
    }

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal-content').scrollTop = 0;

    if (type === 'website' && !currentProject) requestAnimationFrame(scaleWebsiteFrame);
}

// Проекты с галереей (короткая запись для HTML)
function openGalleryModal(title, tech, cat, desc, thumb, projectKey) {
    openModal(title, tech, cat, desc, 'img', thumb, projectKey);
}

/* ----- Закрытие ----- */
function closeModal() {
    if (historyPushed) {           // закрыли крестиком: убираем лишний шаг истории
        historyPushed = false;
        history.back();
    }
    closeLightboxNow(false);
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    $('modal-gallery').innerHTML = '';   // останавливаем видео и iframe
    currentProject = null;
    unlockScroll();
}

modal.addEventListener('click', (e) => { if (e.target.id === 'project-modal') closeModal(); });

// Карточки проектов: <div data-project="id"> -> данные из PROJECTS (data.js)
function openProject(id) {
    const p = PROJECTS[id];
    if (!p) return console.error('Проект не найден:', id);
    openModal(tr(p.title), p.tech, p.cat, tr(p.desc), p.type || 'img', p.src, p.gallery || null, p.variant || '', id);
}
document.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('click', () => openProject(card.dataset.project));
});

// Описание картинки в галерее на текущем языке
function galleryDesc(i) {
    const item = currentItems()[i];
    if (currentLang !== 'ru') {
        const v = (typeof GALLERY_I18N !== 'undefined') &&
                  GALLERY_I18N[currentProjectKey]?.[currentGallery]?.[currentLang];
        if (v) return Array.isArray(v) ? (v[i] ?? item.desc ?? '') : v;
    }
    return item.desc || '';
}

// Смена языка: обновляем подпись кнопки навыков и открытую модалку
window.onLangChange = () => {
    window.refreshToggleText?.();
    if (!isModalOpen() || !currentId) return;
    const p = PROJECTS[currentId];
    $('modal-title').textContent = tr(p.title);
    fallbackDesc = tr(p.desc) || '';
    $('modal-desc').innerHTML = currentProject ? (galleryDesc(currentIndex) || fallbackDesc) : fallbackDesc;
};

/* ----- Одиночное превью: figma / сайт / 3D / видео / картинка ----- */
function renderSingle(type, src, title, variant) {
    const box = document.createElement('div');
    box.className = `main-image-nav ${variant}`.trim();
    const s = esc(src);

    if (type === 'figma') {
        box.innerHTML = `
            <div style="width:100%; display:flex; justify-content:center;">
                <iframe style="border:1px solid rgba(0,0,0,0.1); width:100%; max-width:1918px; height:auto; aspect-ratio:1920/1080; border-radius:20px;"
                        src="${s}" allowfullscreen></iframe>
            </div>`;
    } else if (type === 'website') {
        box.innerHTML = `
            <div class="website-frame-outer" id="websiteFrameOuter">
                <div class="website-fullscreen-btn"><i class="fa-solid fa-expand"></i></div>
                <iframe id="websiteIframe" src="${s}" loading="lazy"></iframe>
            </div>`;
        box.querySelector('.website-fullscreen-btn')
            .addEventListener('click', () => openWebsiteLightbox(src));
    } else if (type === '3d') {
        box.innerHTML = `<model-viewer src="${s}" auto-rotate camera-controls shadow-intensity="1" ar style="width:100%; height:400px;"></model-viewer>`;
    } else if (type === 'motion') {
        box.innerHTML = `<video id="mainSingleVideo" autoplay loop muted playsinline style="width:100%; border-radius:20px; cursor:zoom-in;"><source src="${s}" type="video/mp4"></video>`;
        const v = box.querySelector('video');
        v.playbackRate = variant.includes('fast') ? 1.5 : 1;
        v.addEventListener('click', () => openLightboxSingle('motion', src, title));
    } else if (type === 'img') {
        box.innerHTML = `<img src="${s}" alt="${esc(title || 'Изображение')}" style="cursor:zoom-in;">`;
        box.querySelector('img').addEventListener('click', () => openLightboxSingle('img', src, title));
    } else {
        box.innerHTML = '<div class="preview-placeholder">Превью скоро появится</div>';
    }

    $('modal-gallery').appendChild(box);
}

/* =========================================================
   ГАЛЕРЕЯ ВНУТРИ МОДАЛКИ
   ========================================================= */
function makeArrow(dir, handler, style = '') {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `nav-arrow ${dir < 0 ? 'prev-arrow' : 'next-arrow'}`;
    b.textContent = dir < 0 ? '❮' : '❯';
    if (style) b.style.cssText = style;
    b.addEventListener('click', (e) => { e.stopPropagation(); handler(dir); });
    return b;
}

// Строим каркас галереи (при открытии и при смене вкладки Posters / Sketches)
function renderGallery() {
    const root = $('modal-gallery');
    const keys = Object.keys(currentProject);
    const items = currentItems();
    root.innerHTML = '';

    // переключатель вкладок, только если галерей несколько
    if (keys.length > 1) {
        const sw = document.createElement('div');
        sw.className = 'gallery-switcher';
        keys.forEach(key => {
            const b = document.createElement('button');
            b.type = 'button';
            b.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            if (key === currentGallery) b.classList.add('active');
            b.addEventListener('click', () => switchGallery(key));
            sw.appendChild(b);
        });
        root.appendChild(sw);
    }

    // главное изображение; стрелки не создаём на телефоне (там свайп)
    const nav = document.createElement('div');
    nav.className = 'main-image-nav';
    const img = document.createElement('img');
    img.id = 'mainGalleryImg';
    img.alt = '';
    img.addEventListener('click', openLightbox);

    const showArrows = !isTouch() && items.length > 1;
    if (showArrows) nav.appendChild(makeArrow(-1, changeSlide));
    nav.appendChild(img);
    if (showArrows) nav.appendChild(makeArrow(1, changeSlide));
    root.appendChild(nav);

    // миниатюры
    const thumbs = document.createElement('div');
    thumbs.className = 'thumb-scroll-container';
    thumbs.innerHTML = '<div class="thumb-row"></div>';
    root.appendChild(thumbs);

    updateSlide();
}

// Обновляем только то, что меняется при листании (без пересборки, без мигания)
function updateSlide() {
    const items = currentItems();
    const img = $('mainGalleryImg');
    if (img) img.src = items[currentIndex].url;
    $('modal-desc').innerHTML = galleryDesc(currentIndex) || fallbackDesc;

    renderThumbs();

    // подгружаем соседей, чтобы листалось мгновенно
    [-1, 1].forEach(d => preload(items[(currentIndex + d + items.length) % items.length].url));
}

// Миниатюры: окно максимум из 5 штук
function renderThumbs() {
    const row = $('modal-gallery').querySelector('.thumb-row');
    if (!row) return;
    const items = currentItems();
    const max = 5;
    const start = items.length > max
        ? clamp(currentIndex - Math.floor(max / 2), 0, items.length - max)
        : 0;
    const end = Math.min(items.length, start + max);

    row.innerHTML = '';
    for (let i = start; i < end; i++) {
        const t = document.createElement('div');
        t.className = 'thumb-item' + (i === currentIndex ? ' active' : '');
        const im = new Image();
        im.src = items[i].url;
        im.alt = '';
        t.appendChild(im);
        t.addEventListener('click', () => setSlide(i));
        row.appendChild(t);
    }
}

function switchGallery(key) {
    if (!currentProject?.[key]) return;
    currentGallery = key;
    currentIndex = 0;
    renderGallery();
}
function changeSlide(step) {
    if (!currentProject) return;
    const n = currentItems().length;
    currentIndex = (currentIndex + step + n) % n;
    updateSlide();
}
function setSlide(i) {
    currentIndex = i;
    updateSlide();
}


/* =========================================================
   ПОЛНОЭКРАННЫЙ ПРОСМОТР (LIGHTBOX)
   ========================================================= */
function showLightbox(contentNode) {
    const lb = lightbox();
    lb.innerHTML = '';
    lb.appendChild(contentNode);
    lb.style.display = 'flex';
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeLightboxNow(resumeVideo = true) {
    const lb = lightbox();
    if (!lb) return;
    lb.style.display = 'none';
    lb.innerHTML = '';
    lb.setAttribute('aria-hidden', 'true');
    if (resumeVideo) {
        document.querySelectorAll('#modal-gallery video').forEach(v => v.play().catch(() => {}));
    }
}

// Вызывается из HTML (onclick на фоне)
function closeLightbox(e) {
    if (e?.target?.id === 'internal-lightbox') closeLightboxNow();
}

function wrapMedia(html) {
    const wm = document.createElement('div');
    wm.className = 'wm';
    wm.innerHTML = html;
    return wm;
}

// Галерея на весь экран
function openLightbox() {
    lightboxMode = 'gallery';
    const frag = document.createDocumentFragment();
    const showArrows = !isTouch() && currentItems().length > 1;

    if (showArrows) frag.appendChild(makeArrow(-1, changeSlideLB, 'left:40px;'));
    frag.appendChild(wrapMedia(`<img src="${esc(currentItems()[currentIndex].url)}" alt="">`));
    if (showArrows) frag.appendChild(makeArrow(1, changeSlideLB, 'right:40px;'));

    const holder = document.createDocumentFragment();
    holder.appendChild(frag);
    const lb = lightbox();
    lb.innerHTML = '';
    lb.appendChild(holder);
    lb.style.display = 'flex';
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function changeSlideLB(step) {
    changeSlide(step);
    const img = lightbox().querySelector('img');
    if (img) img.src = currentItems()[currentIndex].url;
}

// Одиночная картинка / видео на весь экран
function openLightboxSingle(type, src, title = '') {
    lightboxMode = 'single';
    document.querySelectorAll('#modal-gallery video').forEach(v => v.pause());   // не крутим второе видео под лайтбоксом

    const wm = type === 'motion'
        ? wrapMedia(`<video autoplay loop muted playsinline controls
                            style="opacity:0; transition:opacity 0.3s ease"
                            controlsList="nodownload noplaybackrate"
                            disablePictureInPicture disableRemotePlayback>
                         <source src="${esc(src)}" type="video/mp4">
                     </video>`)
        : wrapMedia(`<img src="${esc(src)}" alt="${esc(title)}">`);

    const video = wm.querySelector('video');
    if (video) video.addEventListener('loadedmetadata', () => { video.style.opacity = 1; });
    showLightbox(wm);
}

// Сайт на весь экран
function openWebsiteLightbox(url) {
    lightboxMode = 'single';
    const wrap = document.createElement('div');
    wrap.className = 'lightbox-iframe-wrap';
    wrap.id = 'lbIframeWrap';
    wrap.innerHTML = `<iframe id="lbIframe" src="${esc(url)}" loading="lazy"></iframe>`;
    showLightbox(wrap);
    requestAnimationFrame(scaleLightboxFrame);
}

/* ----- Масштаб сайта во фрейме: всегда показываем десктопную версию ----- */
function scaleWebsiteFrame() {
    const outer = $('websiteFrameOuter');
    const iframe = $('websiteIframe');
    if (!outer || !iframe) return;
    iframe.style.transformOrigin = '0 0';
    iframe.style.transform = `scale(${outer.clientWidth / 1440})`;
}

function scaleLightboxFrame() {
    const wrap = $('lbIframeWrap');
    const iframe = $('lbIframe');
    if (!wrap || !iframe) return;
    const scale = Math.min(wrap.clientWidth / 1440, wrap.clientHeight / 900);   // целиком, без обрезки футера
    iframe.style.transform = `scale(${scale})`;
    iframe.style.left = `${(wrap.clientWidth - 1440 * scale) / 2}px`;
    iframe.style.top = `${(wrap.clientHeight - 900 * scale) / 2}px`;
}

let resizeRaf;
window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => {
        scaleWebsiteFrame();
        scaleLightboxFrame();
    });
});


/* =========================================================
   КЛАВИАТУРА И СВАЙПЫ
   ========================================================= */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (isLightboxOpen()) closeLightboxNow();
        else if (isModalOpen()) closeModal();
        return;
    }
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const step = e.key === 'ArrowLeft' ? -1 : 1;

    if (isLightboxOpen()) {
        if (lightboxMode === 'gallery' && currentProject) changeSlideLB(step);
    } else if (isModalOpen() && currentProject) {
        changeSlide(step);
    }
});

// Свайп: влево -> следующая, вправо -> предыдущая
function addSwipe(el, onSwipe) {
    if (!el) return;
    let x0 = 0, y0 = 0, tracking = false;

    el.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) { tracking = false; return; }   // два пальца (зум) не считаем
        x0 = e.touches[0].clientX;
        y0 = e.touches[0].clientY;
        tracking = true;
    }, { passive: true });

    el.addEventListener('touchend', (e) => {
        if (!tracking) return;
        tracking = false;
        const t = e.changedTouches[0];
        const dx = t.clientX - x0;
        const dy = t.clientY - y0;
        // нужен горизонтальный жест: от 50px и заметно длиннее вертикального
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        onSwipe(dx < 0 ? 1 : -1, e);
    }, { passive: true });
}

// В окне проекта: только по главной картинке галереи
addSwipe($('modal-gallery'), (dir, e) => {
    if (!currentProject || !e.target.closest('.main-image-nav')) return;
    changeSlide(dir);
});
// В полноэкранном просмотре галереи
addSwipe(lightbox(), (dir) => {
    if (lightboxMode === 'gallery' && currentProject) changeSlideLB(dir);
});


/* =========================================================
   ЗАЩИТА ОТ КОПИРОВАНИЯ
   ========================================================= */
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showToast(copyrightMsg(), 3000);
});

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const ctrl = e.ctrlKey || e.metaKey;
    const blocked =
        e.key === 'F12' ||
        (ctrl && ['s', 'u', 'p'].includes(key)) ||                // сохранить, исходник, печать
        (ctrl && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||  // DevTools (Windows)
        (e.metaKey && e.altKey && ['i', 'j', 'u'].includes(key)); // DevTools (Mac)
    if (blocked) {
        e.preventDefault();
        e.stopPropagation();
        showToast(copyrightMsg(), 3000);
    }
}, true);

document.addEventListener('copy', (e) => {
    if (allowCopy) return;           // наши кнопки «скопировать контакт» работают
    e.preventDefault();
    showToast(copyrightMsg(), 3000);
});
document.addEventListener('cut', (e) => e.preventDefault());
document.addEventListener('dragstart', (e) => {
    if (e.target.closest?.('img, video')) e.preventDefault();
});


/* =========================================================
   ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ onclick В HTML
   ========================================================= */
Object.assign(window, {
    openModal,
    openProject,
    openGalleryModal,
    closeModal,
    closeLightbox,
    openWebsiteLightbox,
    copyAction
});

// Стартовый язык
setLang(detectLang());

})();
