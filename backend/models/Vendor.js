const mongoose = require("mongoose");
const { Schema } = mongoose;
const VendorSchema = new Schema({
    brandname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    earnings:{
        type:Number,
        default:0
    }
});

const Vendor = mongoose.model("vendor_mssstore", VendorSchema);
module.exports = Vendor;