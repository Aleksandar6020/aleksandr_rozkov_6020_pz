const connectDB = require("./config/db");
const User = require("./models/User");
const Manul = require("./models/Manul");
const Suggestion = require("./models/Suggestion");

const manuls = [
    {
        name: "Batu",
        photoUrl: "https://cdn.manulization.com/images/cPpAPBjIVjOvwitg_mar-1_mw-600.webp",
        shortDescription: "A famous Pallas's cat known for his grumpy expression.",
        longStory: "Batu is one of the most recognizable manuls, famous for his expressive face and calm behavior.",
        locationType: "ZOO",
        region: "",
        tags: ["zoo", "popular"]
    },
    {
        name: "Wild Manul",
        photoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Manoel.jpg",
        shortDescription: "A wild Pallas's cat from the Mongolian steppes.",
        longStory: "Wild manuls inhabit cold grasslands and rocky steppes of Central Asia.",
        locationType: "WILD",
        region: "Mongolia",
        tags: ["wild"]
    },
    {
        name: "Arkas",
        photoUrl: "https://cdn.manulization.ru/images/8jdAvFBQCGfAInr8_mw-1024.webp",
        shortDescription: "Bohus and Borsika's son living at Korkeasaari Zoo.",
        longStory: "Arkas was born in Budapest Zoo and currently lives in Helsinki.",
        locationType: "ZOO",
        region: "Helsinki, Finland",
        tags: ["zoo", "helsinki"]
    },
    {
        name: "Mimi",
        photoUrl: "https://cdn.manulization.ru/images/HzS5sYiODCJ9ldZg_mw-1024.webp",
        shortDescription: "Resident female manul of Korkeasaari Zoo.",
        longStory: "Mimi was born in Chemnitz Zoo and now lives in Helsinki.",
        locationType: "ZOO",
        region: "Helsinki, Finland",
        tags: ["zoo", "helsinki"]
    },
    {
        name: "Innokentiy (Kesha)",
        photoUrl: "https://cdn.manulization.ru/images/rcSqdrqXMVhCTYPV_mw-1024.webp",
        shortDescription: "Well known Russian manul.",
        longStory: "Born in Novosibirsk Zoo and later transferred to a breeding center.",
        locationType: "ZOO",
        region: "Russia",
        tags: ["zoo", "russia"]
    },
    {
        name: "Bohus",
        photoUrl: "https://cdn.manulization.ru/images/Wue2TFb9nRH8Z1j6_mw-1024.webp",
        shortDescription: "Father of Arkas and famous Budapest manul.",
        longStory: "Bohus was born in Chemnitz Zoo and later moved to Budapest.",
        locationType: "ZOO",
        region: "Budapest, Hungary",
        tags: ["zoo", "hungary"]
    },
    {
        name: "Jihl",
        photoUrl: "https://cdn.manulization.ru/images/rim0xk7rT4DqsxGj_mw-1024.webp",
        shortDescription: "Young female manul living in Paris.",
        longStory: "Born in Jihlava Zoo and later moved to Paris.",
        locationType: "ZOO",
        region: "Paris, France",
        tags: ["zoo", "france"]
    },
    {
        name: "Eru",
        photoUrl: "https://cdn.manulization.com/images/tK4vn1LL32kH0kJz_mw-1024.webp",
        shortDescription: "Japanese manul living in Higashiyama Zoo.",
        longStory: "Eru was born in Nasu Animal Kingdom and later moved to Nagoya.",
        locationType: "ZOO",
        region: "Japan",
        tags: ["zoo", "japan"]
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
