/* ===== ДАННЫЕ ПРОЕКТОВ =====
   Форма projectsData НЕ изменилась: проект -> галерея -> массив { url, desc }.
   Поэтому renderGallery(), openModal() и всё остальное в твоём JS работает как раньше.
   Разница только в том, как мы заполняем массивы: вместо копирования одного и того же
   описания 28 раз пишем его один раз и размножаем функцией. */

// Берёт ОДНО описание и список картинок, возвращает [{url, desc}, ...]
const gallery = (desc, urls) => urls.map(url => ({ url, desc }));

// Делает список путей: numbered('img/comics', 1, 6) -> img/comics1.webp ... img/comics6.webp
const numbered = (prefix, from, to) =>
    Array.from({ length: to - from + 1 }, (_, i) => `${prefix}${from + i}.webp`);

const projectsData = {

    visualArts: {
        posters: gallery(
            'Серия постеров о гривистом волке: обитатель южноамериканских саванн в разных сценах и состояниях.<br><br> <b>Стиль:</b> Многослойная графика с фактурой бумаги и приглушённой природной палитрой.<br> <b>Формат:</b> Вертикальные постеры, объединённые общим героем и цветовой логикой.',
            numbered('img/g', 1, 5)
        ),
        sketches: gallery(
            'Наброски к серии о гривистом волке: поиск поз, композиций и атмосферы будущих работ.<br><br> <b>Назначение:</b> Первые визуальные решения, из которых вырастали финальные постеры.<br> <b>Характер:</b> Свободный мазок, живые силуэты и фактура, сохранившая энергию рисунка.',
            numbered('img/sc', 1, 3)
        )
    },

    frogKiwi: {
        // Здесь описания у картинок разные, поэтому общую первую часть вынесли в переменную
        frog: (() => {
            const intro = 'Авторский паттерн с лягушкой для пижамного комплекта цвета свежей травы.<br><br> ';
            return [
                { url: 'img/jamsfrog.webp',    desc: intro + '<b>Визуализация на изделии:</b> Рубашка и шорты с нанесённым принтом.' },
                { url: 'img/patternfrog.webp', desc: intro + '<b>Модуль:</b> Базовый фрагмент, из которого строится вся композиция принта.' },
                { url: 'img/bigfrog.webp',     desc: intro + '<b>Бесшовный повтор:</b> Модуль, тиражированный в сплошное полотно.' }
            ];
        })(),
        kiwi: (() => {
            const intro = 'Авторский паттерн с киви для пижамного комплекта оттенка барвинка.<br><br> ';
            return [
                { url: 'img/jamskiwi.webp',    desc: intro + '<b>Визуализация на изделии:</b> Рубашка и шорты с нанесённым принтом.' },
                { url: 'img/patternkiwi.webp', desc: intro + '<b>Модуль:</b> Базовый фрагмент, из которого строится вся композиция принта.' },
                { url: 'img/bigkiwi.webp',     desc: intro + '<b>Бесшовный повтор:</b> Модуль, тиражированный в сплошное полотно.' }
            ];
        })()
    },

    Comics: {
        alter: gallery(
            'Авторский комикс по мотивам басни Ивана Крылова «Мартышка и очки».<br><br> <b>Графика:</b> Цифровая иллюстрация, нарисованная от руки, с мягкой фактурой шерсти.<br> <b>Палитра:</b> Тёплый оранжевый героини на фоне приглушённых серо-коричневых тонов.<br> <b>Раскадровка:</b> Страницы с разным ритмом кадров, от крупных планов до динамичных сцен.',
            numbered('img/comics', 1, 6)
        )
    },

    Guidelines: {
        alter: gallery(
            'Практическое руководство по стилю.<br><br> <b>Идея:</b> Баланс стабильности и движения.<br> <b>Графика:</b> Построение по модульной сетке, чёткие пропорции и охранное поле вокруг логотипа.<br> <b>Палитра:</b> Контраст фирменного лавандового и белого цветов.<br> <b>Применение:</b> Универсальная система. Логотип легко адаптируется под любые задачи: от иконки сайта до фирменных бланков, шопперов и футболок.',
            // Первый файл называется без цифры (Guidelines.webp), остальные Guidelines2..28
            ['img/Guidelines.webp', ...numbered('img/Guidelines', 2, 28)]
        )
    },

    Logobook: {
        pages: gallery(
            'Разработка фирменного стиля городского пространства.<br><br> <b>Концепт:</b> Гибрид волка и кофейной чашки, объединяющий тепло общения и любовь к собакам.<br> <b>Графика:</b> Шутливая типографика и авторский кастомный знак.<br> <b>Стиль:</b> Мягкий, игривый и открытый бренд-дизайн.<br> <b>Атмосфера:</b> Уютная палитра «тёмного шоколада», «тёплой карамели» и «сливочного масла» для создания домашнего комфорта.',
            numbered('img/logobook', 1, 12)
        )
    },

    Ornament: {
        images: [
            { url: 'img/ornament.webp', desc: 'Орнамент в традиции мезенской росписи: от рисунка на бумаге до векторной графики.<br><br> <b>Эскиз:</b> Исходный рисунок выполнен вручную на бумаге и затем перенесён в вектор.<br> <b>Вектор:</b> Орнамент в векторном виде.' },
            { url: 'img/plate.webp',    desc: 'Орнамент в традиции мезенской росписи: от рисунка на бумаге до векторной графики.<br><br> <b>Эскиз:</b> Исходный рисунок выполнен вручную на бумаге и затем перенесён в вектор.<br> <b>Визуализация:</b> Орнамент на деревянной тарелке.' }
        ]
    },

    Stilllife: {
        images: gallery(
            'Серия натюрмортов, нарисованных с натуры в векторе.<br><br> <b>Графика:</b> Упрощённые формы, чистые цвета и выразительные силуэты.<br> <b>Инструмент:</b> Векторная графика в Figma.',
            numbered('img/stilllife', 1, 4)
        )
    },

    Guara: {
        images: [
            { url: 'img/guara1.webp', desc: 'Открытка с изображением гривистого волка. Рисунок выполнен вручную, отсканирован и скомпонован в графических редакторах.<br><br> <b>Вариант 1:</b> Лаконичная открытка: рисунок и название вида с латинским именем.' },
            { url: 'img/guara2.webp', desc: 'Открытка с изображением гривистого волка. Рисунок выполнен вручную, отсканирован и скомпонован в графических редакторах.<br><br> <b>Вариант 2:</b> Информационная открытка: рядом с рисунком размеры животного и краткие факты о его образе жизни.' }
        ]
    },

    Chestnut: {
        images: [
            { url: 'img/chestnut1.webp', desc: 'Открытка с изображением каштана. Рисунок выполнен вручную, отсканирован и скомпонован в графических редакторах.<br><br> <b>Вариант 1:</b> Вертикальная композиция: название и латинское имя вида над рисунком, соцветия и листья занимают основную часть листа.' },
            { url: 'img/chestnut2.webp', desc: 'Открытка с изображением каштана. Рисунок выполнен вручную, отсканирован и скомпонован в графических редакторах.<br><br> <b>Вариант 2:</b> Вертикальная композиция: ветвь с соцветием и листьями, а название и латинское имя расположены сбоку на свободном поле.' },
            { url: 'img/chestnut3.webp', desc: 'Открытка с изображением каштана. Рисунок выполнен вручную, отсканирован и скомпонован в графических редакторах.<br><br> <b>Вариант 3:</b> Горизонтальная композиция: две ветви по краям листа, а название и латинское имя расположены между ними.' }
        ]
    }

    // можно добавить ещё проекты
};


