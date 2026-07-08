// Base handwritten questions (9 elements)
const baseQuestions = [
    {
        q: "What is your ideal weekend activity?",
        a: [
            { text: "Reading a book under a warm blanket", type: "classic" },
            { text: "Going to a lively party with friends", type: "sprinkles" },
            { text: "Watching a deeply emotional drama movie", type: "jelly" },
            { text: "Doing yoga or visiting an art gallery", type: "matcha" },
            { text: "Going skydiving or trying an extreme sport", type: "bacon" }
        ]
    },
    {
        q: "Choose a color palette that speaks to you:",
        a: [
            { text: "Soft beige and warm cream", type: "classic" },
            { text: "Bright rainbow and neon pink", type: "sprinkles" },
            { text: "Deep ruby red and burgundy", type: "jelly" },
            { text: "Forest green and sage", type: "matcha" },
            { text: "Bold black and metallic gold", type: "bacon" }
        ]
    },
    {
        q: "How do you usually handle stressful situations?",
        a: [
            { text: "I stick to my usual routine to feel safe", type: "classic" },
            { text: "I make jokes to lighten the mood", type: "sprinkles" },
            { text: "I need to talk about my emotions with someone", type: "jelly" },
            { text: "I meditate or take deep breaths in silence", type: "matcha" },
            { text: "I face the problem head-on with high energy", type: "bacon" }
        ]
    },
    {
        q: "If you could have one superpower, what would it be?",
        a: [
            { text: "Teleportation (to get home instantly)", type: "classic" },
            { text: "Flight (to feel the ultimate fun)", type: "sprinkles" },
            { text: "Mind reading (to understand others deeply)", type: "jelly" },
            { text: "Time manipulation (to enjoy the peaceful moments)", type: "matcha" },
            { text: "Invincibility (to take any risk without fear)", type: "bacon" }
        ]
    },
    {
        q: "What is your favorite season?",
        a: [
            { text: "Autumn - cozy sweaters and warm drinks", type: "classic" },
            { text: "Summer - festivals, sun, and endless fun", type: "sprinkles" },
            { text: "Spring - fresh blooms and romantic feelings", type: "jelly" },
            { text: "Winter - silent snowy days and hot tea", type: "matcha" },
            { text: "I love all seasons, as long as there is adventure", type: "bacon" }
        ]
    },
    {
        q: "Pick a perfect pet:",
        a: [
            { text: "A loyal and calm Golden Retriever", type: "classic" },
            { text: "A playful and energetic kitten", type: "sprinkles" },
            { text: "A mysterious and sensitive black cat", type: "jelly" },
            { text: "A slow and peaceful pet turtle", type: "matcha" },
            { text: "An exotic pet like a snake or chameleon", type: "bacon" }
        ]
    },
    {
        q: "What is your morning routine?",
        a: [
            { text: "A simple cup of coffee and a quiet breakfast", type: "classic" },
            { text: "Dancing to loud music to wake up", type: "sprinkles" },
            { text: "Lying in bed thinking about my dreams", type: "jelly" },
            { text: "Green tea and a quick meditation session", type: "matcha" },
            { text: "An intense workout or cold shower", type: "bacon" }
        ]
    },
    {
        q: "What genre of music do you listen to the most?",
        a: [
            { text: "Classic rock or lo-fi beats", type: "classic" },
            { text: "Upbeat pop and dance hits", type: "sprinkles" },
            { text: "Indie folk or emotional ballads", type: "jelly" },
            { text: "Ambient soundscapes or classical piano", type: "matcha" },
            { text: "Heavy metal, hip-hop, or experimental electronic", type: "bacon" }
        ]
    },
    {
        q: "Where is your dream vacation destination?",
        a: [
            { text: "A cozy cabin in the mountains", type: "classic" },
            { text: "A luxury resort in Ibiza with parties", type: "sprinkles" },
            { text: "A historic, romantic city like Paris", type: "jelly" },
            { text: "A quiet temple retreat in Kyoto, Japan", type: "matcha" },
            { text: "An active safari trip in Africa", type: "bacon" }
        ]
    }
];

