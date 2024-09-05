require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
require("./db/conn");
const router = require("./routes/router.js");
const port = process.env.PORT|| 8008;


//app.get("/",(req,res)=>{
//         res.status(201).json("server created");
//})
app.use(express.json());
app.use(cors());
app.use(router);


app.listen(port,()=>{
    console.log(`server running at port : ${port}`);
})