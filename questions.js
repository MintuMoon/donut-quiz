// Local helper to shuffle arrays
function localShuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Bi-lingual Secret Question 
const secretQuestion = {
    category: "secret",
    isSecret: true,
    q: {
        en: "(This is a secret question, you are lucky!) Choose your ultimate destiny:",
        ru: "(Это секретный вопрос, вам повезло!) Выберите свою главную жизненную цель:"
    },
    a: {
        en: [
            { text: "A life of quiet, peaceful comfort", type: "classic" },
            { text: "A never-ending, colorful festival", type: "sprinkles" },
            { text: "A deep, passionate love story", type: "jelly" },
            { text: "Absolute zen and cosmic wisdom", type: "galaxy" },
            { text: "A wild, rule-breaking adventure", type: "bacon" }
        ],
        ru: [
            { text: "Жизнь в тихом и уютном комфорте", type: "classic" },
            { text: "Бесконечный, яркий фестиваль радости", type: "sprinkles" },
            { text: "Глубокая, страстная история любви", type: "jelly" },
            { text: "Абсолютный дзен и космическая мудрость", type: "galaxy" },
            { text: "Дикое приключение с нарушением всех правил", type: "bacon" }
        ]
    }
};

// 9 Bi-lingual Base Questions
const baseQuestions = [
    {
        category: "base_activity",
        q: {
            en: "What is your ideal weekend activity?",
            ru: "Как выглядит ваш идеальный выходной?"
        },
        a: {
            en: [
                { text: "Reading a book under a warm blanket", type: "classic" },
                { text: "Going to a lively party with friends", type: "sprinkles" },
                { text: "Stargazing and pondering life's mysteries", type: "galaxy" },
                { text: "Visiting a quiet botanical tea garden", type: "matcha" },
                { text: "Going skydiving or trying an extreme sport", type: "bacon" }
            ],
            ru: [
                { text: "Чтение книги под теплым пледом", type: "classic" },
                { text: "Шумная вечеринка с друзьями", type: "sprinkles" },
                { text: "Созерцание звезд и размышления о тайнах вселенной", type: "galaxy" },
                { text: "Посещение тихого чайного сада", type: "matcha" },
                { text: "Прыжок с парашютом или экстремальный спорт", type: "bacon" }
            ]
        }
    },
    {
        category: "base_color",
        q: {
            en: "Choose a color palette that speaks to you:",
            ru: "Выберите цветовую палитру, которая вам ближе:"
        },
        a: {
            en: [
                { text: "Soft beige and warm cream", type: "classic" },
                { text: "Deep indigo, purple and starry sparkles", type: "galaxy" },
                { text: "Vibrant yellow and fiery red-orange", type: "spicy" },
                { text: "Forest green and soft mint", type: "matcha" },
                { text: "Elegant metallic gold and bronze", type: "cruller" }
            ],
            ru: [
                { text: "Нежный бежевый и теплый кремовый", type: "classic" },
                { text: "Глубокий индиго, фиолетовый и звездные блестки", type: "galaxy" },
                { text: "Яркий желтый и пламенный красно-оранжевый", type: "spicy" },
                { text: "Лесной зеленый и мягкий мятный", type: "matcha" },
                { text: "Элегантное металлическое золото и бронза", type: "cruller" }
            ]
        }
    },
    {
        category: "base_stress",
        q: {
            en: "How do you usually handle stressful situations?",
            ru: "Как вы обычно справляетесь со стрессом?"
        },
        a: {
            en: [
                { text: "I stick to my comforting usual routine", type: "classic" },
                { text: "I make jokes or eat something sweet", type: "sprinkles" },
                { text: "I try to look at things from a detached perspective", type: "galaxy" },
                { text: "I meditate in absolute silent solitude", type: "matcha" },
                { text: "I treat myself to luxury or make a dramatic change", type: "cruller" }
            ],
            ru: [
                { text: "Придерживаюсь своей привычной рутины", type: "classic" },
                { text: "Шучу или съедаю что-нибудь сладкое", type: "sprinkles" },
                { text: "Пытаюсь посмотреть на ситуацию глобально со стороны", type: "galaxy" },
                { text: "Медитирую в абсолютном тихом уединении", type: "matcha" },
                { text: "Позволяю себе роскошь или иду на резкие перемены", type: "cruller" }
            ]
        }
    },
    {
        category: "base_superpower",
        q: {
            en: "If you could have one superpower, what would it be?",
            ru: "Если бы вы могли иметь одну суперсилу, что бы это было?"
        },
        a: {
            en: [
                { text: "Teleportation (to get home instantly)", type: "classic" },
                { text: "Reality manipulation (to create fine art and beauty)", type: "cruller" },
                { text: "Astral projection (to explore deep space)", type: "galaxy" },
                { text: "Time manipulation (to enjoy peaceful moments)", type: "matcha" },
                { text: "Pyrokinesis (to ignite excitement anywhere)", type: "spicy" }
            ],
            ru: [
                { text: "Телепортация (чтобы мгновенно возвращаться домой)", type: "classic" },
                { text: "Изменение реальности (для создания искусства и красоты)", type: "cruller" },
                { text: "Астральная проекция (для путешествий в космосе)", type: "galaxy" },
                { text: "Управление временем (чтобы продлить мирные моменты)", type: "matcha" },
                { text: "Пирокинез (чтобы разжигать страсть и веселье везде)", type: "spicy" }
            ]
        }
    },
    {
        category: "base_season",
        q: {
            en: "What is your favorite season?",
            ru: "Какое ваше любимое время года?"
        },
        a: {
            en: [
                { text: "Autumn - cozy sweaters and warm blankets", type: "classic" },
                { text: "Summer - beaches, festivals and bright sun", type: "sprinkles" },
                { text: "Winter nights - endless stars and deep frost", type: "galaxy" },
                { text: "Spring - fresh blooming sakura trees", type: "matcha" },
                { text: "Unpredictable changing weather with storms", type: "spicy" }
            ],
            ru: [
                { text: "Осень – уютные свитера и теплые пледы", type: "classic" },
                { text: "Лето – пляжи, фестивали и яркое солнце", type: "sprinkles" },
                { text: "Зимние ночи – бескрайние звезды и сильный мороз", type: "galaxy" },
                { text: "Весна – свежее цветение сакуры", type: "matcha" },
                { text: "Непредсказуемая погода с грозами и бурями", type: "spicy" }
            ]
        }
    },
    {
        category: "base_pet",
        q: {
            en: "Pick a perfect companion animal:",
            ru: "Выберите идеальное животное-компаньона:"
        },
        a: {
            en: [
                { text: "A loyal and calm Golden Retriever", type: "classic" },
                { text: "A playful, energetic kitten", type: "sprinkles" },
                { text: "An owl, observing the night sky", type: "galaxy" },
                { text: "An exotic snake or desert lizard", type: "spicy" },
                { text: "A majestic swan or show horse", type: "cruller" }
            ],
            ru: [
                { text: "Преданный и спокойный золотистый ретривер", type: "classic" },
                { text: "Игривый, энергичный котенок", type: "sprinkles" },
                { text: "Сова, наблюдающая за ночным небом", type: "galaxy" },
                { text: "Экзотическая змея или ящерица", type: "spicy" },
                { text: "Величественный лебедь или скаковая лошадь", type: "cruller" }
            ]
        }
    },
    {
        category: "base_morning",
        q: {
            en: "What is your morning routine?",
            ru: "Как обычно начинается ваше утро?"
        },
        a: {
            en: [
                { text: "A simple cup of coffee and a quiet breakfast", type: "classic" },
                { text: "Dancing to upbeat music to wake up", type: "sprinkles" },
                { text: "Trying to remember and write down my complex dreams", type: "galaxy" },
                { text: "Hot matcha latte and deep breathing", type: "matcha" },
                { text: "An intense, spicy ginger shot or heavy workout", type: "spicy" }
            ],
            ru: [
                { text: "Простая чашка кофе и тихий завтрак", type: "classic" },
                { text: "Танцы под бодрую музыку для пробуждения", type: "sprinkles" },
                { text: "Попытки вспомнить и записать свои сложные сны", type: "galaxy" },
                { text: "Горячий матча-латте и дыхательная гимнастика", type: "matcha" },
                { text: "Крепкий имбирный шот или интенсивная тренировка", type: "spicy" }
            ]
        }
    },
    {
        category: "base_music",
        q: {
            en: "What genre of music do you listen to the most?",
            ru: "Какой музыкальный жанр вы слушаете чаще всего?"
        },
        a: {
            en: [
                { text: "Classic rock or pleasant lo-fi beats", type: "classic" },
                { text: "Upbeat pop and endless dance hits", type: "sprinkles" },
                { text: "Ambient space music or experimental synths", type: "galaxy" },
                { text: "Traditional classical piano or flute", type: "matcha" },
                { text: "Heavy metal, hip-hop, or spicy dynamic remixes", type: "spicy" }
            ],
            ru: [
                { text: "Классический рок или приятный лоу-фай", type: "classic" },
                { text: "Энергичный поп и танцевальные хиты", type: "sprinkles" },
                { text: "Эмбиент-космос или экспериментальные синтезаторы", type: "galaxy" },
                { text: "Традиционное классическое пианино или флейта", type: "matcha" },
                { text: "Тяжелый металл, хип-хоп или динамичные ремиксы", type: "spicy" }
            ]
        }
    },
    {
        category: "base_vacation",
        q: {
            en: "Where is your dream vacation destination?",
            ru: "Куда бы вы отправились в путешествие мечты?"
        },
        a: {
            en: [
                { text: "A cozy, remote cabin in the mountains", type: "classic" },
                { text: "A luxury resort in a vibrant party city", type: "sprinkles" },
                { text: "An astronomical observatory high in Chile", type: "galaxy" },
                { text: "A quiet traditional temple retreat in Kyoto", type: "matcha" },
                { text: "An active volcano hike or tropical jungle expedition", type: "spicy" }
            ],
            ru: [
                { text: "Уютный уединенный домик в горах", type: "classic" },
                { text: "Роскошный курорт в тусовочном городе", type: "sprinkles" },
                { text: "Астрономическая обсерватория в горах Чили", type: "galaxy" },
                { text: "Тихий традиционный храм в Киото", type: "matcha" },
                { text: "Поход к активному вулкану или экспедиция в джунгли", type: "spicy" }
            ]
        }
    }
];

