const Order = require('../models/Order');
const Product = require('../models/Product');

exports.create = async (req, res) => {
    try {
        // creare comanda
        const created = new Order(req.body);
        await created.save();
        
        // dupa ce a fost creata comanda, inventarul trebuie modificat pentru fiecare produs din bd
        for (const item of req.body.item) {
            const product = await Product.findById(item.product._id);
            
            if (!product) {
                console.log(`Product with ID ${item.product._id} not found`);
                continue;
            }
            
            // daca produsul are cantitatea dorita pentru marime, si este existenta, o sa se scada pentru marimea specifica din inventar
            if (product.sizeInventory && item.size && product.sizeInventory[item.size]) {
                // decrementarea din inventar
                product.sizeInventory[item.size] = Math.max(0, product.sizeInventory[item.size] - item.quantity);
                
                // se face update la stoc
                product.stockQuantity = Math.max(0, product.stockQuantity - item.quantity);
                
                await product.save();
            } else {
                // daca nu mai exista cantitate pentru marimea respectiva, doar se face update la cantitatea totala
                product.stockQuantity = Math.max(0, product.stockQuantity - item.quantity);
                await product.save();
            }
        }
        
        res.status(201).json(created);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while trying to create an order' });
    }
}

exports.getByUserId = async (req, res) => {
    try{
        const {id} = req.params;
        const results = await Order.find({user:id})
        res.status(200).json(results);
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error while trying to fetch orders!' });
    }
}

exports.getAll = async (req, res) => {
    try{
        let skip = 0
        let limit = 0

        if(req.query.page && req.query.limit){
            const pageSize = req.query.limit
            const page = req.query.page
            skip = pageSize * (page - 1)
            limit = pageSize
        }

        const totalDocs = await Order.find({}).countDocuments().exec()
        const results = await Order.find({}).skip(skip).limit(limit).exec()

        res.header("X-Total-Count", totalDocs);
        res.status(200).json(results);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Error while trying to fetch orders!' });
    }
};

exports.updateById = async (req, res) => {
    try {
        const {id} = req.params;
        const updated = await Order.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while trying to update an order!' });
    }
}