import mongoose from "mongoose";
import status from "../enums/status";
const timestamps = {
    timestamps: true,
    collection: 'user'
}
const userSchema = new mongoose.Schema({
    fname: { type: String, trim: true },
    lname: { type: String, trim: true },
    email: { type: String, trim: true },
    mobile: { type: String },
    password: { type: String },
    status: { type: String, default: status.ACTIVE }
}, timestamps
)

module.exports = mongoose.model("user", userSchema);