// Bi-lingual data sets for generating questions (We keep ~12 diverse topics for compact, clean file sizes)
const nouns = [
    {
        name: { en: "planet", ru: "планета" },
        classic: { en: "Saturn", ru: "Сатурн" },
        sprinkles: { en: "Jupiter", ru: "Юпитер" },
        jelly: { en: "Venus", ru: "Венера" },
        matcha: { en: "Neptune", ru: "Нептун" },
        bacon: { en: "Mars", ru: "Марс" },
        galaxy: { en: "Uranus", ru: "Уран" },
        spicy: { en: "Mercury", ru: "Меркурий" },
        cruller: { en: "Jupiter's Rings", ru: "Кольца Юпитера" }
    },
    {
        name: { en: "gemstone", ru: "драгоценный камень" },
        classic: { en: "Diamond", ru: "Алмаз" },
        sprinkles: { en: "Opal", ru: "Опал" },
        jelly: { en: "Ruby", ru: "Рубин" },
        matcha: { en: "Jade", ru: "Нефрит" },
        bacon: { en: "Pyrite", ru: "Пирит" },
        galaxy: { en: "Sapphire", ru: "Сапфир" },
        spicy: { en: "Topaz", ru: "Топаз" },
        cruller: { en: "Emerald", ru: "Изумруд" }
    },
    {
        name: { en: "vehicle", ru: "транспорт" },
        classic: { en: "Station Wagon", ru: "Семейный универсал" },
        sprinkles: { en: "Convertible", ru: "Кабриолет" },
        jelly: { en: "Vespa", ru: "Веспа" },
        matcha: { en: "Bicycle", ru: "Велосипед" },
        bacon: { en: "Monster Truck", ru: "Монстр-трак" },
        galaxy: { en: "Spaceship", ru: "Космический корабль" },
        spicy: { en: "Racecar", ru: "Гоночный болид" },
        cruller: { en: "Limousine", ru: "Лимузин" }
    },
    {
        name: { en: "era", ru: "историческая эпоха" },
        classic: { en: "Victorian", ru: "Викторианская эпоха" },
        sprinkles: { en: "Roaring Twenties", ru: "Ревущие двадцатые" },
        jelly: { en: "Renaissance", ru: "Эпоха Возрождения" },
        matcha: { en: "Ancient Kyoto", ru: "Древний Киото" },
        bacon: { en: "Wild West", ru: "Дикий Запад" },
        galaxy: { en: "Space Future", ru: "Космическое будущее" },
        spicy: { en: "Mayan Empire", ru: "Империя Майя" },
        cruller: { en: "French Baroque", ru: "Французское Барокко" }
    },
    {
        name: { en: "dessert", ru: "десерт" },
        classic: { en: "Vanilla Custard", ru: "Ванильный крем" },
        sprinkles: { en: "Rainbow Cupcake", ru: "Радужный капкейк" },
        jelly: { en: "Strawberry Tart", ru: "Клубничный тарт" },
        matcha: { en: "Matcha Mochi", ru: "Матча моти" },
        bacon: { en: "Maple Waffle", ru: "Кленовые вафли" },
        galaxy: { en: "Galaxy Ice Cream", ru: "Космическое мороженое" },
        spicy: { en: "Chili Chocolate", ru: "Шоколад с чили" },
        cruller: { en: "Eclair", ru: "Эклер" }
    },
    {
        name: { en: "scenery", ru: "пейзаж" },
        classic: { en: "Cozy Study", ru: "Уютный кабинет" },
        sprinkles: { en: "Amusement Park", ru: "Парк аттракционов" },
        jelly: { en: "Rainy Cafe", ru: "Кафе в дождливый день" },
        matcha: { en: "Bamboo Forest", ru: "Бамбуковый лес" },
        bacon: { en: "Canyon Trail", ru: "Тропа в каньоне" },
        galaxy: { en: "Deep Space Void", ru: "Пустота глубокого космоса" },
        spicy: { en: "Desert Oasis", ru: "Оазис в пустыне" },
        cruller: { en: "Royal Palace", ru: "Королевский дворец" }
    },
    {
        name: { en: "beverage", ru: "напиток" },
        classic: { en: "Warm Milk", ru: "Теплое молоко" },
        sprinkles: { en: "Fizzy Soda", ru: "Шипучая газировка" },
        jelly: { en: "Sweet Wine", ru: "Сладкое вино" },
        matcha: { en: "Green Tea", ru: "Зеленый чай" },
        bacon: { en: "Black Coffee", ru: "Черный кофе" },
        galaxy: { en: "Blue Lagoon Mocktail", ru: "Коктейль «Голубая Лагуна»" },
        spicy: { en: "Spicy Chai", ru: "Пряный чай чай" },
        cruller: { en: "Champagne", ru: "Шампанское" }
    },
    {
        name: { en: "weather", ru: "погода" },
        classic: { en: "Clear Sky", ru: "Ясное небо" },
        sprinkles: { en: "Rainbow", ru: "Радуга" },
        jelly: { en: "Soft Drizzle", ru: "Мягкий моросящий дождь" },
        matcha: { en: "Morning Mist", ru: "Утренний туман" },
        bacon: { en: "Thunderstorm", ru: "Гроза" },
        galaxy: { en: "Aurora Borealis", ru: "Полярное сияние" },
        spicy: { en: "Heat Wave", ru: "Летний зной" },
        cruller: { en: "Golden Sunset", ru: "Золотой закат" }
    },
    {
        name: { en: "animal", ru: "животное" },
        classic: { en: "Retriever", ru: "Ретривер" },
        sprinkles: { en: "Parrot", ru: "Попугай" },
        jelly: { en: "Swan", ru: "Лебедь" },
        matcha: { en: "Panda", ru: "Панда" },
        bacon: { en: "Wolf", ru: "Волк" },
        galaxy: { en: "Chameleon", ru: "Хамелеон" },
        spicy: { en: "Cheetah", ru: "Гепард" },
        cruller: { en: "Peacock", ru: "Павлин" }
    },
    {
        name: { en: "color", ru: "цвет" },
        classic: { en: "Beige", ru: "Бежевый" },
        sprinkles: { en: "Neon Pink", ru: "Неоновый розовый" },
        jelly: { en: "Crimson", ru: "Малиновый" },
        matcha: { en: "Sage Green", ru: "Шалфейный зеленый" },
        bacon: { en: "Charcoal", ru: "Угольно-черный" },
        galaxy: { en: "Deep Cosmic Blue", ru: "Глубокий космический синий" },
        spicy: { en: "Hot Chili Orange", ru: "Ярко-оранжевый чили" },
        cruller: { en: "Metallic Gold", ru: "Металлическое золото" }
    },
    {
        name: { en: "element", ru: "стихия" },
        classic: { en: "Earth", ru: "Земля" },
        sprinkles: { en: "Air", ru: "Воздух" },
        jelly: { en: "Water", ru: "Вода" },
        matcha: { en: "Spirit", ru: "Дух" },
        bacon: { en: "Metal", ru: "Металл" },
        galaxy: { en: "Aether", ru: "Эфир" },
        spicy: { en: "Fire", ru: "Огонь" },
        cruller: { en: "Light", ru: "Свет" }
    }
];

