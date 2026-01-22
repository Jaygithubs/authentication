const dishModel = require('../models/dish');

const addDish = async (req,res) => {
    try
    {
        let dish=req.body;
        let newDish=new dishModel(dish);
        await newDish.save();
        res.status(200).json({
            success:true,
            message:'Dish added successfullly'
        });
    }
    catch(error)
    {
        console.log('Add dish failed',error.message);
        res.status(500).json({
            success:false,
            message:'Failed to add dish'
        });
    }

}

const Dishes = async (req,res) =>{
    try
    {
        const dishes=await dishModel.find();
        res.json(dishes);
    }
    catch(error)
    {
        console.error("Failed to fetch dishes", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch dishes"
        });
    }
}

const updateDish = async (req,res) => {

    try
    {
        const { id }=req.params;
        const updatedDish=await dishModel.findByIdAndUpdate(
            id,
            req.body,
            {new:true, runValidators:true}
        );

        if(!updatedDish)
        {
            return res.status(404).json({
                success:false,
                message:'Dish not found'
            });
        }
        
        return res.status(200).json({
            success:true,
            message:'Dish updated successfully'
        });

    }
    catch(error)
    {
        console.log("Failed to update dish"+error);
        return res.status(500).json({
            success:false,
            message:'Failed to update dish'
        });
    }
}

const deleteDish = async (req,res) => {
    try
    {
        const { id }= req.params;
        const deletedDish=await dishModel.findByIdAndDelete(id);
        
        if(!deletedDish)
        {
            return res.status(404).json({
                success:false,
                message:'Dish not found'
            })
        }

        return res.status(200).json({
            success:true,
            message:"Dish deleted successfully"
        })
    }
    catch(error)
    {
        console.log('Failed to delete dish'+error);
        res.status(500).json({
            success:false,
            message:'Failed to delete dish'
        });
    }

}

module.exports={addDish,Dishes,updateDish,deleteDish}