const express=require('express');
const router=express.Router();
const dishModel=require('../models/dish');

router.post('/add-dish', async (req,res) => {
    try
    {
        let dish=req.body;
        let DishModel=new dishModel(dish);
        await DishModel.save();
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

})

router.get('/dishes', async (req,res) =>{
    try
    {
        const dishes=await dishModel.find();
        res.json(dishes);
    }
    catch(error)
    {
        console.log('Failed to fetch dishes'+error);
    }
})

router.patch('/update-dish/:id', async (req,res) => {

    try
    {
        const { id }=req.params;
        const updateDish=await dishModel.findByIdAndUpdate(id,req.body);

        if(!updateDish)
        {
            return res.status(404).json({
                success:false,
                message:'Failed to update dish'
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
})

router.delete('/delete-dish/:id', async (req,res) => {
    try
    {
        const { id }= req.params;
        const deleteDish=await dishModel.findByIdAndDelete(id);
        
        if(!deleteDish)
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

})

module.exports=router;