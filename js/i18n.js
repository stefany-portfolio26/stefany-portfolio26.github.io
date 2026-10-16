/* =========================================================
   I18N: переводы интерфейса и переключение языка (ru / uk / en)
   Подключается ПЕРЕД data.js и main.js.

   Как добавить свой текст:
   1) в HTML:  <p data-i18n="my.key">Текст по умолчанию</p>
   2) здесь:   в каждый язык добавить 'my.key': '...'
   Описания проектов лежат в data.js (PROJECTS и GALLERY_I18N).
   ========================================================= */
const I18N = {
    ru: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.works': 'Works',
        'nav.digital': 'Digital',
        'nav.visual': 'Visual',
        'nav.motion': '3D & Motion',
        'hero.sub': 'ЖУРАВЛЕВА СТЕФАНИЯ // 2026',
        'about.desc': 'Живой набросок и цифровое пространство.',
        'about.edu': 'Education',
        'about.eduval': "ВХУТЕИН '26",
        'about.focus': 'Focus',
        'about.contacts': 'Contacts',
        'about.social': 'Social',
        'cat.digital': 'Digital & Web',
        'cat.visual': 'Visual Arts',
        'cat.motion': '3D & Motion',
        'skills.click': 'click',
        'skills.more': 'Explore more tools',
        'skills.less': 'Collapse tools',
        'footer.tag': "Let's create something",
        'footer.contact': 'contact',
        'footer.me': 'me?',
        'footer.legal2': 'Охраняется авторским правом. Копирование и обучение нейросетей без письменного разрешения запрещены.',
        'toast.email': 'Email copied',
        'toast.telegram': 'Telegram link copied',
        'toast.behance': 'Behance link copied',
        'toast.copyright': '© 2026 Stefany Zhuravleva\nКопирование запрещено',
        'toast.telegram_na': 'Copying is not available yet',
        'toast.behance_na': 'Copying is not available yet'
    },
    uk: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.works': 'Works',
        'nav.digital': 'Digital',
        'nav.visual': 'Visual',
        'nav.motion': '3D & Motion',
        'hero.sub': 'ЖУРАВЛЬОВА СТЕФАНІЯ // 2026',
        'about.desc': 'Живий начерк і цифровий простір.',
        'about.edu': 'Education',
        'about.eduval': "ВХУТЕЇН  '26",
        'about.focus': 'Focus',
        'about.contacts': 'Contacts',
        'about.social': 'Social',
        'cat.digital': 'Digital & Web',
        'cat.visual': 'Visual Arts',
        'cat.motion': '3D & Motion',
        'skills.click': 'click',
        'skills.more': 'Explore more tools',
        'skills.less': 'Collapse tools',
        'footer.tag': "Let's create something",
        'footer.contact': 'contact',
        'footer.me': 'me?',
        'footer.legal2': 'Охороняється авторським правом. Копіювання та навчання нейромереж без письмового дозволу заборонені.',
        'toast.email': 'Email copied',
        'toast.telegram': 'Telegram link copied',
        'toast.behance': 'Behance link copied',
        'toast.copyright': '© 2026 Stefany Zhuravleva\nКопіювання заборонено',
        'toast.telegram_na': 'Copying is not available yet',
        'toast.behance_na': 'Copying is not available yet'
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.works': 'Works',
        'nav.digital': 'Digital',
        'nav.visual': 'Visual',
        'nav.motion': '3D & Motion',
        'hero.sub': 'STEFANY ZHURAVLEVA // 2026',
        'about.desc': 'A living sketch and a digital space.',
        'about.edu': 'Education',
        'about.eduval': "VHUTEIN '26",
        'about.focus': 'Focus',
        'about.contacts': 'Contacts',
        'about.social': 'Social',
        'cat.digital': 'Digital & Web',
        'cat.visual': 'Visual Arts',
        'cat.motion': '3D & Motion',
        'skills.click': 'click',
        'skills.more': 'Explore more tools',
        'skills.less': 'Collapse tools',
        'footer.tag': "Let's create something",
        'footer.contact': 'contact',
        'footer.me': 'me?',
        'footer.legal2': '',   // пусто: английская строка выше уже есть, пустой абзац скрывается через CSS
        'toast.email': 'Email copied',
        'toast.telegram': 'Telegram link copied',
        'toast.behance': 'Behance link copied',
        'toast.copyright': '© 2026 Stefany Zhuravleva\nCopying is prohibited',
        'toast.telegram_na': 'Copying is not available yet',
        'toast.behance_na': 'Copying is not available yet'
    }
};

