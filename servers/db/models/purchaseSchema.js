let mongoose = require("mongoose");
let purchaseSchema = mongoose.Schema({

    userid:{
        type:String,
        // required:true
    },
    products:{
        type:Array,
        // required:true
    },
    
});
let  PurchaseSchema= mongoose.model("purchase", purchaseSchema);
module.exports = PurchaseSchema;