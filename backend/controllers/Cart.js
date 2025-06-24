const Cart = require ('../models/Cart')

exports.create = async (req, res) => {
    try{ 
        console.log("Cart add request body:", req.body);
        console.log("Size provided:", req.body.size);
        
        const created = new Cart(req.body);
        await created.save();
        const populatedItem = await Cart.findById(created._id).populate({
            path: "product",
            populate: {path: "brand"}
        });
        res.status(201).json(populatedItem);
    } catch (error) {
        console.log("Cart creation error:", error.message);
        if (error.name === 'ValidationError') {
            return res.status(400).json({message: "Validation error: " + error.message});
        }
        return res.status(500).json({message: "Error while trying to add products to cart"});
    }
}

exports.getByUserId = async (req, res) => {
    
    try{
        const {id} = req.params;
        const result = await Cart.find({user: id}).populate({path:"product",populate:{path:"brand"}});
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Error while trying to fetch items from the cart"});
    }
}

exports.updateById = async (req, res) => {
    try{
        const {id}=req.params
        
        const updated=await Cart.findByIdAndUpdate(id,req.body,{new:true}).populate({path:"product",populate:{path:"brand"}});
        res.status(200).json(updated)

    }catch(error) {
        console.log(error);
        return res.status(500).json({message: "Error while trying to update the items from the cart"});
    }
}

exports.deleteById = async (req, res) => {
    try {
        const {id}=req.params
        const deleted=await Cart.findByIdAndDelete(id)
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error while trying to delete the items from the cart"});
    }
}

exports.deleteByUserId = async (req, res) => {
    try {
        const {id}=req.params
        await Cart.deleteMany({user:id})
        res.sendStatus(204)

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while trying to reset the cart"});
    }
}