const mongoose = require("mongoose");
const { Schema } = mongoose;
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true
    },
    vendor: {
        type:mongoose.Schema.Types.ObjectId, 
        required: true
    },
    photoUrl: {
        type: String,
        required: false
    }
});

const Item = mongoose.model("item", ItemSchema);
module.exports = Item;