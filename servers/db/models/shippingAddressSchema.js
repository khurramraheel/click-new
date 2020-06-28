let mongoose = require("mongoose");
let shippingAddressSchema = mongoose.Schema({

    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },

   
});
let  ShippingAddressSchema= mongoose.model("shippingAddress", shippingAddressSchema);
module.exports = ShippingAddressSchema;