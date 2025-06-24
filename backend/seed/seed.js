const {seedBrand}=require("./Brand")
const {seedCategory}=require("./Category")
const {seedProduct}=require("./Product")
const {seedUser}=require("./User")
const {seedAddress}=require("./Address")
const {seedWishlist}=require("./Wishlist")
const {seedCart}=require("./Cart")
const {seedReview}=require("./Review")
const {seedOrder}=require("./Order")
const {connectToDB}=require("../database/db")


const clearCollections = async () => {
    const collections = ["brands", "categories", "products", "users", "addresses", "wishlists", "carts", "reviews", "orders"];
    for (let coll of collections) {
        await require("mongoose").connection.collection(coll).deleteMany({});
        console.log(`Cleared collection: ${coll}`);
    }
};

const seedData=async()=>{
    try {
        await connectToDB()
        console.log('Seed has started. Please wait');
        await clearCollections()
        await seedBrand()
        await seedCategory()
        await seedProduct()
        await seedUser()
        await seedAddress()
        await seedWishlist()
        await seedCart()
        await seedReview()
        await seedOrder()

        console.log('Seed has ended');

        await require("mongoose").connection.close();
        console.log('No errors occurred. The database connection has succesfully been closed.');
        process.exit(0);
    } catch (error) {
        console.log("Seed error: ", error);

        await require("mongoose").connection.close();
        process.exit(1);
    }
}

seedData()