const LANGS = ['ru', 'uk', 'en'];
let currentLang = 'ru';

// t('ключ') -> строка интерфейса на текущем языке (нет перевода: русский, потом сам ключ)
const t = (key) => I18N[currentLang]?.[key] ?? I18N.ru[key] ?? key;

// tr(значение) -> строка из { ru, uk, en } (нет перевода: русский)
const tr = (v) => (v && typeof v === 'object') ? (v[currentLang] ?? v.ru ?? '') : (v ?? '');

// Язык при первой загрузке: выбранный вручную, иначе первый поддерживаемый из языков
// браузера/системы (ru, uk, en), иначе английский
function detectLang() {
    try {
        const saved = localStorage.getItem('lang');
        if (LANGS.includes(saved)) return saved;
    } catch (e) {}
    const list = (navigator.languages && navigator.languages.length)
        ? navigator.languages : [navigator.language || ''];
    for (const l of list) {
        let code = String(l).slice(0, 2).toLowerCase();
        if (code === 'ua') code = 'uk';           // иногда вместо uk пишут ua
        if (LANGS.includes(code)) return code;
    }
    return 'en';                                    // язык не распознан: английский
}

function setLang(lang) {
    if (!LANGS.includes(lang)) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem('lang', lang); } catch (e) {}

    // статичные тексты страницы
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });

    // названия на карточках проектов
    if (typeof PROJECTS !== 'undefined') {
        document.querySelectorAll('[data-project]').forEach(card => {
            const p = PROJECTS[card.dataset.project];
            const h3 = card.querySelector('h3');
            if (p && h3) h3.textContent = tr(p.card || p.title);
        });
    }

    // главная кнопка показывает текущий язык, в списке прячется он же
    document.querySelectorAll('[data-lang-label]').forEach(el => {
        el.textContent = lang === 'uk' ? 'UA' : lang.toUpperCase();
    });
    document.querySelectorAll('.lang-menu button').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === lang));
    document.getElementById('lang-switch')?.classList.remove('open');

    // main.js обновит открытую модалку и подпись «Explore more tools»
    if (typeof window.onLangChange === 'function') window.onLangChange();
}

/* ----- Выпадающий список языков: по нажатию (телефон) и с клавиатуры ----- */
(() => {
    const box = document.getElementById('lang-switch');
    if (!box) return;
    const current = box.querySelector('.lang-current');

    const setOpen = (open) => {
        box.classList.toggle('open', open);
        current.setAttribute('aria-expanded', String(open));
    };

    current.addEventListener('click', () => setOpen(!box.classList.contains('open')));
    box.addEventListener('mouseleave', () => setOpen(false));        // мышь ушла: закрываем
    document.addEventListener('click', (e) => { if (!e.target.closest('#lang-switch')) setOpen(false); });

    // На телефоне кнопка не занимает место при чтении: уходит при прокрутке, возвращается наверху
    const phone = window.matchMedia('(max-width: 700px), (hover: none)');
    const syncVisibility = () => {
        const hide = phone.matches && window.scrollY > 30;
        box.classList.toggle('is-hidden', hide);
        if (hide) setOpen(false);
    };
    window.addEventListener('scroll', syncVisibility, { passive: true });
    window.addEventListener('resize', syncVisibility);
    syncVisibility();
})();
