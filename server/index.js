const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const app=express();
const connectDB=require('./config/db');
const cors=require('cors');

app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN
}));
connectDB();

app.get('/',(req,res) => {
    res.send("Welcome to Jay's project");
})

app.use('/api',require('./routes/addDish'));

const PORT = process.env.PORT | 5000;
app.listen(PORT,() => {
    console.log(`Server is running on PORT: 5000`);
})