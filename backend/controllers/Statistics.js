const Order = require('../models/Order');
const User = require('../models/User');

function getReferenceDate() {
    return new Date();
}

exports.getStatistics = async (req, res) => {
    try {
        const referenceDate = new Date();
        const oneHundredEightyDaysAgo = new Date(referenceDate);
        oneHundredEightyDaysAgo.setDate(oneHundredEightyDaysAgo.getDate() - 180);


        const orderCount = await Order.countDocuments();
        console.log("Total orders in database:", orderCount);

        const orderSample = await Order.findOne();
        console.log("Sample order:", JSON.stringify(orderSample, null, 2));

        const userCount = await User.countDocuments();
        console.log("Total users in database:", userCount);


        // 1. Cel mai vandut produs din ultimele 180 de zile
        const mostBoughtProduct = await Order.aggregate([
            
            { $match: { 
                createdAt: { $gte: oneHundredEightyDaysAgo, $lte: referenceDate },
                // numai comenzile complete si platite
                $or: [
                    { status: 'Delivered' },
                    { status: 'Dispatched' },
                    { status: 'Out for delivery' }
                ] 
            }},
            
            { $unwind: '$item' },
            // grupare dupa ID produs si numar
            { $group: {
                _id: '$item.product._id',
                count: { $sum: '$item.quantity' },
                productData: { $first: '$item.product' }
            }},
            // Sortare descrescatoare
            { $sort: { count: -1 } },
            // Produsul din capul listei
            { $limit: 1 },
            // Format-ul output-ului
            { $project: {
                _id: 0,
                productId: '$_id',
                title: '$productData.title',
                thumbnail: '$productData.thumbnail',
                price: '$productData.price',
                salesCount: '$count'
            }}
        ]);


        // 2. Cosul mediu de cumparaturi
        const avgOrderValue = await Order.aggregate([
            // numai comenzile finalizate vor fi incluse
            { $match: { 
                $or: [
                    { status: 'Delivered' },
                    { status: 'Dispatched' },
                    { status: 'Out for delivery' }
                ],
                paymentMode: { $ne: null } // dintre care numai comenzile ce au fost platite
            }},
            // Calcul medie
            { $group: {
                _id: null,
                averageTotal: { $avg: '$total' }
            }},
            { $project: {
                _id: 0,
                averageTotal: { $round: ['$averageTotal', 2] }
            }}
        ]);


        // 3. Utilizatorul cu cele mai multe comenzi efectuate
        const topCustomer = await Order.aggregate([
            // grupare dupa utilizator
            { $group: {
                _id: '$user',
                orderCount: { $sum: 1 }
            }},
            // Sortare descrescatoare
            { $sort: { orderCount: -1 } },
            // primul din capul listei
            { $limit: 1 },
            // Join cu alta colectie
            { $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'userDetails'
                }},
            { $unwind: '$userDetails' },
            // Formatul output-ului
            { $project: { 
                _id: 0,
                userId: '$_id',
                name: '$userDetails.name',
                email: '$userDetails.email',
                orderCount: 1
            }}
        ]);
        console.log("Raw topCustomer result:", JSON.stringify(topCustomer, null, 2));
        console.log("--- End Statistics Service Debug ---");
        
        res.status(200).json({
            mostBoughtProduct: mostBoughtProduct[0] || null,
            averageOrderValue: avgOrderValue[0]?.averageTotal || 0,
            topCustomer: topCustomer[0] || null
        });
    } catch (error) {
        console.error('Error getting statistics:', error);
        res.status(500).json({ message: 'Error retrieving statistics data' });
    }
};

