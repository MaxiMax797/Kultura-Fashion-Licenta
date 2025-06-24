const Wishlist = require("../models/Wishlist");

exports.create = async (req, res) => {
    try {
        const created = await new Wishlist(req.body).populate({path: "product", populate: ["brand"]});
        await created.save();
        res.status(201).json(created);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error while trying to add a product to wishlist!" });
    }
}

exports.getByUserId = async (req, res) => {
    try {

        const { id } = req.params;

        let skip = 0
        let limit = 0

        if(req.query.page && req.query.limit){
            const pageSize = req.query.limit
            const page = req.query.page

            skip = pageSize * (page - 1)
            limit = pageSize
        }

        const result = await Wishlist.find({ user: id }).skip(skip).limit(limit).populate({ path: "product", populate: ["brand"] });
        const totalResults = await Wishlist.find({ user: id }).countDocuments().exec()

        res.set("X-Total-Count",totalResults)

        res.status(200).json(result)

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "Error while trying to fetch wishlist!" });
    }
}

exports.updateById = async (req, res) => {
    try {
        const {id}  = req.params;
        const updated = await Wishlist.findByIdAndUpdate(id, req.body, {new: true}).populate("product");
        res.status(200).json(updated);

    } catch (error)
    {

        console.log(error);
        res.status(500).json({ message: "Error while trying to update wishlist!" });
    }
}

exports.deleteById = async (req, res) => {
    try{ 

        const {id}=req.params
        
        const deleted=await Wishlist.findByIdAndDelete(id)
        return res.status(200).json(deleted)
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: "Error while trying to delete a product from wishlist!" });
    }
}