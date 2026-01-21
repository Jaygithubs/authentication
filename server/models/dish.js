const mongoose=require('mongoose');

const dishSchema=new mongoose.Schema(
    {
        dish:{
            type:String,
            required:true
        }
    }
)
module.exports=mongoose.model('dish',dishSchema);