// Nouns & Templates for generating 182 more questions
const nouns = [
    { name: "planet", classic: "Saturn", sprinkles: "Jupiter", jelly: "Venus", matcha: "Neptune", bacon: "Mars" },
    { name: "gemstone", classic: "Diamond", sprinkles: "Opal", jelly: "Ruby", matcha: "Jade", bacon: "Obsidian" },
    { name: "vehicle", classic: "Station Wagon", sprinkles: "Convertible", jelly: "Vespa", matcha: "Bicycle", bacon: "Monster Truck" },
    { name: "crystal", classic: "Clear Quartz", sprinkles: "Amethyst", jelly: "Rose Quartz", matcha: "Green Aventurine", bacon: "Pyrite" },
    { name: "historical era", classic: "The Victorian Era", sprinkles: "The Roaring Twenties", jelly: "The Renaissance", matcha: "Ancient Kyoto", bacon: "The Pirate Golden Age" },
    { name: "comfort food", classic: "Mashed Potatoes", sprinkles: "Loaded Pizza", jelly: "Warm Berry Pie", matcha: "Hot Miso Soup", bacon: "Spicy Chili Tacos" },
    { name: "dessert", classic: "Vanilla Custard", sprinkles: "Rainbow Cupcake", jelly: "Cherry Tart", matcha: "Matcha Mochi", bacon: "Maple Bacon Waffle" },
    { name: "mythology", classic: "Roman Order", sprinkles: "Norse Festivals", jelly: "Egyptian Mysteries", matcha: "Eastern Philosophy", bacon: "Celtic Rebellion" },
    { name: "art style", classic: "Classic Realism", sprinkles: "Vibrant Pop Art", jelly: "Impressionist Dreams", matcha: "Japanese Minimalism", bacon: "Edgy Street Graffiti" },
    { name: "scenery", classic: "Cozy Study Room", sprinkles: "Amusement Park", jelly: "Rainy Cozy Cafe", matcha: "Bamboo Forest Garden", bacon: "Neon Cyberpunk Alley" },
    { name: "accessory", classic: "Vintage Leather Watch", sprinkles: "Glittery Sunglasses", jelly: "Silver Heart Locket", matcha: "Handmade Wooden Ring", bacon: "Spiked Leather Collar" },
    { name: "superpower", classic: "Invulnerability", sprinkles: "Teleportation", jelly: "Empathy", matcha: "Telekinesis", bacon: "Pyrokinesis" },
    { name: "architectural style", classic: "Neoclassical", sprinkles: "Art Deco", jelly: "Gothic", matcha: "Traditional Zen", bacon: "Brutalist" },
    { name: "beverage", classic: "Warm Milk", sprinkles: "Fizzy Soda", jelly: "Red Wine", matcha: "Green Tea Latte", bacon: "Double Espresso Shot" },
    { name: "musical instrument", classic: "Grand Piano", sprinkles: "Electric Guitar", jelly: "Harp", matcha: "Bamboo Flute", bacon: "Drums" },
    { name: "constellation", classic: "Ursa Major", sprinkles: "Cassiopeia", jelly: "Orion", matcha: "Andromeda", bacon: "Scorpius" },
    { name: "tree", classic: "Oak", sprinkles: "Cherry Blossom", jelly: "Weeping Willow", matcha: "Bonsai Pine", bacon: "Redwood" },
    { name: "weather pattern", classic: "Clear Sun", sprinkles: "Rainbow", jelly: "Soft Drizzle", matcha: "Mist", bacon: "Lightning" },
    { name: "fabric", classic: "Cotton", sprinkles: "Sequins", jelly: "Velvet", matcha: "Linen", bacon: "Leather" },
    { name: "board game", classic: "Chess", sprinkles: "Monopoly", jelly: "Clue", matcha: "Go (Weiqi)", bacon: "Dungeons & Dragons" },
    { name: "flower", classic: "White Lily", sprinkles: "Sunflower", jelly: "Red Rose", matcha: "Lotus", bacon: "Venus Flytrap" },
    { name: "landscape", classic: "Rolling Hills", sprinkles: "Tropical Beach", jelly: "Mystic Forest", matcha: "Zen Garden", bacon: "Active Volcano" },
    { name: "philosophy", classic: "Stoicism", sprinkles: "Existentialism", jelly: "Romanticism", matcha: "Taoism", bacon: "Nihilism" },
    { name: "animal", classic: "Golden Retriever", sprinkles: "Parrot", jelly: "Swan", matcha: "Panda", bacon: "Wolf" },
    { name: "color", classic: "Beige", sprinkles: "Neon Pink", jelly: "Crimson", matcha: "Sage Green", bacon: "Charcoal Black" },
    { name: "element", classic: "Earth", sprinkles: "Air", jelly: "Water", matcha: "Spirit", bacon: "Fire" }
];

const prompts = [
    "Which [X] represents your inner energy?",
    "Pick a [X] that matches your current vibe:",
    "If you were a [X], what would you be?",
    "Choose a [X] for your dream aesthetic:",
    "Which [X] do you find most fascinating?",
    "Select a [X] that brings you comfort:",
    "If your soul had to choose a [X], it would be:"
];

// Generator logic to create 191 normal questions
let normalQuestions = [...baseQuestions];
nouns.forEach(noun => {
    prompts.forEach(prompt => {
        const questionText = prompt.replace("[X]", noun.name);
        normalQuestions.push({
            q: questionText,
            a: [
                { text: noun.classic, type: "classic" },
                { text: noun.sprinkles, type: "sprinkles" },
                { text: noun.jelly, type: "jelly" },
                { text: noun.matcha, type: "matcha" },
                { text: noun.bacon, type: "bacon" }
            ]
        });
    });
});

// Final crop to match hidden 191 normal + 1 secret config
normalQuestions = normalQuestions.slice(0, 191);

// Result mappings definitions
const results = {
    classic: {
        title: "Classic Glazed Donut",
        emoji: "🍩",
        description: "You are the Classic Glazed Donut! Elegant, reliable, and deeply loved by everyone. Your simple, warm, and sweet soul is more than enough."
    },
    sprinkles: {
        title: "Chocolate Sprinkles Donut",
        emoji: "🧁",
        description: "You are the Chocolate Sprinkles Donut! Full of endless energy, color, and joy. You are the absolute life of the party, always ready to make others laugh."
    },
    jelly: {
        title: "Strawberry Jelly-Filled Donut",
        emoji: "🍓",
        description: "You are the Strawberry Jelly-Filled Donut! You might look simple on the outside, but you have a beautiful, deep, and sweet surprise hidden inside."
    },
    matcha: {
        title: "Matcha Green Tea Donut",
        emoji: "🍵",
        description: "You are the Matcha Green Tea Donut! Peaceful, wise, and absolutely unique. You prefer quiet nature and always strive for zen, harmony, and self-growth."
    },
    bacon: {
        title: "Maple Bacon Donut",
        emoji: "🥓",
        description: "You are the Maple Bacon Donut! Bold, adventurous, and completely unconventional. You love breaking the rules and finding the next big adventure."
    }
};
