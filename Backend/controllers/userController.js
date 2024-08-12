const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const userservices = require('../services/userServices')




/////string validation use this for post methods in controller
const isstringinvalid=(string)=>
    {
       if(string==undefined ||string.length===0) {
          return true;
       }
       else {
          return false;
       }
    
    }


const addUserRegistration = async (req,res) => {
    const {name,email,password,phoneno,profession} = req.body;

    try {

        if(isstringinvalid(name.trim())||isstringinvalid(email.trim())||isstringinvalid(password.trim())||isstringinvalid(phoneno.toString().trim())||isstringinvalid(profession.trim())){
           return res.status(400).json({message:'Something missing in the request !..try Again',success:false})
        }
      
        //checking user already exists
        const user = await User.findOne({email})
        if(user){
            return res.status(401).json({message:'User already exists',success:false})
        }



        //password hashing and save the user details 
        bcrypt.hash(password,10,async (err,hash)=>{
            if(err){
                return res.status(500).json({message:'Password hashing error check and try again',success:false})
            };

           

            await User.create({name,password:hash,email,phoneno,profession});
            return res.status(201).json({message:'User Registered Successfully',success:true})
        })



    } catch (error) {
        res.status(500).json({ error: 'Failed to register user',error:error.message })
    }
};



//loginUser

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (isstringinvalid(email) || isstringinvalid(password)) {
            return res.status(400).json({ message: "Email or Password is missing", success: false });
        }

        const loginUser = await User.findOne({ email: email });
        
        if (!loginUser) {
            return res.status(404).json({ message: "User not found! Please register.", success: false });
        }

        console.log(loginUser, loginUser.email, loginUser.password);

        bcrypt.compare(password, loginUser.password, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: "Something went wrong" });
            }

            if (result === true) {
                return res.status(202).json({
                    success: true,
                    message: "Successfully logged in",
                    token: userservices.generateAccessToken(loginUser._id, loginUser.name)
                });
            } else {
                return res.status(400).json({ success: false, message: "Password incorrect" });
            }
        });

    } catch (error) {
        res.status(500).json({ error, success: false });
        console.log(JSON.stringify(error));
    }
};




//Get all users

const getUser = async (req,res) => {
    try {
        const user = await User.find();
        if(!user){
            return res.status(400).json({message:'No user found check again',success:false})
        }


        res.status(200).json({users:user,success:true})
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user',error:error.message })
    }
}


//update user

const updateUser = async(req, res) => {
    const { id } = req.params;
    const { name,phoneno, profession } = req.body;

    try {
       
        if(isstringinvalid(name.trim())|| isstringinvalid(phoneno.toString().trim())||isstringinvalid(profession.trim())){
            return res.status(400).json({message:'Something missing in the request !..try Again',success:false});
        }

        // Check if ID is provided and valid
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID provided', success: false });
        }

        const updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            {name,phoneno,profession},
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(400).json({ message: 'User not found', success: false });
        }
        res.status(200).json({ updatedUser, success: true });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};




//delete user

const deleteUser = async(req,res) => {
    const {id} = req.params;

    try {
        // Check if ID is provided and valid
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID provided', success: false });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        res.status(202).json({message:'Successfully deleted',success:true}).end();

    } catch (error) {
        res.status(500).json({ error: 'Failed to Delete user..check again and Try',error:error.message })
    }
};




module.exports={addUserRegistration,loginUser,getUser,deleteUser,updateUser}


