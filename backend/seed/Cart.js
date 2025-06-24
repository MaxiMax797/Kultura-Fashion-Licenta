const Cart = require("../models/Cart");
const mongoose = require('mongoose');

const cartItems = [
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994451",
    "quantity": 3,
    "size": "M"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994451",
    "quantity": 1,
    "size": "S"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65c2526fdcd9253acfbaa731", 
    "product": "65a7e45902e12c44f5994451",
    "quantity": 2,
    "size": "L"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599445d",
    "quantity": 1,
    "size": "M"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599445d",
    "quantity": 3,
    "size": "XL"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994457",
    "quantity": 2,
    "size": "S"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994460",
    "quantity": 5,
    "size": "XL"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f599445a",
    "quantity": 1,
    "size": "M"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994454",
    "quantity": 4,
    "size": "L"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65c2526fdcd9253acfbaa731",
    "product": "65a7e45902e12c44f5994462",
    "quantity": 2,
    "size": "M"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb95",
    "product": "65a7e45902e12c44f599444f",
    "quantity": 2,
    "size": "S"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb95",
    "product": "65a7e45902e12c44f599444f",
    "quantity": 1,
    "size": "M"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb95",
    "product": "65a7e45902e12c44f599444f",
    "quantity": 3,
    "size": "L"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb95",
    "product": "65a7e45902e12c44f5994457",
    "quantity": 1,
    "size": "XL"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb96",
    "product": "65a7e45902e12c44f5994450",
    "quantity": 2,
    "size": "M"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb96",
    "product": "65a7e45902e12c44f5994450",
    "quantity": 1,
    "size": "L"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb96",
    "product": "65a7e45902e12c44f599444f",
    "quantity": 2,
    "size": "XS"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb96",
    "product": "65a7e45902e12c44f599444f",
    "quantity": 1,
    "size": "XL"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb97",
    "product": "65a7e45902e12c44f599444f",
    "quantity": 1,
    "size": "XS"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb97",
    "product": "65a7e45902e12c44f599444f",
    "quantity": 1,
    "size": "S"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb97",
    "product": "65a7e45902e12c44f5994451",
    "quantity": 3,
    "size": "S"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb97", 
    "product": "65a7e45902e12c44f5994450",
    "quantity": 2,
    "size": "M"
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb97",
    "product": "65a7e45902e12c44f5994450",
    "quantity": 1,
    "size": "L" 
  },
  {
    "_id": new mongoose.Types.ObjectId(),
    "user": "65b8e564ea5ce114184ccb97",
    "product": "65a7e45902e12c44f5994454",
    "quantity": 1,
    "size": "L"
  }
];

exports.seedCart = async () => {
  try {
    await Cart.insertMany(cartItems);
    console.log("Cart seeded successfully");
  } catch (error) {
    console.log(error);
  }
};