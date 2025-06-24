const Order = require("../models/Order");
const fs = require("fs");
const mongoose = require("mongoose");

const orders = [
  {
    "_id": "65c2658db53f820728d0745b",
    "user": "65c2526fdcd9253acfbaa731",
    "item": [
      {
        "user": "65c2526fdcd9253acfbaa731",
        "product": {
          "_id": "65a7e45902e12c44f5994451",
          "title": "Pantaloni 03 Tyler Slim Albastru",
          "description": "Compozitie: 99%Bumbac, 1%Elastan.",
          "price": 389.99,
          "discountPercentage": 0,
          "stockQuantity": 1144,
          "brand": { "_id": "65a7e20102e12c44f59943e1", "name": "Superdry" },
          "category": "65a7e24602e12c44f599442f",
          "thumbnail": "//vgeneration.ro/cdn/shop/products/unnamed_4439fa26-e479-4495-83b6-202d725b3779_large.jpg",
          "images": [
            "//vgeneration.ro/cdn/shop/products/unnamed_4439fa26-e479-4495-83b6-202d725b3779_large.jpg"
          ],
          "isDeleted": false,
          "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 2,
        "_id": "65c26581b53f820728d07457"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd8",
        "user": "65c2526fdcd9253acfbaa731",
        "street": "Bulevardul Unirii 18",
        "city": "București",
        "state": "București",
        "phoneNumber": "0744987654",
        "postalCode": "030119",
        "country": "Romania",
        "type": "Business",
        "__v": 0
      }
    ],
    "status": "Delivered",
    "paymentMode": "CARD",
    "total": 779.98,
    "createdAt": "2025-01-10T14:22:15.151Z"
  },
  {
    "_id": "65c2658db53f820728d0745c",
    "user": "65c2526fdcd9253acfbaa731",
    "item": [
      {
        "user": "65c2526fdcd9253acfbaa731",
        "product": {
          "_id": "65a7e45902e12c44f5994457",
          "title": "Camasa Superdry Shirt",
          "description": "Cunoscut pentru designul sau unic, ce imbina elemente americane cu detalii inspirate de cultura japoneza.",
          "price": 449.99,
          "discountPercentage": 0,
          "stockQuantity": 1093,
          "brand": { "_id": "65a7e20102e12c44f59943e1", "name": "Superdry" },
          "category": "65a7e24602e12c44f5994431",
          "thumbnail": "//vgeneration.ro/cdn/shop/files/superdry_m4010607a-sbs_0_large.jpg",
          "images": [
            "//vgeneration.ro/cdn/shop/files/superdry_m4010607a-sbs_0_large.jpg"
          ],
          "isDeleted": false,
          "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65c26581b53f820728d07458"
      },
      {
        "user": "65c2526fdcd9253acfbaa731",
        "product": {
          "_id": "65a7e45902e12c44f599445a",
          "title": "Palarie Bucket Newera Vegas Tapered Bucket Haasf1 Blk",
          "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice.",
          "price": 249.99,
          "discountPercentage": 0,
          "stockQuantity": 676,
          "brand": { "_id": "65a7e20102e12c44f59943da", "name": "New Era" },
          "category": "65a7e24602e12c44f5994435",
          "thumbnail": "//vgeneration.ro/cdn/shop/files/60593260_large.jpg",
          "images": [
            "//vgeneration.ro/cdn/shop/files/60593260_large.jpg"
          ],
          "isDeleted": false,
          "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65c26581b53f820728d07459"
      }
    ],
    "address": [
      {
        "_id": "65c26398e1e1a2106ac8fbd5",
        "user": "65c2526fdcd9253acfbaa731",
        "street": "Strada Mihai Eminescu 11",
        "city": "Cluj-Napoca",
        "state": "Cluj",
        "phoneNumber": "0723123456",
        "postalCode": "400001",
        "country": "Romania",
        "type": "Home",
        "__v": 0
      }
    ],
    "status": "Dispatched",
    "paymentMode": "COD",
    "total": 699.98,
    "createdAt": "2025-02-05T09:15:33.151Z"
  },
  {
    "_id": "65c2658db53f820728d0745d",
    "user": "65c2526fdcd9253acfbaa731",
    "item": [
      {
        "user": "65c2526fdcd9253acfbaa731",
        "product": {
          "_id": "65a7e45902e12c44f599445e",
          "title": "Cizme Classic Mini Ii Negru",
          "description": "Unul dintre cele mai populare branduri de incaltaminte din lume, UGG a devenit un adevarat icon.",
          "price": 949.99,
          "discountPercentage": 0,
          "stockQuantity": 777,
          "brand": { "_id": "65a7e20102e12c44f59943e2", "name": "UGG" },
          "category": "65a7e24602e12c44f5994432",
          "thumbnail": "//vgeneration.ro/cdn/shop/products/1016222_large.jpg",
          "images": [
            "//vgeneration.ro/cdn/shop/products/1016222_large.jpg"
          ],
          "isDeleted": false,
          "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65c26581b53f820728d0745a"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd9",
        "user": "65c2526fdcd9253acfbaa731",
        "street": "Strada Avram Iancu 42",
        "city": "Timisoara",
        "state": "Timis",
        "phoneNumber": "0755111222",
        "postalCode": "300123",
        "country": "Romania",
        "type": "Home",
        "__v": 0
      }
    ],
    "status": "Cancelled",
    "paymentMode": "CARD",
    "total": 949.99,
    "createdAt": "2025-03-12T16:45:10.151Z"
  },
  {
    "_id": "65c2658db53f820728d0745e",
    "user": "65c2526fdcd9253acfbaa731",
    "item": [
      {
        "user": "65c2526fdcd9253acfbaa731",
        "product": {
          "_id": "65a7e45902e12c44f5994461",
          "title": "Hanorac LA Clippers Neon New Era",
          "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice.",
          "price": 349.99,
          "discountPercentage": 0,
          "stockQuantity": 939,
          "brand": { "_id": "65a7e20102e12c44f59943da", "name": "New Era" },
          "category": "65a7e24602e12c44f5994430",
          "thumbnail": "//vgeneration.ro/cdn/shop/products/12827216_large.jpg",
          "images": [
            "//vgeneration.ro/cdn/shop/products/12827216_large.jpg"
          ],
          "isDeleted": false,
          "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65c26581b53f820728d0745b"
      },
      {
        "user": "65c2526fdcd9253acfbaa731",
        "product": {
          "_id": "65a7e45902e12c44f599445c",
          "title": "Ochelari De Soare M Spicoli 4 Shades White-Rainbow M Multicolor",
          "description": "Compozitie: Material Textil",
          "price": 79.99,
          "discountPercentage": 0,
          "stockQuantity": 370,
          "brand": { "_id": "65a7e20102e12c44f59943db", "name": "VANS" },
          "category": "65a7e24602e12c44f599442e",
          "thumbnail": "//vgeneration.ro/cdn/shop/products/LC0M7P-HERO_large.jpg",
          "images": [
            "//vgeneration.ro/cdn/shop/products/LC0M7P-HERO_large.jpg"
          ],
          "isDeleted": false,
          "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65c26581b53f820728d0745c"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbda",
        "user": "65c2526fdcd9253acfbaa731",
        "street": "Strada Tudor Vladimirescu 5",
        "city": "Iasi",
        "state": "Iasi",
        "phoneNumber": "0733444555",
        "postalCode": "700123",
        "country": "Romania",
        "type": "Work",
        "__v": 0
      }
    ],
    "status": "Pending",
    "paymentMode": "CARD",
    "total": 429.98,
    "createdAt": "2025-04-05T11:30:45.151Z"
  },
  {
    "_id": "65c2658db53f820728d0745f",
    "user": "65c2526fdcd9253acfbaa731",
    "item": [
      {
        "user": "65c2526fdcd9253acfbaa731",
        "product": {
          "_id": "65a7e45902e12c44f5994453",
          "title": "Rucsac Realm Street Sport VANS",
          "description": "Fondat in 1966, VANS intruchipeaza spiritul tanar, fiind dedicat culturii skateboardingului.",
          "price": 229.99,
          "discountPercentage": 0,
          "stockQuantity": 1026,
          "brand": { "_id": "65a7e20102e12c44f59943db", "name": "VANS" },
          "category": "65a7e24602e12c44f5994433",
          "thumbnail": "//vgeneration.ro/cdn/shop/products/1led_large.png%3Fv=1601136051",
          "images": [
            "//vgeneration.ro/cdn/shop/products/1led_large.png%3Fv=1601136051"
          ],
          "isDeleted": false,
          "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65c26581b53f820728d0745d"
      },
      {
        "user": "65c2526fdcd9253acfbaa731",
        "product": {
          "_id": "65a7e45902e12c44f599445f",
          "title": "Papuci Pool Slide SUPERDRY",
          "description": "Cunoscut pentru designul sau unic, ce imbina elemente americane cu detalii inspirate de cultura japoneza.",
          "price": 149.99,
          "discountPercentage": 0,
          "stockQuantity": 423,
          "brand": { "_id": "65a7e20102e12c44f59943e1", "name": "Superdry" },
          "category": "65a7e24602e12c44f5994434",
          "thumbnail": "//vgeneration.ro/cdn/shop/products/mf310126a_a4y_large.jpg",
          "images": [
            "//vgeneration.ro/cdn/shop/products/mf310126a_a4y_large.jpg"
          ],
          "isDeleted": false,
          "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65c26581b53f820728d0745e"
      },
      {
        "user": "65c2526fdcd9253acfbaa731",
        "product": {
          "_id": "65a7e45902e12c44f5994459",
          "title": "Palarie New Era Hat New York Yankees",
          "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice.",
          "price": 129.99,
          "discountPercentage": 0,
          "stockQuantity": 1211,
          "brand": { "_id": "65a7e20102e12c44f59943da", "name": "New Era" },
          "category": "65a7e24602e12c44f5994435",
          "thumbnail": "//vgeneration.ro/cdn/shop/files/60503355_large.jpg",
          "images": [
            "//vgeneration.ro/cdn/shop/files/60503355_large.jpg"
          ],
          "isDeleted": false,
          "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65c26581b53f820728d0745f"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbdb",
        "user": "65c2526fdcd9253acfbaa731",
        "street": "Strada Garii 7",
        "city": "Brasov",
        "state": "Brasov",
        "phoneNumber": "0766777888",
        "postalCode": "500123",
        "country": "Romania",
        "type": "Home",
        "__v": 0
      }
    ],
    "status": "Delivered",
    "paymentMode": "CARD",
    "total": 509.97,
    "createdAt": "2025-04-18T08:15:22.151Z"
  },

  // Comenzi martie 2025 (4 comenzi)
  {
    "_id": "65dd4f8e7a12bb0123456781",
    "user": "65c2526fdcd9253acfbab001",
    "item": [
      {
        "user": "65c2526fdcd9253acfbab001",
        "product": {
        "_id": "65a7e45902e12c44f5994451",
        "title": "Pantaloni 03 Tyler Slim Albastru",
        "description": "Compozitie: 99%Bumbac, 1%Elastan.",
        "price": 389.99,
        "discountPercentage": 0,
        "stockQuantity": 1144,
        "brand": { "_id": "65a7e20102e12c44f59943e1", "name": "Superdry" },
        "category": "65a7e24602e12c44f599442f",
        "thumbnail": "//vgeneration.ro/cdn/shop/products/unnamed_4439fa26-e479-4495-83b6-202d725b3779_large.jpg",
        "images": ["//vgeneration.ro/cdn/shop/products/unnamed_4439fa26-e479-4495-83b6-202d725b3779_large.jpg"],
        "isDeleted": false,
        "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65dd4f8e7a12bb0123456782"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd8",
        "user": "65c2526fdcd9253acfbab001",
        "street": "Bulevardul Unirii 18",
        "city": "București",
        "state": "București",
        "phoneNumber": "0744987654",
        "postalCode": "030119",
        "country": "Romania",
        "type": "Business",
        "__v": 0
      }
    ],
    "status": "Delivered",
    "paymentMode": "CARD",
    "total": 389.99,
    "createdAt": "2025-03-05T10:23:15.151Z"
  },
  {
    "_id": "65dd4f8e7a12bb0123456783",
    "user": "65c2526fdcd9253acfbab001",
    "item": [
      {
        "user": "65c2526fdcd9253acfbab001",
        "product": {
        "_id": "65a7e45902e12c44f5994457",
        "title": "Camasa Superdry Shirt",
        "description": "Cunoscut pentru designul sau unic, ce imbina elemente americane cu detalii inspirate de cultura japoneza.",
        "price": 449.99,
        "discountPercentage": 0,
        "stockQuantity": 1093,
        "brand": { "_id": "65a7e20102e12c44f59943e1", "name": "Superdry" },
        "category": "65a7e24602e12c44f5994431",
        "thumbnail": "//vgeneration.ro/cdn/shop/files/superdry_m4010607a-sbs_0_large.jpg",
        "images": ["//vgeneration.ro/cdn/shop/files/superdry_m4010607a-sbs_0_large.jpg"],
        "isDeleted": false,
        "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65dd4f8e7a12bb0123456784"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd8",
        "user": "65c2526fdcd9253acfbab001",
        "street": "Bulevardul Unirii 18",
        "city": "București",
        "state": "București",
        "phoneNumber": "0744987654",
        "postalCode": "030119",
        "country": "Romania",
        "type": "Business",
        "__v": 0
      }
    ],
    "status": "Delivered",
    "paymentMode": "CARD",
    "total": 449.99,
    "createdAt": "2025-03-12T14:35:20.151Z"
  },
  {
    "_id": "65dd4f8e7a12bb0123456785",
    "user": "65c2526fdcd9253acfbab001", 
    "item": [
      {
        "user": "65c2526fdcd9253acfbab001",
        "product": {
        "_id": "65b3f7a812e34c67d8921a56",
        "title": "Palarie Bucket Newera Bronze Bucket Manutd Grh",
        "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice.",
        "price": 179.99,
        "discountPercentage": 0,
        "stockQuantity": 1633,
        "brand": { "_id": "65a7e20102e12c44f59943da", "name": "New Era" },
        "category": "65a7e24602e12c44f5994435",
        "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595684_large.png",
        "images": ["https://vgeneration.ro/cdn/shop/files/60595684_large.png"],
        "isDeleted": false,
        "updatedAt": "2025-05-06T00:00:00.000Z"
        },
        "quantity": 1,
        "_id": "65dd4f8e7a12bb0123456786"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd8",
        "user": "65c2526fdcd9253acfbab001",
        "street": "Bulevardul Unirii 18",
        "city": "București",
        "state": "București",
        "phoneNumber": "0744987654",
        "postalCode": "030119",
        "country": "Romania",
        "type": "Business",
        "__v": 0
      }
    ],
    "status": "Delivered",
    "paymentMode": "COD",
    "total": 179.99,
    "createdAt": "2025-03-18T09:45:12.151Z"
  },
  {
    "_id": "65dd4f8e7a12bb0123456787",
    "user": "65c2526fdcd9253acfbab001",
    "item": [
      {
        "user": "65c2526fdcd9253acfbab001",
        "product": {
        "_id": "65a7e45902e12c44f599445e",
        "title": "Cizme Classic Mini Ii Negru",
        "description": "Unul dintre cele mai populare branduri de incaltaminte din lume, UGG a devenit un adevarat icon.",
        "price": 949.99,
        "discountPercentage": 0,
        "stockQuantity": 777,
        "brand": { "_id": "65a7e20102e12c44f59943e2", "name": "UGG" },
        "category": "65a7e24602e12c44f5994432",
        "thumbnail": "//vgeneration.ro/cdn/shop/products/1016222_large.jpg",
        "images": ["//vgeneration.ro/cdn/shop/products/1016222_large.jpg"],
        "isDeleted": false,
        "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65dd4f8e7a12bb0123456788"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd8",
        "user": "65c2526fdcd9253acfbab001",
        "street": "Bulevardul Unirii 18",
        "city": "București",
        "state": "București",
        "phoneNumber": "0744987654",
        "postalCode": "030119",
        "country": "Romania",
        "type": "Business",
        "__v": 0
      }
    ],
    "status": "Delivered",
    "paymentMode": "CARD",
    "total": 949.99,
    "createdAt": "2025-03-27T16:20:45.151Z"
  },

  // Comenzi mai 2025 (2 comenzi)
  {
    "_id": "65dd4f8e7a12bb0123456789",
    "user": "65c2526fdcd9253acfbab001",
    "item": [
      {
        "user": "65c2526fdcd9253acfbab001",
        "product": {
        "_id": "65a7e45902e12c44f5994459",
        "title": "Palarie New Era Hat New York Yankees",
        "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice.",
        "price": 129.99,
        "discountPercentage": 0,
        "stockQuantity": 1211,
        "brand": { "_id": "65a7e20102e12c44f59943da", "name": "New Era" },
        "category": "65a7e24602e12c44f5994435",
        "thumbnail": "//vgeneration.ro/cdn/shop/files/60503355_large.jpg",
        "images": ["//vgeneration.ro/cdn/shop/files/60503355_large.jpg"],
        "isDeleted": false,
        "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 2,
        "_id": "65dd4f8e7a12bb012345678a"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd8",
        "user": "65c2526fdcd9253acfbab001",
        "street": "Bulevardul Unirii 18",
        "city": "București",
        "state": "București", 
        "phoneNumber": "0744987654",
        "postalCode": "030119",
        "country": "Romania",
        "type": "Business",
        "__v": 0
      }
    ],
    "status": "Delivered",
    "paymentMode": "CARD",
    "total": 259.98,
    "createdAt": "2025-05-10T11:15:30.151Z"
  },
  {
    "_id": "65dd4f8e7a12bb012345678b",
    "user": "65c2526fdcd9253acfbab001",
    "item": [
      {
        "user": "65c2526fdcd9253acfbab001",
        "product": {
        "_id": "65a7e45902e12c44f599445c",
        "title": "Ochelari De Soare M Spicoli 4 Shades White-Rainbow M Multicolor",
        "description": "Compozitie: Material Textil",
        "price": 79.99,
        "discountPercentage": 0,
        "stockQuantity": 370,
        "brand": { "_id": "65a7e20102e12c44f59943db", "name": "VANS" },
        "category": "65a7e24602e12c44f599442e",
        "thumbnail": "//vgeneration.ro/cdn/shop/products/LC0M7P-HERO_large.jpg",
        "images": ["//vgeneration.ro/cdn/shop/products/LC0M7P-HERO_large.jpg"],
        "isDeleted": false,
        "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65dd4f8e7a12bb012345678c"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd8",
        "user": "65c2526fdcd9253acfbab001",
        "street": "Bulevardul Unirii 18",
        "city": "București",
        "state": "București",
        "phoneNumber": "0744987654",
        "postalCode": "030119",
        "country": "Romania",
        "type": "Business",
        "__v": 0
      }
    ],
    "status": "Delivered",
    "paymentMode": "COD",
    "total": 79.99,
    "createdAt": "2025-05-18T14:40:22.151Z"
  },

  // Ultimele 7 zile (4 comenzi)
  {
    "_id": "65dd4f8e7a12bb012345678d",
    "user": "65c2526fdcd9253acfbab001",
    "item": [
      {
        "user": "65c2526fdcd9253acfbab001",
        "product": {
        "_id": "65a7e45902e12c44f599445f",
        "title": "Papuci Pool Slide SUPERDRY",
        "description": "Cunoscut pentru designul sau unic, ce imbina elemente americane cu detalii inspirate de cultura japoneza.",
        "price": 149.99,
        "discountPercentage": 0,
        "stockQuantity": 423,
        "brand": { "_id": "65a7e20102e12c44f59943e1", "name": "Superdry" },
        "category": "65a7e24602e12c44f5994434",
        "thumbnail": "//vgeneration.ro/cdn/shop/products/mf310126a_a4y_large.jpg",
        "images": ["//vgeneration.ro/cdn/shop/products/mf310126a_a4y_large.jpg"],
        "isDeleted": false,
        "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65dd4f8e7a12bb012345678e"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd8",
        "user": "65c2526fdcd9253acfbab001",
        "street": "Bulevardul Unirii 18",
        "city": "București",
        "state": "București",
        "phoneNumber": "0744987654",
        "postalCode": "030119",
        "country": "Romania",
        "type": "Business",
        "__v": 0
      }
    ],
    "status": "Delivered",
    "paymentMode": "CARD",
    "total": 149.99,
    "createdAt": "2025-05-30T09:30:15.151Z"
  },
  {
    "_id": "65dd4f8e7a12bb012345678f",
    "user": "65c2526fdcd9253acfbab001",
    "item": [
      {
        "user": "65c2526fdcd9253acfbab001",
        "product": {
        "_id": "65b3f7a812e34c67d8921a58",
        "title": "Sapca Newera Home Field 9Forty Trucker Neyyan Blkblk",
        "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice.",
        "price": 169.99,
        "discountPercentage": 0,
        "stockQuantity": 556,
        "brand": { "_id": "65a7e20102e12c44f59943da", "name": "New Era" },
        "category": "65a7e24602e12c44f599442c",
        "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595503_large.png",
        "images": ["https://vgeneration.ro/cdn/shop/files/60595503_large.png"],
        "isDeleted": false,
        "updatedAt": "2025-05-06T00:00:00.000Z"
        },
        "quantity": 1,
        "_id": "65dd4f8e7a12bb0123456794"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd8",
        "user": "65c2526fdcd9253acfbab001",
        "street": "Bulevardul Unirii 18",
        "city": "București",
        "state": "București",
        "phoneNumber": "0744987654",
        "postalCode": "030119",
        "country": "Romania",
        "type": "Business",
        "__v": 0
      }
    ],
    "status": "Out for delivery",
    "paymentMode": "CARD",
    "total": 169.99,
    "createdAt": "2025-05-31T13:15:40.151Z"
  },
  {
    "_id": "65dd4f8e7a12bb0123456790",
    "user": "65c2526fdcd9253acfbab001",
    "item": [
      {
        "user": "65c2526fdcd9253acfbab001",
        "product": {
        "_id": "65a7e45902e12c44f5994450",
        "title": "Camasa Hawaiian Box Rosie",
        "description": "Cunoscut pentru designul sau unic, ce imbina elemente americane cu detalii inspirate de cultura japoneza.",
        "price": 389.99,
        "discountPercentage": 0,
        "stockQuantity": 245,
        "brand": { "_id": "65a7e20102e12c44f59943e1", "name": "Superdry" },
        "category": "65a7e24602e12c44f5994431",
        "thumbnail": "https://vgeneration.ro/cdn/shop/files/superdry_Hawian_SS_Shirt_m4010620a_8ul_apparelcheshire_large.jpg",
        "images": ["https://vgeneration.ro/cdn/shop/files/superdry_Hawian_SS_Shirt_m4010620a_8ul_apparelcheshire_large.jpg"],
        "isDeleted": false,
        "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65dd4f8e7a12bb0123456791"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd8",
        "user": "65c2526fdcd9253acfbab001",
        "street": "Bulevardul Unirii 18",
        "city": "București",
        "state": "București",
        "phoneNumber": "0744987654",
        "postalCode": "030119",
        "country": "Romania",
        "type": "Business",
        "__v": 0
      }
    ],
    "status": "Dispatched",
    "paymentMode": "COD",
    "total": 389.99,
    "createdAt": "2025-05-30T16:45:20.151Z"
  },
  {
    "_id": "65dd4f8e7a12bb0123456792",
    "user": "65c2526fdcd9253acfbab001",
    "item": [
      {
        "user": "65c2526fdcd9253acfbab001",
        "product": {
        "_id": "65a7e45902e12c44f5994453",
        "title": "Rucsac Realm Street Sport VANS",
        "description": "Fondat in 1966, VANS intruchipeaza spiritul tanar, fiind dedicat culturii skateboardingului.",
        "price": 229.99,
        "discountPercentage": 0,
        "stockQuantity": 1026,
        "brand": { "_id": "65a7e20102e12c44f59943db", "name": "VANS" },
        "category": "65a7e24602e12c44f5994433",
        "thumbnail": "//vgeneration.ro/cdn/shop/products/1led_large.png%3Fv=1601136051",
        "images": ["//vgeneration.ro/cdn/shop/products/1led_large.png%3Fv=1601136051"],
        "isDeleted": false,
        "updatedAt": "2024-04-22T09:22:57.840Z"
        },
        "quantity": 1,
        "_id": "65dd4f8e7a12bb0123456793"
      }
    ],
    "address": [
      {
        "_id": "65c26412e1e1a2106ac8fbd8",
        "user": "65c2526fdcd9253acfbab001",
        "street": "Bulevardul Unirii 18",
        "city": "București",
        "state": "București",
        "phoneNumber": "0744987654",
        "postalCode": "030119",
        "country": "Romania",
        "type": "Business",
        "__v": 0
      }
    ],
    "status": "Dispatched",
    "paymentMode": "CARD",
    "total": 229.99,
    "createdAt": "2025-06-01T10:25:30.151Z"
  }

];

exports.seedOrder = async () => {
  try {
    await Order.insertMany(orders);
    console.log("Order seeded successfully");
  } catch (error) {
    console.log(error);
  }
};