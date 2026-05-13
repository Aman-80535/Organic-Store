const mongoose = require("mongoose")
const { products } = require("./data")

const Product = require("./models/productModel")

mongoose.connect(`mongodb://127.0.0.1:27017/organic-store`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
}).then(() => {
    console.log("connectdb")
})



const seedProduct = async () => {
    try {
        await Product.deleteMany()
       const res =  await Product.insertMany(products)
       console.log(res)
    } catch (error) {
        console.log(error)
    }
}

seedProduct()

