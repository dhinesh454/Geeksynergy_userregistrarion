const userRoutes = require('./routes/routes')





const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require('cors');




//middlewares
app.use(cors());
app.use(bodyParser.json());


app.use('/api',userRoutes);


var port = process.env.PORT
mongoose.connect(process.env.MONGODB_URL)
.then((res)=>{
    app.listen(port)
    console.log(`MongoDB connected!!...port ${port}`)
    }).catch(err=>{
        console.log(err)
    });
    