// Translation templates (Gender-neutral phrasing for Russian)
const prompts = {
    en: [
        "Which [X] represents your inner energy?",
        "Pick a [X] that matches your current vibe:",
        "If you were a [X], what would you be?",
        "Choose a [X] for your dream aesthetic:",
        "Which [X] do you find most fascinating?",
        "Select a [X] that brings you comfort:",
        "If your soul had to choose a [X], it would be:"
    ],
    ru: [
        "Какой вариант в категории «[X]» отражает вашу внутреннюю энергию?",
        "Выберите вариант в категории «[X]», соответствующий вашему вайбу:",
        "Если бы вы были частью категории «[X]», что бы вы выбрали?",
        "Какой вариант в категории «[X]» подходит вашей эстетике?",
        "Что из категории «[X]» кажется вам наиболее захватывающим?",
        "Выберите то, что в категории «[X]» приносит вам комфорт:",
        "Если бы ваша душа выбирала вариант в категории «[X]», это был бы:"
    ]
};

// Procedural compiler mapping for normal questions (total database count optimized to 191)
let normalQuestions = [];

// Populate base questions
baseQuestions.forEach(q => {
    normalQuestions.push(q);
});

// Auto-compile remaining questions
nouns.forEach(noun => {
    // Generate questions for both English and Russian templates
    for (let i = 0; i < prompts.en.length; i++) {
        const qTextEn = prompts.en[i].replace("[X]", noun.name.en);
        const qTextRu = prompts.ru[i].replace("[X]", noun.name.ru);

        const allTypes = ["classic", "sprinkles", "jelly", "matcha", "bacon", "galaxy", "spicy", "cruller"];
        const chosenTypes = localShuffle(allTypes).slice(0, 5);

        const answersEn = chosenTypes.map(type => ({ text: noun[type].en, type: type }));
        const answersRu = chosenTypes.map(type => ({ text: noun[type].ru, type: type }));

        normalQuestions.push({
            category: noun.name.en,
            q: { en: qTextEn, ru: qTextRu },
            a: { en: answersEn, ru: answersRu }
        });
    }
});

