const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
    productCode: { type: String },
    productTitle: { type: String },
    productShortDescription: { type: String },
    productDescription: { type: String },
    productRate: { type: Number },
    productImage: { type: File },
    productGallery: { type: File },
})

module.exports = model.mongoose('Product', productSchema)