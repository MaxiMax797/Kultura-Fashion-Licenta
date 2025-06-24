const Wishlist = require("../models/Wishlist");

const wishlistItem = [
  {
    "_id": "65c2441232078478e340ab61",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599444f",
    "createdAt": "2025-01-15T08:23:12.794Z",
    "updatedAt": "2025-01-15T08:23:12.794Z",
    "note": "Acest produs este exact ce căutam! Calitatea pare excepțională."
  },
  {
    "_id": "65c2441232078478e340ab62",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994451",
    "createdAt": "2025-02-03T14:45:30.794Z",
    "updatedAt": "2025-02-03T14:45:30.794Z",
    "note": "Nu pot să nu mă gândesc la acest produs. Merită fiecare ban!"
  },
  {
    "_id": "65c2441232078478e340ab63",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994454",
    "createdAt": "2025-02-18T09:12:45.794Z",
    "updatedAt": "2025-02-18T09:12:45.794Z",
    "note": "Perfect pentru nevoile mele. Aștept cu nerăbdare să îl comand!"
  },
  {
    "_id": "65c2441232078478e340ab64",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994457",
    "createdAt": "2025-03-05T11:33:22.794Z",
    "updatedAt": "2025-03-05T11:33:22.794Z",
    "note": "Arata WOW! Chiar îmi doresc acest produs."
  },
  {
    "_id": "65c2441232078478e340ab65",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599445a",
    "createdAt": "2025-03-22T16:20:18.794Z",
    "updatedAt": "2025-03-22T16:20:18.794Z",
    "note": "Recenziile sunt excelente. Cred că va fi următoarea mea achiziție."
  },
  {
    "_id": "65c2441232078478e340ab66",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599445d",
    "createdAt": "2025-04-08T10:55:40.794Z",
    "updatedAt": "2025-04-08T10:55:40.794Z",
    "note": "Am văzut acest produs la un prieten și sunt fascinat. Trebuie să îl am!"
  },
  {
    "_id": "65c2441232078478e340ab67",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994460",
    "createdAt": "2025-04-15T13:42:05.794Z",
    "updatedAt": "2025-04-15T13:42:05.794Z",
    "note": "Combinația perfectă între preț și calitate. Nu mai pot aștepta să îl cumpăr!"
  },
  {
    "_id": "65c2441232078478e340ab68",
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994462",
    "createdAt": "2025-04-20T18:30:00.794Z",
    "updatedAt": "2025-04-20T18:30:00.794Z",
    "note": "Ultimul model disponibil! Exact ce îmi doresc pentru anul acesta."
  }
];

exports.seedWishlist = async () => {
  try {
    await Wishlist.insertMany(wishlistItem);
    console.log("Wishlist seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