// Hard limit constraints
normalQuestions = normalQuestions.slice(0, 191);

// Bi-lingual Results descriptions (8 types)
const results = {
    classic: {
        title: { en: "Classic Glazed Donut", ru: "Классический пончик" },
        emoji: "🍩",
        description: {
            en: "You are the Classic Glazed Donut! Elegant, reliable, and deeply loved by everyone. Your simple, warm, and sweet soul is more than enough.",
            ru: "Вы — Классический пончик! Элегантный, надежный и всеми любимый. Вашей простой, теплой и сладкой души более чем достаточно, чтобы дарить уют."
        }
    },
    sprinkles: {
        title: { en: "Chocolate Sprinkles Donut", ru: "Шоколадный пончик с посыпкой" },
        emoji: "🧁",
        description: {
            en: "You are the Chocolate Sprinkles Donut! Full of endless energy, color, and joy. You are the absolute life of the party, always making others laugh.",
            ru: "Вы — Шоколадный пончик с посыпкой! Полны бесконечной энергии, ярких красок и радости. Вы — душа любой компании, всегда умеющая рассмешить."
        }
    },
    jelly: {
        title: { en: "Strawberry Jelly-Filled Donut", ru: "Пончик с клубничным джемом" },
        emoji: "🍓",
        description: {
            en: "You are the Strawberry Jelly-Filled Donut! You might look simple on the outside, but you have a beautiful, deep, and sweet surprise hidden inside.",
            ru: "Вы — Пончик с клубничным джемом! Снаружи вы можете выглядеть просто, но внутри вас скрывается глубокий, красивый и очень сладкий сюрприз."
        }
    },
    matcha: {
        title: { en: "Matcha Green Tea Donut", ru: "Зеленый пончик Матча" },
        emoji: "🍵",
        description: {
            en: "You are the Matcha Green Tea Donut! Peaceful, wise, and absolutely unique. You prefer quiet nature and always strive for zen, harmony, and self-growth.",
            ru: "Вы — Зеленый пончик Матча! Мирный, мудрый и абсолютно уникальный. Вы предпочитаете тишину природы и всегда стремитесь к дзену и гармонии."
        }
    },
    bacon: {
        title: { en: "Maple Bacon Donut", ru: "Пончик с кленовым сиропом и беконом" },
        emoji: "🥓",
        description: {
            en: "You are the Maple Bacon Donut! Bold, adventurous, and completely unconventional. You love breaking the rules and finding the next big adventure.",
            ru: "Вы — Кленовый пончик с беконом! Смелый, авантюрный и совершенно необычный. Вы обожаете нарушать правила и искать новые приключения."
        }
    },
    galaxy: {
        title: { en: "Blueberry Galaxy Donut", ru: "Черничный космический пончик" },
        emoji: "🌌",
        description: {
            en: "You are the Blueberry Galaxy Donut! Deep, highly creative, and infinitely curious. Your mind orbits complex concepts, science, or art. You are a cosmic visionary.",
            ru: "Вы — Черничный космический пончик! Глубокий, творческий и невероятно любознательный. Ваш разум исследует науку или искусство. Вы — космический визионер."
        }
    },
    spicy: {
        title: { en: "Spicy Mango Chili Donut", ru: "Острый пончик Манго-Чили" },
        emoji: "🌶️",
        description: {
            en: "You are the Spicy Mango Chili Donut! Fiery, passionate, and completely unpredictable. You hate boring paths, bringing heat, intensity, and unforgettable flavor to life.",
            ru: "Вы — Острый пончик Манго-Чили! Огненный, страстный и совершенно непредсказуемый. Вы презираете скуку, привнося в жизнь остроту и незабываемый вкус."
        }
    },
    cruller: {
        title: { en: "Golden Caramel Cruller", ru: "Золотой карамельный крученик" },
        emoji: "👑",
        description: {
            en: "You are the Golden Caramel Cruller! Elegant, sophisticated, and deeply artistic. You appreciate high quality, fine dining, aesthetics, and a touch of royal drama.",
            ru: "Вы — Золотой карамельный крученик! Элегантный, утонченный и глубоко артистичный. Вы цените высокое качество, эстетику и легкую королевскую драму."
        }
    }
};