exports.getOrderStatsByDate = async (req, res) => {
    try {
        const { period } = req.query; // 'week', 'month', sau 'year'
        const referenceDate = new Date();


        let startDate;
        let groupBy;
        
        // Calcul datei initiale pe baza perioadei
        if (period === 'week') {
            startDate = new Date(referenceDate);
            startDate.setDate(startDate.getDate() - 7);
            groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        } else if (period === 'month') {
            startDate = new Date(referenceDate);
            startDate.setMonth(startDate.getMonth() - 1);
            groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        } else {
            // daca nu este pentru saptamana si nici pentru luna, ramane numai anul
            startDate = new Date(referenceDate);
            startDate.setFullYear(startDate.getFullYear() - 1);
            groupBy = { $dateToString: { format: "%Y-%m", date: "$createdAt" } }; // grupare dupa luna pentru anul vizualizat
        }
        
        // Query pentru comenzile din intervalul de timp si care nu au status-ul cancelled fie pending
        const orderStats = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: referenceDate },
                    status: { 
                        $nin: ['Cancelled', 'Pending'] 
                    }
                }
            },
            {
                $group: {
                    _id: groupBy,
                    count: { $sum: 1 },
                    totalAmount: { $sum: "$total" }
                }
            },
            {
                $sort: { _id: 1 } // sortare dupa data ascendenta
            }
        ]);
        
        res.status(200).json(orderStats);
    } catch (error) {
        console.error('Error getting order statistics by date:', error);
        res.status(500).json({ message: 'Error retrieving order statistics data' });
    }
};

// grafic piechart
exports.getCategoryStatsByDate = async (req, res) => {
    try {
        const { period } = req.query; // 'week', 'month' sau 'year'

        const referenceDate = getReferenceDate();
        

        let startDate;
        
        // Calcul datei initiale pe baza perioadei
        if (period === 'week') {
            startDate = new Date(referenceDate);
            startDate.setDate(startDate.getDate() - 7);
        } else if (period === 'month') {
            startDate = new Date(referenceDate);
            startDate.setMonth(startDate.getMonth() - 1);
        } else {
            // daca nu este pentru saptamana si nici pentru luna, ramane numai anul
            startDate = new Date(referenceDate);
            startDate.setFullYear(startDate.getFullYear() - 1);
        }
        
        // Query pentru comenzile din intervalul de timp si care nu au status-ul cancelled fie pending
        const categoryStats = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: referenceDate },
                    status: { 
                        $nin: ['Cancelled', 'Pending'] 
                    }
                }
            },
            
            { $unwind: '$item' },
            // grupare dupa categorie
            { 
                $group: {
                    _id: '$item.product.category',
                    count: { $sum: '$item.quantity' },
                    totalAmount: { $sum: { $multiply: ['$item.quantity', '$item.product.price'] } }
                }
            },
            // loopup duca nume categorie
            {
                $lookup: {
                    from: 'categories',
                    let: { categoryId: { $toObjectId: "$_id" } }, // Conversie string ID la ObjectId
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", "$$categoryId"] } } }
                    ],
                    as: 'categoryDetails'
                }
            },
            
            { 
                $unwind: {
                    path: '$categoryDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            // formatul output-ului
            {
                $project: {
                    _id: 1,
                    categoryName: {
                        $switch: {
                            branches: [
                                { case: { $eq: ["$_id", "65a7e24602e12c44f599442c"] }, then: "Sepci" },
                                { case: { $eq: ["$_id", "65a7e24602e12c44f599442d"] }, then: "Tenisi" },
                                { case: { $eq: ["$_id", "65a7e24602e12c44f599442e"] }, then: "Ochelari de soare" },
                                { case: { $eq: ["$_id", "65a7e24602e12c44f599442f"] }, then: "Pantaloni" },
                                { case: { $eq: ["$_id", "65a7e24602e12c44f5994430"] }, then: "Hanorace" },
                                { case: { $eq: ["$_id", "65a7e24602e12c44f5994431"] }, then: "Camasi" },
                                { case: { $eq: ["$_id", "65a7e24602e12c44f5994432"] }, then: "Cizme" },
                                { case: { $eq: ["$_id", "65a7e24602e12c44f5994433"] }, then: "Rucsacuri" },
                                { case: { $eq: ["$_id", "65a7e24602e12c44f5994434"] }, then: "Papuci" },
                                { case: { $eq: ["$_id", "65a7e24602e12c44f5994435"] }, then: "Palarii" }
                            ],
                            default: "Altele"
                        }
                    },
                    originalId: "$_id",
                    count: 1,
                    totalAmount: 1
                }
            },
            // Sort by count descending
            { $sort: { count: -1 } }
        ]);
        
        res.status(200).json({
            data: categoryStats,
            period: period
        });
    } catch (error) {
        console.error('Error getting category statistics by date:', error);
        res.status(500).json({ message: 'Error retrieving category statistics data' });
    }
};