/* =========================================================
   КАРТОЧКИ ПРОЕКТОВ НА ТРЁХ ЯЗЫКАХ (ru / uk / en)
   В index.html карточка ссылается на проект так: data-project="wolfcafe"
   title / card / desc: если перевода нет, показывается русский.
   ========================================================= */
const PROJECTS = {
  "wolfcafe": {
    "tech": "Figma / Photoshop / Illustrator",
    "cat": "Logo Book",
    "title": {
      "ru": "Логобук кафе «Вульфчик»",
      "uk": "Логобук кафе «Вульфчик»",
      "en": "Vulfchik Café Logobook"
    },
    "card": {
      "ru": "Логобук кафе «Вульфчик»",
      "uk": "Логобук кафе «Вульфчик»",
      "en": "Vulfchik Café Logobook"
    },
    "desc": {
      "ru": "Логобук с примерами использования фирменного стиля."
    },
    "src": "img/logowoolf.webp",
    "gallery": "Logobook"
  },
  "alter": {
    "tech": "Figma / Photoshop / Illustrator",
    "cat": "Branding · Identity · Guidelines",
    "title": {
      "ru": "Гайдлайн студии дизайна «Альтер»",
      "uk": "Гайдлайн дизайн-студії «Альтер»",
      "en": "Alter Design Studio Guidelines"
    },
    "card": {
      "ru": "Гайдлайн студии «Альтер»",
      "uk": "Гайдлайн студії «Альтер»",
      "en": "Alter Studio Guidelines"
    },
    "desc": {
      "ru": "Руководство использования дизайна."
    },
    "src": "img/Guidelines.webp",
    "gallery": "Guidelines"
  },
  "frogkiwi": {
    "tech": "Illustrator / Photoshop",
    "cat": "Pattern",
    "title": {
      "ru": "Frog & Kiwi patterns",
      "uk": "Frog & Kiwi patterns",
      "en": "Frog & Kiwi patterns"
    },
    "card": {
      "ru": "Frog & Kiwi patterns",
      "uk": "Frog & Kiwi patterns",
      "en": "Frog & Kiwi patterns"
    },
    "desc": {
      "ru": "Паттерны для пижамных комплектов."
    },
    "src": "img/frog-kiwi-main.webp",
    "gallery": "frogKiwi"
  },
  "posters": {
    "tech": "Photoshop / Illustrator / Figma",
    "cat": "Poster Series",
    "title": {
      "ru": "Постеры «Гуара»",
      "uk": "Постери «Гуара»",
      "en": "Guara Posters"
    },
    "card": {
      "ru": "Постеры «Гуара»",
      "uk": "Постери «Гуара»",
      "en": "Guara Posters"
    },
    "desc": {
      "ru": "Серия постеров и набросков о гривистом волке."
    },
    "src": "img/g3.webp",
    "gallery": "visualArts"
  },
  "comics": {
    "tech": "Photoshop / MediBang Paint",
    "cat": "Comics",
    "title": {
      "ru": "Комикс по мотивам басни «Мартышка и очки»",
      "uk": "Комікс за мотивами байки «Мавпа й окуляри»",
      "en": "Comic Based on the Fable “The Monkey and the Spectacles”"
    },
    "card": {
      "ru": "Комикс по мотивам басни «Мартышка и очки»",
      "uk": "Комікс за мотивами байки «Мавпа й окуляри»",
      "en": "Comic Based on the Fable “The Monkey and the Spectacles”"
    },
    "desc": {
      "ru": "Комикс по басне Ивана Крылова."
    },
    "src": "img/comicscover.webp",
    "gallery": "Comics"
  },
  "ornament": {
    "tech": "Illustrator / Photoshop",
    "cat": "Ornament",
    "title": {
      "ru": "Мезенская роспись",
      "uk": "Мезенський розпис",
      "en": "Mezen Painting"
    },
    "card": {
      "ru": "Мезенская роспись",
      "uk": "Мезенський розпис",
      "en": "Mezen Painting"
    },
    "desc": {
      "ru": "Орнамент в традиции мезенской росписи."
    },
    "src": "img/ornament1.webp",
    "gallery": "Ornament"
  },
  "stilllife": {
    "tech": "Figma",
    "cat": "Vector Illustration",
    "title": {
      "ru": "Натюрморты",
      "uk": "Натюрморти",
      "en": "Still Lifes"
    },
    "card": {
      "ru": "Натюрморты",
      "uk": "Натюрморти",
      "en": "Still Lifes"
    },
    "desc": {
      "ru": "Серия натюрмортов, нарисованных с натуры в векторе."
    },
    "src": "img/stilllife1.webp",
    "gallery": "Stilllife"
  },
  "guaracards": {
    "tech": "Illustrator / Photoshop",
    "cat": "Postcard",
    "title": {
      "ru": "Открытки «Гривистый волк»",
      "uk": "Листівки «Гривастий вовк»",
      "en": "Maned Wolf Postcards"
    },
    "card": {
      "ru": "Открытки «Гривистый волк»",
      "uk": "Листівки «Гривастий вовк»",
      "en": "Maned Wolf Postcards"
    },
    "desc": {
      "ru": "Две открытки с рисунком гривистого волка."
    },
    "src": "img/guara.webp",
    "gallery": "Guara"
  },
  "chestnut": {
    "tech": "Illustrator / Photoshop",
    "cat": "Postcard",
    "title": {
      "ru": "Открытки «Каштан»",
      "uk": "Листівки «Каштан»",
      "en": "Chestnut Postcards"
    },
    "card": {
      "ru": "Открытки «Каштан»",
      "uk": "Листівки «Каштан»",
      "en": "Chestnut Postcards"
    },
    "desc": {
      "ru": "Три варианта открытки с рисунком каштана."
    },
    "src": "img/chestnut.webp",
    "gallery": "Chestnut"
  },
  "dino": {
    "tech": "Blender - Cycles",
    "cat": "3D Diorama",
    "title": {
      "ru": "Динозаврик из Chrome",
      "uk": "Динозаврик з Chrome",
      "en": "Chrome Dinosaur"
    },
    "card": {
      "ru": "Динозаврик из Chrome",
      "uk": "Динозаврик з Chrome",
      "en": "Chrome Dinosaur"
    },
    "desc": {
      "ru": "Low-poly диорама по мотивам Chrome Dinosaur Game.<br><br> <b>Концепт:</b> Кусочек пустыни в разрезе: на поверхности динозавр среди кактусов и камней, а под ней слои земли с костями.<br> <b>Графика:</b> Low-poly композиция из простых геометрических форм, динозавр собран из кубиков-«пикселей» в духе оригинальной игры.<br> <b>Палитра:</b> Тёплый песок и закатные розово-фиолетовые пласты на спокойном сиреневом фоне.<br> <b>Формат:</b> Статичная сцена, полностью созданная в Blender.",
      "uk": "Low-poly діорама за мотивами Chrome Dinosaur Game.<br><br> <b>Концепт:</b> Шматочок пустелі в розрізі: на поверхні динозавр серед кактусів і каменів, а під нею шари землі з кістками.<br> <b>Графіка:</b> Low-poly композиція з простих геометричних форм, динозавр зібраний із кубиків-«пікселів» у дусі оригінальної гри.<br> <b>Палітра:</b> Теплий пісок і призахідні рожево-фіолетові пласти на спокійному бузковому тлі.<br> <b>Формат:</b> Статична сцена, повністю створена в Blender.",
      "en": "A low-poly diorama inspired by the Chrome Dinosaur Game.<br><br> <b>Concept:</b> A cross-section of the desert: a dinosaur among cacti and rocks on the surface, with layers of earth and bones beneath.<br> <b>Graphics:</b> A low-poly composition of simple geometric shapes; the dinosaur is built from cube “pixels” in the spirit of the original game.<br> <b>Palette:</b> Warm sand and sunset pink-violet strata on a calm lilac background.<br> <b>Format:</b> A static scene made entirely in Blender."
    },
    "src": "img/dino.webp",
    "variant": "square"
  },
  "house": {
    "tech": "Figma / Illustrator / After Effects",
    "cat": "Motion Design",
    "title": {
      "ru": "Анимация дома",
      "uk": "Анімація будинку",
      "en": "House Animation"
    },
    "card": {
      "ru": "Анимация дома",
      "uk": "Анімація будинку",
      "en": "House Animation"
    },
    "desc": {
      "ru": "Векторная иллюстрация здания и анимация её сборки.<br><br> <b>Графика:</b> Дом нарисован в Figma и Illustrator: кирпичная кладка, арочное окно, входная группа и деревья на мягком фоне.<br> <b>Анимация:</b> В After Effects композиция собирается на глазах: элементы появляются один за другим и складываются в цельную картинку.",
      "uk": "Векторна ілюстрація будівлі та анімація її збирання.<br><br> <b>Графіка:</b> Будинок намальовано у Figma та Illustrator: цегляна кладка, арочне вікно, вхідна група й дерева на м’якому тлі.<br> <b>Анімація:</b> В After Effects композиція збирається на очах: елементи з’являються один за одним і складаються в цілісну картинку.",
      "en": "A vector illustration of a building and an animation of it being assembled.<br><br> <b>Graphics:</b> The house is drawn in Figma and Illustrator: brickwork, an arched window, an entrance and trees on a soft background.<br> <b>Animation:</b> In After Effects the composition builds itself before your eyes: elements appear one by one and come together into a complete picture."
    },
    "type": "motion",
    "src": "img/house.mp4",
    "variant": "square fast"
  },
  "mp3": {
    "tech": "Blender - Eevee",
    "cat": "3D Animation",
    "title": {
      "ru": "MP3-плеер",
      "uk": "MP3-плеєр",
      "en": "MP3 Player"
    },
    "card": {
      "ru": "MP3-плеер",
      "uk": "MP3-плеєр",
      "en": "MP3 Player"
    },
    "desc": {
      "ru": "Короткая 3D-анимация MP3-плеера.<br><br> <b>Модель:</b> Компактный плеер с экраном, круглой кнопкой управления, переключателем и разъёмом для наушников.<br> <b>Стиль:</b> Яркие контрастные цвета: голубой корпус на тёплом оранжевом фоне, с тонким тёмным контуром.<br> <b>Анимация:</b> Лёгкая анимация модели, полностью созданная в Blender.",
      "uk": "Коротка 3D-анімація MP3-плеєра.<br><br> <b>Модель:</b> Компактний плеєр з екраном, круглою кнопкою керування, перемикачем і роз’ємом для навушників.<br> <b>Стиль:</b> Яскраві контрастні кольори: блакитний корпус на теплому помаранчевому тлі, з тонким темним контуром.<br> <b>Анімація:</b> Легка анімація моделі, повністю створена в Blender.",
      "en": "A short 3D animation of an MP3 player.<br><br> <b>Model:</b> A compact player with a screen, a round control button, a switch and a headphone jack.<br> <b>Style:</b> Bright contrasting colors: a light blue body on a warm orange background with a thin dark outline.<br> <b>Animation:</b> A light animation of the model, made entirely in Blender."
    },
    "type": "motion",
    "src": "img/mp3.mp4"
  },
  "oranges": {
    "tech": "Figma / After Effects",
    "cat": "Motion Design",
    "title": {
      "ru": "Инфографика «Апельсин»",
      "uk": "Інфографіка «Апельсин»",
      "en": "Orange Infographic"
    },
    "card": {
      "ru": "Инфографика «Апельсин»",
      "uk": "Інфографіка «Апельсин»",
      "en": "Orange Infographic"
    },
    "desc": {
      "ru": "Анимированная инфографика о составе апельсина.<br><br> <b>Графика:</b> Иллюстрации нарисованы в Figma: дольки, листья, плоды и витаминные «пузырьки» с фактурным краем, как у мягкого мелка.<br> <b>Палитра:</b> Сочные оранжевый и зелёный на светлом фоне.<br> <b>Анимация:</b> Выполнена в After Effects: элементы плавно появляются, а информация подаётся по порядку.",
      "uk": "Анімована інфографіка про склад апельсина.<br><br> <b>Графіка:</b> Ілюстрації намальовано у Figma: часточки, листя, плоди та вітамінні «бульбашки» з фактурним краєм, як у м’якої крейди.<br> <b>Палітра:</b> Соковиті помаранчевий і зелений на світлому тлі.<br> <b>Анімація:</b> Виконана в After Effects: елементи плавно з’являються, а інформація подається по порядку.",
      "en": "An animated infographic about what an orange is made of.<br><br> <b>Graphics:</b> Illustrations drawn in Figma: segments, leaves, fruits and vitamin “bubbles” with a textured edge like soft chalk.<br> <b>Palette:</b> Juicy orange and green on a light background.<br> <b>Animation:</b> Made in After Effects: elements appear smoothly and the information is presented in order."
    },
    "type": "motion",
    "src": "img/oranges.mp4"
  },
  "pumpkin": {
    "tech": "Blender - Cycles / After Effects",
    "cat": "3D Animation",
    "title": {
      "ru": "Тыква-привидение",
      "uk": "Гарбуз-привид",
      "en": "Ghost Pumpkin"
    },
    "card": {
      "ru": "Тыква-привидение",
      "uk": "Гарбуз-привид",
      "en": "Ghost Pumpkin"
    },
    "desc": {
      "ru": "Хэллоуинская 3D-анимация: ткань падает на тыкву и превращает её в призрака.<br><br> <b>Сюжет:</b> Накрытая тканью тыква оживает: сквозь белую ткань проступает светящееся лицо.<br> <b>Графика:</b> Сцена и симуляция ткани созданы в Blender, фон из призраков в духе аркадных игр.<br> <b>Постобработка:</b> В After Effects анимация доработана: добавлены свечение и эффект цветового сдвига на призраках.",
      "uk": "Гелловінська 3D-анімація: тканина падає на гарбуз і перетворює його на привида.<br><br> <b>Сюжет:</b> Накритий тканиною гарбуз оживає: крізь білу тканину проступає світне обличчя.<br> <b>Графіка:</b> Сцена та симуляція тканини створені в Blender, тло з привидів у дусі аркадних ігор.<br> <b>Постобробка:</b> В After Effects анімацію доопрацьовано: додано сяйво й ефект колірного зсуву на привидах.",
      "en": "A Halloween 3D animation: a cloth falls on a pumpkin and turns it into a ghost.<br><br> <b>Story:</b> The cloth-covered pumpkin comes alive: a glowing face shows through the white fabric.<br> <b>Graphics:</b> The scene and cloth simulation were made in Blender, with a backdrop of arcade-style ghosts.<br> <b>Post-production:</b> The animation was finished in After Effects: glow and a color-shift effect were added to the ghosts."
    },
    "type": "motion",
    "src": "img/pumpkin.mp4"
  },
  "nighthouses": {
    "tech": "Blender - Cycles / After Effects",
    "cat": "3D Animation",
    "title": {
      "ru": "Дом под луной",
      "uk": "Будинок під місяцем",
      "en": "House Under the Moon"
    },
    "card": {
      "ru": "Дом под луной",
      "uk": "Будинок під місяцем",
      "en": "House Under the Moon"
    },
    "desc": {
      "ru": "Анимированный ночной пейзаж с домом на фоне двух лун.<br><br> <b>Графика:</b> Слоистые силуэты дома, голых деревьев и ограды, светящиеся окна и густой туман создают таинственную атмосферу.<br> <b>Постобработка:</b> Сцена создана в Blender, затем немного доработана в After Effects.",
      "uk": "Анімований нічний пейзаж із будинком на тлі двох місяців.<br><br> <b>Графіка:</b> Шаруваті силуети будинку, голих дерев і огорожі, вікна, що світяться, та густий туман створюють таємничу атмосферу.<br> <b>Постобробка:</b> Сцену створено в Blender, потім трохи доопрацьовано в After Effects.",
      "en": "An animated night landscape with a house against the backdrop of two moons.<br><br> <b>Graphics:</b> Layered silhouettes of a house, bare trees and a fence, glowing windows and thick fog create a mysterious atmosphere.<br> <b>Post-production:</b> The scene was created in Blender, then lightly refined in After Effects."
    },
    "type": "motion",
    "src": "img/nighthouses.mp4"
  },
  "supshows": {
    "tech": "Figma / Illustrator / After Effects",
    "cat": "Motion Design",
    "title": {
      "ru": "Звёздный бульон",
      "uk": "Зоряний бульйон",
      "en": "Star Broth"
    },
    "card": {
      "ru": "Звёздный бульон",
      "uk": "Зоряний бульйон",
      "en": "Star Broth"
    },
    "desc": {
      "ru": "Анимация о том, как после ужина мысли о еде превращаются в мысли о космосе.<br><br> <b>Сюжет:</b> Герой доедает рамен и поднимает взгляд к небу. Вместо звёзд и планет он видит ингредиенты из своей тарелки, и лишь потом небо становится настоящим космосом.<br> <b>Графика:</b> Векторная иллюстрация с контуром, мягкими облаками и насыщенной розово-фиолетовой палитрой.<br> <b>Анимация:</b> Создана в After Effects.",
      "uk": "Анімація про те, як після вечері думки про їжу перетворюються на думки про космос.<br><br> <b>Сюжет:</b> Герой доїдає рамен і піднімає погляд до неба. Замість зірок і планет він бачить інгредієнти зі своєї тарілки, і лише потім небо стає справжнім космосом.<br> <b>Графіка:</b> Векторна ілюстрація з контуром, м’якими хмарами та насиченою рожево-фіолетовою палітрою.<br> <b>Анімація:</b> Створена в After Effects.",
      "en": "An animation about how, after dinner, thoughts of food turn into thoughts of space.<br><br> <b>Story:</b> The hero finishes his ramen and looks up at the sky. Instead of stars and planets he sees the ingredients from his bowl, and only then does the sky become real space.<br> <b>Graphics:</b> A vector illustration with outlines, soft clouds and a rich pink-violet palette.<br> <b>Animation:</b> Made in After Effects."
    },
    "type": "motion",
    "src": "img/supshows.mp4"
  },
  "ring": {
    "tech": "Blender - Cycles",
    "cat": "3D Animation",
    "title": {
      "ru": "Кольцо",
      "uk": "Кільце",
      "en": "The Ring"
    },
    "card": {
      "ru": "Кольцо",
      "uk": "Кільце",
      "en": "The Ring"
    },
    "desc": {
      "ru": "Абстрактная 3D-анимация, полностью созданная в Blender.<br><br> <b>Сюжет:</b> Светлое кольцо медленно вращается, а по его поверхности разрастаются и набухают розовые формы, словно живой организм.<br> <b>Графика:</b> Контраст матовой фактурной поверхности и мягких розовых объёмов на чёрном фоне.<br> <b>Рендер:</b> Cycles, полностью в Blender.",
      "uk": "Абстрактна 3D-анімація, повністю створена в Blender.<br><br> <b>Сюжет:</b> Світле кільце повільно обертається, а по його поверхні розростаються й набрякають рожеві форми, наче живий організм.<br> <b>Графіка:</b> Контраст матової фактурної поверхні та м’яких рожевих об’ємів на чорному тлі.<br> <b>Рендер:</b> Cycles, повністю в Blender.",
      "en": "An abstract 3D animation made entirely in Blender.<br><br> <b>Story:</b> A pale ring rotates slowly while pink forms grow and swell across its surface like a living organism.<br> <b>Graphics:</b> A contrast of matte textured surface and soft pink volumes on a black background.<br> <b>Render:</b> Cycles, entirely in Blender."
    },
    "type": "motion",
    "src": "img/ring.mp4"
  },
  "guara": {
    "tech": "Figma",
    "cat": "Hi-Fi Prototype",
    "title": {
      "ru": "Дизайн сайта «Гуара»",
      "uk": "Дизайн сайту «Гуара»",
      "en": "Guara Website Design"
    },
    "card": {
      "ru": "Дизайн сайта «Гуара»",
      "uk": "Дизайн сайту «Гуара»",
      "en": "Guara Website Design"
    },
    "desc": {
      "ru": "Интерактивный образовательный прототип о гривистом волке.<br><br> <b>Стиль:</b> Многослойная аппликация (Paper Cutout).<br> <b>Графика:</b> Авторская векторная иллюстрация.<br> <b>Анимация:</b> Параллакс, оживляющий статичную графику.<br> <b>Атмосфера:</b> Аутентичная палитра южноамериканских саванн для полного погружения.",
      "uk": "Інтерактивний освітній прототип про гривастого вовка.<br><br> <b>Стиль:</b> Багатошарова аплікація (Paper Cutout).<br> <b>Графіка:</b> Авторська векторна ілюстрація.<br> <b>Анімація:</b> Паралакс, що оживляє статичну графіку.<br> <b>Атмосфера:</b> Автентична палітра південноамериканських саван для повного занурення.",
      "en": "An interactive educational prototype about the maned wolf.<br><br> <b>Style:</b> Layered paper-cutout collage.<br> <b>Graphics:</b> Original vector illustration.<br> <b>Animation:</b> Parallax that brings static artwork to life.<br> <b>Mood:</b> An authentic palette of South American savannas for full immersion."
    },
    "type": "figma",
    "src": "https://embed.figma.com/proto/PgF5YqedCncC7zkfWzOZCM/Guara?node-id=96-2548&p=f&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=96%3A3909&embed-host=share"
  },
  "cliko": {
    "tech": "Figma / Illustrator / VS Code",
    "cat": "Website",
    "title": {
      "ru": "Сайт «Клико»",
      "uk": "Сайт «Кліко»",
      "en": "Cliko Website"
    },
    "card": {
      "ru": "Сайт «Клико»",
      "uk": "Сайт «Кліко»",
      "en": "Cliko Website"
    },
    "desc": {
      "ru": "Информационно-просветительский сайт «Клико», введение в HTML и CSS.<br><br> <b>Стиль:</b> Сочетание неоморфизма и стекломорфизма: мягкие объёмные формы и полупрозрачные поверхности.<br> <b>Структура:</b> Пять разделов: Главная, Практика, Справочник, Песочница и Визуал.<br> <b>Цветовая логика:</b> Жёлтый — HTML, фиолетовый — CSS. Разделение проходит через весь интерфейс и типографику, помогая ориентироваться на сайте и связывая все элементы в единый стиль.",
      "uk": "Інформаційно-освітній сайт «Кліко», вступ до HTML і CSS.<br><br> <b>Стиль:</b> Поєднання неоморфізму та скломорфізму: м’які об’ємні форми й напівпрозорі поверхні.<br> <b>Структура:</b> П’ять розділів: Головна, Практика, Довідник, Пісочниця та Візуал.<br> <b>Колірна логіка:</b> Жовтий — HTML, фіолетовий — CSS. Розподіл проходить через увесь інтерфейс і типографіку, допомагаючи орієнтуватися на сайті та з’єднуючи всі елементи в єдиний стиль.",
      "en": "Cliko is an educational website, an introduction to HTML and CSS.<br><br> <b>Style:</b> A mix of neumorphism and glassmorphism: soft volumetric shapes and translucent surfaces.<br> <b>Structure:</b> Five sections: Home, Practice, Reference, Sandbox and Visual.<br> <b>Color logic:</b> Yellow for HTML, purple for CSS. The split runs through the whole interface and typography, helping with navigation and tying every element into one style."
    },
    "type": "website",
    "src": "https://clikolink.github.io/Cliko/"
  }
};

