import mongoose from "mongoose";
import status from "../enums/status";
const timestamps = {
    timestamps: true,
    collection: 'cart'
}
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    status: { type: String, default: status.ACTIVE }
}, timestamps

)
module.exports = mongoose.model('cart', cartSchema);