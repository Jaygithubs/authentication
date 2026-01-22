const express=require('express');
const router=express.Router();
const { addDish,Dishes,updateDish,deleteDish } = require('../controller/DishController');
 
router.post('/add-dish', addDish);

router.get('/dishes', Dishes);

router.patch('/update-dish/:id', updateDish );

router.delete('/delete-dish/:id', deleteDish);

module.exports=router;