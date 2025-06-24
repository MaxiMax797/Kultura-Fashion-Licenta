const  { Schema, default: mongoose} = require('mongoose')
const Product = require('../models/Product')
const Review = require('../models/Review') 

exports.create = async (req, res) => {
    try{
        const created = new Product(req.body);
        await created.save();
        res.status(201).json(created);
    } catch ( error)
    {
        console.log(error);
        return res.status(500).json({message: "Error while trying to add products to cart"});

    }
}

exports.getAll = async (req, res) => {
    try{
        const filter = {}
        const sort = {}
        let skip = 0
        let limit = 10 // limita implicita

        if(req.query.search) {
            // bara de cautare -> este case sensitive
            filter.title = { $regex: req.query.search, $options: 'i' };
        }

        // parsare filtru
        if(req.query.brand) {
            const brands = Array.isArray(req.query.brand) ? req.query.brand : req.query.brand.split(',');
            if (brands.length > 0) {
                filter.brand = {$in: brands};
            }
        }

        if(req.query.category) {
            const categories = Array.isArray(req.query.category) ? req.query.category : req.query.category.split(',');
             if (categories.length > 0) {
                filter.category = {$in: categories};
            }
        }

        if(req.query.gender) {
            const genders = Array.isArray(req.query.gender) ? req.query.gender : req.query.gender.split(',');
            if (genders.length > 0) {
                filter.gender = {$in: genders};
            }
        }

        if(req.query.user) {
            filter['isDeleted'] = false
        }

        // parsare paginare
        if(req.query.page && req.query.limit )
        {
            const pageSize = parseInt(req.query.limit); // limita trebuie sa fie un numar
            const page = parseInt(req.query.page);     // pagina trebuie sa fie un numar

            if (!isNaN(pageSize) && pageSize > 0) {
                limit = pageSize;
            }
            if (!isNaN(page) && page > 0) {
                skip = limit * (page - 1);
            }
        }

        // Logica sortare
        const sortBy = req.query.sort;
        const sortOrder = req.query.order === 'desc' ? -1 : 1;

        const totalDocs = await Product.countDocuments(filter).exec();
        res.set("X-Total-Count", totalDocs);

        // Logica sortare in functie de rating
        if (sortBy === 'rating') {
            console.log("Sorting by rating, order:", sortOrder);
            // 1. Fetch la toate produsele ce se potrivesc pe filtru (fara paginare inca)
            const allProducts = await Product.find(filter)
                .populate('brand')
                .populate('category')
                .lean(); // pentru performanta

            // 2. Calcul medie rating
            const productsWithRatings = await Promise.all(allProducts.map(async (product) => {
                const reviews = await Review.find({ product: product._id });
                const avgRating = reviews.length > 0
                    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
                    : 0; // daca nu sunt review-uri, ele vor avea 0 by default

                return {
                    ...product,
                    avgRating
                };
            }));

            // 3. Sortare produse in functie de media rating-ului
            productsWithRatings.sort((a, b) => (a.avgRating - b.avgRating) * sortOrder);

            // 4. Aplicare paginare pentru Array-ul sortat
            const paginatedResults = productsWithRatings.slice(skip, skip + limit);

            console.log(`Returning ${paginatedResults.length} products sorted by rating.`);
            res.status(200).json(paginatedResults);

        } else {
             // Sortare standard (in functie de pret)
            if (sortBy) {
                sort[sortBy] = sortOrder;
                console.log("Aplicare sortare standard:", sort);
            } else {
                 console.log("No specific sort applied, using default order.");
            }

            const results = await Product.find(filter)
                .populate('brand')
                .populate('category')
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .exec();

            console.log(`Returning ${results.length} products with standard sort/filter.`);
            res.status(200).json(results);
        }

    } catch(error) {
        console.error("Error in getAll:", error); // TODO: pentru debugging
        res.status(500).json({message: "Error fetching products: " + error.message});
    }
};



exports.getById = async (req, res) => {
    try{
        const {id} = req.params;
        const result = await Product.findById(id).populate("brand").populate("category");
        res.status(200).json(result);
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "Error while trying to fetch items from the cart"});
    }
}

exports.updateById = async (req, res) => {
    try{
        const {id}=req.params
        const updated = await Product.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updated)
    }catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Error while trying to update the items from the cart"});
    }
}

exports.undeleteById = async (req, res) => {
    try{
        const {id}=req.params
        const unDeleted = await Product.findByIdAndUpdate(id,{isDeleted:false},{new:true}).populate("brand")
        res.status(200).json(unDeleted)
    }catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Error while trying to restore the items from the cart"});
    }
}

exports.deleteById = async (req, res) => {
    try {
        const {id}=req.params
        const deleted = await Product.findByIdAndUpdate(id,{isDeleted:true},{new:true}).populate("brand")
        res.status(200).json(deleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while trying to delete the items from the cart"});
    }
}   