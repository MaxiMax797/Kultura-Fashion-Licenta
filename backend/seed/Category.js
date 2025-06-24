const Category = require("../models/Category");

const categories = [
  { _id: "65a7e24602e12c44f599442c", name: "Sepci" },
  { _id: "65a7e24602e12c44f599442d", name: "Tenisi" },
  { _id: "65a7e24602e12c44f599442e", name: "Ochelari de soare" },
  { _id: "65a7e24602e12c44f599442f", name: "Pantaloni" },
  { _id: "65a7e24602e12c44f5994430", name: "Hanorace" },
  { _id: "65a7e24602e12c44f5994431", name: "Camasi" },
  { _id: "65a7e24602e12c44f5994432", name: "Cizme" },
  { _id: "65a7e24602e12c44f5994433", name: "Rucsacuri" },
  { _id: "65a7e24602e12c44f5994434", name: "Papuci" },
  { _id: "65a7e24602e12c44f5994435", name: "Palarii" },
];


exports.seedCategory = async () => {
  try {
    await Category.insertMany(categories);
    console.log("Category seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