/* Переводы описаний внутри галерей: projectsData-ключ -> галерея -> язык.
   Строка = одно описание на все картинки, массив = своё описание на каждую картинку.
   Русский текст берётся из projectsData выше. */
const GALLERY_I18N = {
  "visualArts": {
    "posters": {
      "uk": "Серія постерів про гривастого вовка: мешканця південноамериканських саван у різних сценах і станах.<br><br> <b>Стиль:</b> Багатошарова графіка з фактурою паперу та приглушеною природною палітрою.<br> <b>Формат:</b> Вертикальні постери, об’єднані спільним героєм і колірною логікою.",
      "en": "A series of posters about the maned wolf, a resident of the South American savannas, shown in different scenes and moods.<br><br> <b>Style:</b> Layered graphics with paper texture and a muted natural palette.<br> <b>Format:</b> Vertical posters united by a shared hero and color logic."
    },
    "sketches": {
      "uk": "Начерки до серії про гривастого вовка: пошук поз, композицій і атмосфери майбутніх робіт.<br><br> <b>Призначення:</b> Перші візуальні рішення, з яких виросли фінальні постери.<br> <b>Характер:</b> Вільний мазок, живі силуети та фактура, що зберегла енергію малюнка.",
      "en": "Sketches for the maned wolf series: exploring poses, compositions and the mood of the future pieces.<br><br> <b>Purpose:</b> The first visual decisions the final posters grew from.<br> <b>Character:</b> Loose brushwork, lively silhouettes and a texture that keeps the energy of the drawing."
    }
  },
  "frogKiwi": {
    "frog": {
      "uk": [
        "Авторський патерн із жабкою для піжамного комплекту кольору свіжої трави.<br><br> <b>Візуалізація на виробі:</b> Сорочка та шорти з нанесеним принтом.",
        "Авторський патерн із жабкою для піжамного комплекту кольору свіжої трави.<br><br> <b>Модуль:</b> Базовий фрагмент, з якого будується вся композиція принта.",
        "Авторський патерн із жабкою для піжамного комплекту кольору свіжої трави.<br><br> <b>Безшовний повтор:</b> Модуль, розмножений у суцільне полотно."
      ],
      "en": [
        "An original frog pattern for a fresh-grass-green pajama set.<br><br> <b>On the product:</b> A shirt and shorts with the print applied.",
        "An original frog pattern for a fresh-grass-green pajama set.<br><br> <b>Module:</b> The base fragment the whole print composition is built from.",
        "An original frog pattern for a fresh-grass-green pajama set.<br><br> <b>Seamless repeat:</b> The module tiled into a continuous fabric."
      ]
    },
    "kiwi": {
      "uk": [
        "Авторський патерн із ківі для піжамного комплекту відтінку барвінку.<br><br> <b>Візуалізація на виробі:</b> Сорочка та шорти з нанесеним принтом.",
        "Авторський патерн із ківі для піжамного комплекту відтінку барвінку.<br><br> <b>Модуль:</b> Базовий фрагмент, з якого будується вся композиція принта.",
        "Авторський патерн із ківі для піжамного комплекту відтінку барвінку.<br><br> <b>Безшовний повтор:</b> Модуль, розмножений у суцільне полотно."
      ],
      "en": [
        "An original kiwi pattern for a periwinkle pajama set.<br><br> <b>On the product:</b> A shirt and shorts with the print applied.",
        "An original kiwi pattern for a periwinkle pajama set.<br><br> <b>Module:</b> The base fragment the whole print composition is built from.",
        "An original kiwi pattern for a periwinkle pajama set.<br><br> <b>Seamless repeat:</b> The module tiled into a continuous fabric."
      ]
    }
  },
  "Comics": {
    "alter": {
      "uk": "Авторський комікс за мотивами байки Івана Крилова «Мавпа й окуляри».<br><br> <b>Графіка:</b> Цифрова ілюстрація, намальована від руки, з м’якою фактурою шерсті.<br> <b>Палітра:</b> Теплий помаранчевий героїні на тлі приглушених сіро-коричневих тонів.<br> <b>Розкадровка:</b> Сторінки з різним ритмом кадрів, від крупних планів до динамічних сцен.",
      "en": "An original comic based on Ivan Krylov’s fable “The Monkey and the Spectacles”.<br><br> <b>Graphics:</b> Hand-drawn digital illustration with a soft fur texture.<br> <b>Palette:</b> The heroine’s warm orange against muted gray-brown tones.<br> <b>Layout:</b> Pages with varied panel rhythm, from close-ups to dynamic scenes."
    }
  },
  "Guidelines": {
    "alter": {
      "uk": "Практичний посібник зі стилю.<br><br> <b>Ідея:</b> Баланс стабільності та руху.<br> <b>Графіка:</b> Побудова за модульною сіткою, чіткі пропорції та охоронне поле навколо логотипу.<br> <b>Палітра:</b> Контраст фірмового лавандового та білого кольорів.<br> <b>Застосування:</b> Універсальна система. Логотип легко адаптується під будь-які завдання: від іконки сайту до фірмових бланків, шопперів і футболок.",
      "en": "A practical style guide.<br><br> <b>Idea:</b> A balance of stability and movement.<br> <b>Graphics:</b> A modular grid, clear proportions and a clear-space zone around the logo.<br> <b>Palette:</b> A contrast of signature lavender and white.<br> <b>Usage:</b> A universal system. The logo adapts easily to any task, from a website icon to letterheads, tote bags and T-shirts."
    }
  },
  "Logobook": {
    "pages": {
      "uk": "Розробка фірмового стилю міського простору.<br><br> <b>Концепт:</b> Гібрид вовка та кавової чашки, що поєднує тепло спілкування й любов до собак.<br> <b>Графіка:</b> Жартівлива типографіка та авторський кастомний знак.<br> <b>Стиль:</b> М’який, грайливий і відкритий бренд-дизайн.<br> <b>Атмосфера:</b> Затишна палітра «темного шоколаду», «теплої карамелі» та «вершкового масла» для створення домашнього комфорту.",
      "en": "Brand identity for an urban café space.<br><br> <b>Concept:</b> A hybrid of a wolf and a coffee cup that unites the warmth of conversation with a love of dogs.<br> <b>Graphics:</b> Playful typography and a custom original mark.<br> <b>Style:</b> Soft, playful and open brand design.<br> <b>Mood:</b> A cozy palette of “dark chocolate”, “warm caramel” and “butter cream” for a feeling of home comfort."
    }
  },
  "Ornament": {
    "images": {
      "uk": [
        "Орнамент у традиції мезенського розпису: від малюнка на папері до векторної графіки.<br><br> <b>Ескіз:</b> Вихідний малюнок виконано вручну на папері, а потім перенесено у вектор.<br> <b>Вектор:</b> Орнамент у векторному вигляді.",
        "Орнамент у традиції мезенського розпису: від малюнка на папері до векторної графіки.<br><br> <b>Ескіз:</b> Вихідний малюнок виконано вручну на папері, а потім перенесено у вектор.<br> <b>Візуалізація:</b> Орнамент на дерев’яній тарілці."
      ],
      "en": [
        "An ornament in the Mezen painting tradition: from a drawing on paper to vector graphics.<br><br> <b>Sketch:</b> The original drawing was made by hand on paper and then transferred to vector.<br> <b>Vector:</b> The ornament as vector artwork.",
        "An ornament in the Mezen painting tradition: from a drawing on paper to vector graphics.<br><br> <b>Sketch:</b> The original drawing was made by hand on paper and then transferred to vector.<br> <b>Visualization:</b> The ornament on a wooden plate."
      ]
    }
  },
  "Stilllife": {
    "images": {
      "uk": "Серія натюрмортів, намальованих з натури у векторі.<br><br> <b>Графіка:</b> Спрощені форми, чисті кольори та виразні силуети.<br> <b>Інструмент:</b> Векторна графіка у Figma.",
      "en": "A series of still lifes drawn from life in vector.<br><br> <b>Graphics:</b> Simplified shapes, clean colors and expressive silhouettes.<br> <b>Tool:</b> Vector graphics in Figma."
    }
  },
  "Guara": {
    "images": {
      "uk": [
        "Листівка із зображенням гривастого вовка. Малюнок виконано вручну, відскановано та скомпоновано в графічних редакторах.<br><br> <b>Варіант 1:</b> Лаконічна листівка: малюнок і назва виду з латинською назвою.",
        "Листівка із зображенням гривастого вовка. Малюнок виконано вручну, відскановано та скомпоновано в графічних редакторах.<br><br> <b>Варіант 2:</b> Інформаційна листівка: поруч із малюнком розміри тварини та короткі факти про її спосіб життя."
      ],
      "en": [
        "A postcard featuring the maned wolf. The drawing was made by hand, scanned and composed in graphic editors.<br><br> <b>Option 1:</b> A minimalist postcard: the drawing and the species name with its Latin name.",
        "A postcard featuring the maned wolf. The drawing was made by hand, scanned and composed in graphic editors.<br><br> <b>Option 2:</b> An informational postcard: the animal’s measurements and brief facts about its way of life beside the drawing."
      ]
    }
  },
  "Chestnut": {
    "images": {
      "uk": [
        "Листівка із зображенням каштана. Малюнок виконано вручну, відскановано та скомпоновано в графічних редакторах.<br><br> <b>Варіант 1:</b> Вертикальна композиція: назва та латинська назва виду над малюнком, суцвіття й листя займають основну частину аркуша.",
        "Листівка із зображенням каштана. Малюнок виконано вручну, відскановано та скомпоновано в графічних редакторах.<br><br> <b>Варіант 2:</b> Вертикальна композиція: гілка із суцвіттям і листям, а назва та латинська назва розташовані збоку на вільному полі.",
        "Листівка із зображенням каштана. Малюнок виконано вручну, відскановано та скомпоновано в графічних редакторах.<br><br> <b>Варіант 3:</b> Горизонтальна композиція: дві гілки по краях аркуша, а назва та латинська назва розташовані між ними."
      ],
      "en": [
        "A postcard featuring a chestnut tree. The drawing was made by hand, scanned and composed in graphic editors.<br><br> <b>Option 1:</b> Vertical composition: the name and Latin name of the species above the drawing, with blossoms and leaves filling most of the sheet.",
        "A postcard featuring a chestnut tree. The drawing was made by hand, scanned and composed in graphic editors.<br><br> <b>Option 2:</b> Vertical composition: a branch with a blossom and leaves, while the name and Latin name sit to the side in the free space.",
        "A postcard featuring a chestnut tree. The drawing was made by hand, scanned and composed in graphic editors.<br><br> <b>Option 3:</b> Horizontal composition: two branches at the edges of the sheet, with the name and Latin name placed between them."
      ]
    }
  }
};
