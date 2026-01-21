const express=require('express');
const app=express();

app.get('/',(req,res) => {
    res.send("Hellow world");
})

app.listen(5000,() => {
    console.log(`Server is running on PORT: 5000`);
})