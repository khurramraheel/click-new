let mongoose = require("mongoose");
let productSchema = mongoose.Schema({
    title:String,  
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    file:{
        type:String,
        // required:true
    },
    category:{
        type:String,
    },
    SubCategory:{
        type:String,    
    },
    ChildCategory:{
        type:String
    }
   
});
let ProductSchema = mongoose.model("productsInfo", productSchema);
module.exports = ProductSchema;