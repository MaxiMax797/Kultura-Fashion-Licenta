const Category = require('../models/Category')

exports.getAll = async (req, res) => {
    try {
        const result = await Category.find({})

        res.status(200).json(result)
    }catch(error)
    {
        console.log(error)
        res.status(500).json({error: 'Error at fetching categories'})
    }
}