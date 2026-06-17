const connectDB = require("./config/db");
const User = require("./models/User");
const Manul = require("./models/Manul");
const Suggestion = require("./models/Suggestion");

const manuls = [
  {
    name: "Batu",
    photoUrl: "https://cdn.manulization.com/images/cPpAPBjIVjOvwitg_mar-1_mw-600.webp",
    shortDescription: "A famous Pallas's cat known for his grumpy expression.",
    longStory: "Batu is one of the most recognizable manuls, famous for his expressive face and calm behavior. Like all Pallas's cats, he prefers solitude and rocky habitats.",
    locationType: "ZOO",
    region: "",
    tags: ["zoo", "popular"],
    likesCount: 16,
    favoritesCount: 5,
    createdAt: "2024-01-10"
  },
  {
    name: "Wild Manul",
    photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Manoel.jpg",
    shortDescription: "A wild Pallas's cat from the Mongolian steppes.",
    longStory: "Wild manuls inhabit cold grasslands and rocky steppes of Central Asia. They are excellent hunters but very sensitive to environmental changes.",
    locationType: "WILD",
    region: "Mongolia",
    tags: ["wild"],
    likesCount: 23,
    favoritesCount: 8,
    createdAt: "2024-02-01"
  },
  {
    name: "Arkas",
    photoUrl: "https://cdn.manulization.ru/images/8jdAvFBQCGfAInr8_mw-1024.webp",
    shortDescription: "Bohus and Borsika's son, living at Korkeasaari Zoo.",
    longStory: "Arkas was born at Budapest Zoo & Botanical Garden and now lives in Korkeasaari Zoo in Helsinki.",
    locationType: "ZOO",
    region: "Helsinki, Finland",
    tags: ["zoo", "helsinki"],
    likesCount: 1,
    favoritesCount: 0,
    createdAt: "2026-01-30"
  },
  {
    name: "Mimi",
    photoUrl: "https://cdn.manulization.ru/images/HzS5sYiODCJ9ldZg_mw-1024.webp",
    shortDescription: "Norbu and Pema's daughter, living at Korkeasaari Zoo.",
    longStory: "Mimi lives in Korkeasaari Zoo and is known as the resident lady of the manul pair.",
    locationType: "ZOO",
    region: "Helsinki, Finland",
    tags: ["zoo", "helsinki"],
    likesCount: 0,
    favoritesCount: 0,
    createdAt: "2026-01-30"
  },
  {
    name: "Eru",
    photoUrl: "https://cdn.manulization.com/images/tK4vn1LL32kH0kJz_mw-1024.webp",
    shortDescription: "A Pallas's cat who lives in Higashiyama Zoo and Botanical Gardens.",
    longStory: "Eru was born in Nasu Animal Kingdom and now lives in Higashiyama Zoo and Botanical Gardens in Japan.",
    locationType: "ZOO",
    region: "Japan",
    tags: ["zoo", "japan"],
    likesCount: 1,
    favoritesCount: 0,
    createdAt: "2026-01-31"
  }
];

const seed = async () => {
    await connectDB();
    await Promise.all([User.deleteMany(), Manul.deleteMany(), Suggestion.deleteMany()]);

    await User.create({ email: "admin@manuls.com", password: "admin123", role: "admin" });
    const user = await User.create({ email: "user@manuls.com", password: "user123", role: "user" });
    const createdManuls = await Manul.insertMany(manuls);

    await Suggestion.create({
        userId: user._id,
        manulId: createdManuls[0]._id,
        type: "STORY",
        content: "This manul has an especially round and fluffy winter coat.",
        status: "PENDING"
    });

    console.log("Seed completed");
    console.log("Admin: admin@manuls.com / admin123");
    console.log("User: user@manuls.com / user123");
    process.exit(0);
};

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
