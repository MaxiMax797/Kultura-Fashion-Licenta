const Brand = require("../models/Brand");

const brands = [
  { _id: "65a7e20102e12c44f59943da", name: "New Era" },
  { _id: "65a7e20102e12c44f59943db", name: "Vans" },
  { _id: "65a7e20102e12c44f59943dc", name: "Converse" },
  { _id: "65a7e20102e12c44f59943dd", name: "Fila" },
  { _id: "65a7e20102e12c44f59943de", name: "New Balance" },
  { _id: "65a7e20102e12c44f59943df", name: "Dr Mortens" },
  { _id: "65a7e20102e12c44f59943e0", name: "Crep Protect" },
  { _id: "65a7e20102e12c44f59943e1", name: "SuperDry" },
  { _id: "65a7e20102e12c44f59943e2", name: "UGG" },
  { _id: "65a7e20102e12c44f59943e3", name: "Reebok" },
];


exports.seedBrand = async () => {
  try {
    await Brand.insertMany(brands);
    console.log('Brand seeded successfully');
  } catch (error) {
    console.log(error);
  }
};
