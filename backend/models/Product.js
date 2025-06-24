const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    gender:{
        type: String, 
        enum: ['men', 'women'],
        required: true
    },
    sku: {
        
        type: String,
        required: true,
        unique: true
    },
    price: { 
        type: Number, 
        required: true 
    },
    discountPercentage: { 
        type: Number 
    },
    stockQuantity: { 
        type: Number, 
        required: true 
    },
    sizeInventory: {
        XS: { type: Number, default: 0 },
        S: { type: Number, default: 0 },
        M: { type: Number, default: 0 },
        L: { type: Number, default: 0 },
        XL: { type: Number, default: 0 },
        OSFA: { type: Number, default: 0 }
    },
    brand: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Brand", 
        required: true 
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required: true 
    },
    thumbnail: { 
        type: String, 
        required: true 
    },
    images: { 
        type: [String], 
        required: true 
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    }
}, { timestamps: true });

// Calculare cantitate totala ca suma a cantitatilor pe marimi
ProductSchema.virtual('totalSizeQuantity').get(function() {
    return Object.values(this.sizeInventory).reduce((total, qty) => total + qty, 0);
});

module.exports = mongoose.model("Product", ProductSchema);