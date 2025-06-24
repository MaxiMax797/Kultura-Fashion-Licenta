const Product = require("../models/Product");
const mongoose = require('mongoose');


const products = [
  {
    "_id": "65a7e45902e12c44f599444f",
    "title": "Sapca New Era albastra 39Thirty League Basic Los Angeles Dodgers",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Polyester",
    "price": 129.99,
    "gender": "men",
    "sku": "10145640",
    "discountPercentage": 0,
    "stockQuantity": 2500,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 2500
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/products/10145640_large.jpg",
    "images": [
      "https://vgeneration.ro/cdn/shop/products/10145640_large.jpg"
    ],
    "isDeleted": false,
    "updatedAt": "2024-04-22T09:22:57.840Z"
  },
  {
    "_id": "65a7e45902e12c44f5994450",
    "title": "Sapca New Era 39Thirty League Basic New York Yankees albastra",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Polyester",
    "price": 129.99,
    "gender": "men", 
    "sku": "10145636",
    "discountPercentage": 0,
    "stockQuantity": 2000,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 2000
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/products/10145636_6aaef26f-89a7-44c5-9fd0-b95bc45c93f2_large.jpg",
    "images": [
      "https://vgeneration.ro/cdn/shop/products/10145636_6aaef26f-89a7-44c5-9fd0-b95bc45c93f2_large.jpg"
    ],
    "isDeleted": false,
    "updatedAt": "2024-04-22T09:22:57.840Z"
  },
  {
    "_id": "65a7e45902e12c44f5994451",
    "title": "Pantaloni 03 Tyler Slim Albastru",
    "description": "Compozitie: 99%Bumbac, 1%Elastan.\nBlugii Superdry 03 Tyler Slim pentru barbati. Acesti blugi subtiri au un design clasic cu cinci buzunare, inclusiv un buzunar mic, gaici de curea este inchiderea cu nasture si fermoar. Finisat cu logo-ul Superdry pe buzunarul din spate este un plasture din piele Superdry pe talie, acesti blugi sunt ideali pentru garderoba ta de zi cu zi.",
    "price": 389.99,
    "gender": "men", 
    "sku": "M7010001A_VF6",
    "discountPercentage": 0,
    "stockQuantity": 100,
    "sizeInventory": {
      "XS": 0,
      "S": 100,
      "M": 0,
      "L": 0,
      "XL": 0
    },
    "brand": "65a7e20102e12c44f59943e1",
    "category": "65a7e24602e12c44f599442f",
    "thumbnail": "https://vgeneration.ro/cdn/shop/products/m7010024a_afb_large.jpg",
    "images": [
      "https://vgeneration.ro/cdn/shop/products/m7010024a_afb_large.jpg"
    ],
    "isDeleted": false,
    "updatedAt": "2024-04-22T09:22:57.840Z"
  },
  {
    "_id": "65a7e45902e12c44f5994457",
    "title": "Camasa Superdry Shirt",
    "description": "Cunoscut pentru designul sau unic, ce imbina elemente americane cu detalii inspirate de cultura japoneza, Superdy te va cuceri cu piese de calitate, ce vor deveni alegerea principala intr-o tinuta contemporana. compozitie: 100%IN",
    "price": 449.99,
    "gender": "men", 
    "sku": "M4010607A_01C",
    "discountPercentage": 0,
    "stockQuantity": 1093,
    "sizeInventory": {
      "XS": 109,
      "S": 219,
      "M": 328,
      "L": 273,
      "XL": 164,
      "OSFA": 0
    },
    "brand": "65a7e20102e12c44f59943e1",
    "category": "65a7e24602e12c44f5994431",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/superdry_m4010607a-sbs_0_large.jpg",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/superdry_m4010607a-sbs_0_large.jpg"
    ],
    "isDeleted": false,
    "updatedAt": "2024-04-22T09:22:57.840Z"
  },
  {
    "_id": "65a7e45902e12c44f5994458",
    "title": "Camasa Superdry Shirt tropicala",
    "description": "Cunoscut pentru designul sau unic, ce imbina elemente americane cu detalii inspirate de cultura japoneza, Superdy te va cuceri cu piese de calitate, ce vor deveni alegerea principala intr-o tinuta contemporana. compozitie: 70%MODAL-30%BUMBAC",
    "price": 349.99,
    "gender": "men", 
    "sku": "M4010620A_8UL",
    "discountPercentage": 0,
    "stockQuantity": 245,
    "sizeInventory": {
      "XS": 25,
      "S": 49,
      "M": 73,
      "L": 61,
      "XL": 37,
      "OSFA": 0
    },
    "brand": "65a7e20102e12c44f59943e1",
    "category": "65a7e24602e12c44f5994431",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/superdry_Hawian_SS_Shirt_m4010620a_8ul_apparelcheshire_large.jpg",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/superdry_Hawian_SS_Shirt_m4010620a_8ul_apparelcheshire_large.jpg"
    ],
    "isDeleted": false,
    "updatedAt": "2024-04-22T09:22:57.840Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a4f",
    "title": "Palarie Bucket Newera Iridescent Bucket Tothot Blk",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Poliester",
    "price": 229.99,
    "gender": "women", 
    "sku": "60595819",
    "discountPercentage": 0,
    "stockQuantity": 842,
    "sizeInventory": {
      "XS": 0,
      "S": 281,
      "M": 281,
      "L": 280,
      "XL": 0
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f5994435",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595819_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595819_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a50",
    "title": "Sapca Newera Iridescent Ef Trucker Tothot Blk",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Poliester",
    "price": 199.99,
    "gender": "women", 
    "sku": "60595821",
    "discountPercentage": 0,
    "stockQuantity": 517,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 517
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595821_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595821_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a51",
    "title": "Short Newera Nba Panel Short Chibul Blk",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Bumbac",
    "price": 279.99,
    "gender": "men", 
    "sku": "60596242",
    "discountPercentage": 0,
    "stockQuantity": 266,
    "sizeInventory": {
      "XS": 67,
      "S": 0,
      "M": 67,
      "L": 66,
      "XL": 66
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442f",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60596242_7_large.jpg",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60596242_7_large.jpg"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a52",
    "title": "Short Newera Nba Panel Short Loslak Trp",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Bumbac",
    "price": 279.99,
    "gender": "men", 
    "sku": "60596244",
    "discountPercentage": 0,
    "stockQuantity": 1478,
    "sizeInventory": {
      "XS": 296,
      "S": 296,
      "M": 296,
      "L": 295,
      "XL": 295
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442f",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60596244_7_large.jpg",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60596244_7_large.jpg"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a53",
    "title": "Tricou Newera Nba Panel Os Tee Loslak Trp",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 95% Bumbac 5% Elastan",
    "price": 189.99,
    "gender": "men", 
    "sku": "60596252",
    "discountPercentage": 0,
    "stockQuantity": 595,
    "sizeInventory": {
      "XS": 199,
      "S": 198,
      "M": 198,
      "L": 0,
      "XL": 0
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f5994431",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60596252_large.jpg",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60596252_large.jpg"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a54",
    "title": "Tricou Newera Nba Panel Os Tee Chibul Blk",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 95% Bumbac 5% Elastan",
    "price": 189.99,
    "gender": "men", 
    "sku": "60596254",
    "discountPercentage": 0,
    "stockQuantity": 1132,
    "sizeInventory": {
      "XS": 0,
      "S": 283,
      "M": 283,
      "L": 283,
      "XL": 283
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f5994431",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60596254_large.jpg",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60596254_large.jpg"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a5c",
    "title": "Sapca Newera Contrast Visor 9Twenty Asroma Ivorst",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Bumbac",
    "price": 149.99,
    "gender": "men", 
    "sku": "60595539",
    "discountPercentage": 0,
    "stockQuantity": 1171,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 1171
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595539_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595539_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a5e",
    "title": "Sapca Newera Core 9Seventy Ss Asroma Blk",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 94% Poliester 6% Spandex",
    "price": 199.99,
    "gender": "women", 
    "sku": "60595547",
    "discountPercentage": 0,
    "stockQuantity": 108,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 108
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595547_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595547_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a5f",
    "title": "Sapca Newera Rubber Wolf 9Forty Asroma Agdblk",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Poliester",
    "price": 179.99,
    "gender": "men", 
    "sku": "60595550",
    "discountPercentage": 0,
    "stockQuantity": 936,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 936
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595550_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595550_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a60",
    "title": "Sapca Newera Rubber Wolf 39Thirty Asroma Hrdorg",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 94% Poliester 6% Spandex",
    "price": 199.99,
    "gender": "men", 
    "sku": "60595552",
    "discountPercentage": 0,
    "stockQuantity": 979,
    "sizeInventory": {
      "XS": 0,
      "S": 490,
      "M": 0,
      "L": 489,
      "XL": 0
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595552_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595552_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a61",
    "title": "Sapca Newera Seasonal Pop 9Forty Chelfc Blksfy",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Bumbac",
    "price": 149.99,
    "gender": "men", 
    "sku": "60595628",
    "discountPercentage": 0,
    "stockQuantity": 313,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 313
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595628_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595628_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a55",
    "title": "Sapca Newera Bronze Ef Trucker Manutd Grh",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Poliester",
    "price": 199.99,
    "gender": "men", 
    "sku": "60595684",
    "discountPercentage": 0,
    "stockQuantity": 1633,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 1633
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595684_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595684_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a56",
    "title": "Palarie Bucket Newera Bronze Bucket Manutd Grh",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Poliester",
    "price": 229.99,
    "gender": "men", 
    "sku": "60595690",
    "discountPercentage": 0,
    "stockQuantity": 615,
    "sizeInventory": {
      "XS": 0,
      "S": 205,
      "M": 205,
      "L": 205,
      "XL": 0
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f5994435",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595690_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595690_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a57",
    "title": "Sapca Newera Contrast Visor 9Twenty Nufc Ivodsa",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Bumbac",
    "price": 149.99,
    "gender": "women", 
    "sku": "60595727",
    "discountPercentage": 0,
    "stockQuantity": 1902,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 1902
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595727_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595727_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a58",
    "title": "Sapca Newera Home Field 9Forty Trucker Neyyan Blkblk",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Bumbac",
    "price": 199.99,
    "gender": "men", 
    "sku": "60579078",
    "discountPercentage": 0,
    "stockQuantity": 929,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 929
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60579078_3QL_large.jpg",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60579078_3QL_large.jpg"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a59",
    "title": "Sapca Newera M Logo 9Twenty Acmilan Ivoblk",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Bumbac",
    "price": 149.99,
    "gender": "women", 
    "sku": "60595503",
    "discountPercentage": 0,
    "stockQuantity": 556,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 556
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595503_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595503_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a5a",
    "title": "Sapca Newera Grafiti Aop Ef Trucker Acmilan Blk",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 100% Poliester",
    "price": 199.99,
    "gender": "women", 
    "sku": "60595509",
    "discountPercentage": 0,
    "stockQuantity": 1951,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 1951
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595509_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595509_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a5b",
    "title": "Sapca Newera Denim 9Forty Acmilan Dsa",
    "description": "Fondat in 1920, New Era s-a adaptat diverselor curente stilistice, devenind brandul de referinta pentru piesele tale streetwear, mai ales daca esti fanul unei echipe sportive. compozitie: 49% Bumbac 33% Poliester 17% Raion 1% Alte fibre",
    "price": 189.99,
    "gender": "women", 
    "sku": "60595512",
    "discountPercentage": 0,
    "stockQuantity": 340,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 340
    },
    "brand": "65a7e20102e12c44f59943da",
    "category": "65a7e24602e12c44f599442c",
    "thumbnail": "https://vgeneration.ro/cdn/shop/files/60595512_large.png",
    "images": [
      "https://vgeneration.ro/cdn/shop/files/60595512_large.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  },
  {
    "_id": "65b3f7a812e34c67d8921a70",
    "title": "Rucsac Vans x The Simpsons Check Eyes Multicolor",
    "description": "Fondat in 1966, VANS intruchipeaza spiritul tanar, fiind dedicat culturii skateboardingului. Fie ca practici sau nu acest sport, vei gasi colectii iconice ce vor deveni piese principale in outfiturile tale streetwear. compozitie: 100%POLIESTER",
    "price": 215.99,
    "gender": "women",
    "sku": "VN0A4V44ZZY1",
    "discountPercentage": 0,
    "stockQuantity": 5,
    "sizeInventory": {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
      "OSFA": 5
    },
    "brand": "65a7e20102e12c44f59943db",
    "category": "65a7e24602e12c44f5994433",
    "thumbnail": "https://static.thcdn.com/productimg/960/960/12653253-4354790178986145.jpg",
    "images": [
      "https://static.thcdn.com/productimg/960/960/12653253-4354790178986145.jpg",
      "https://vgeneration.ro/cdn/shop/products/rucsac-vans-x-the-simpsons-multicolor-vn0a4v44zzy1_large.png",
      "https://i.sportisimo.com/products/images/1116/1116803/700x700/vans-x-the-simpsons-check-eyes-bckpk_2.jpg",
      "https://i.ebayimg.com/images/g/SrsAAOSwGTRixFFg/s-l400.png"
    ],
    "isDeleted": false,
    "updatedAt": "2025-05-06T00:00:00.000Z"
  }
];


const addSizeInventory = (products) => {
  return products.map(product => {
    if (product.sizeInventory) return product;
    
    const isHatOrAccessoryOrBag = 
      product.category === "65a7e24602e12c44f599442c" || // cod - Sepci
      product.category === "65a7e24602e12c44f5994435" || // cod - Palarii
      product.category === "65a7e24602e12c44f5994433";   // cod - Rucsacuri

    if (isHatOrAccessoryOrBag) {
      return {
        ...product,
        sizeInventory: {
          "XS": 0,
          "S": 0,
          "M": 0,
          "L": 0,
          "XL": 0,
          "OSFA": product.stockQuantity // tot stocul sa fie stocat aici
        }
      };
    }
    else
    {
      return {
        ...product,
        sizeInventory: {
          "XS": 0,
          "S": 0,
          "M": 0,
          "L": 0,
          "XL": 0,
          "OSFA": 0 
        }
      };
    }
  });
};



exports.seedProduct = async () => {
  try {
    const productsWithSizes = addSizeInventory(products);
    await Product.insertMany(productsWithSizes);
    console.log("Populare baza de date terminata");
  } catch (error) {
    console.log(error);
  }
};