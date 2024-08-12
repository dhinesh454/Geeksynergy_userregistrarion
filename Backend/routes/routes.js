const userController = require('../controllers/userController');


const express = require('express');
const routes = express.Router();


routes.post('/register',userController.addUserRegistration);
routes.post('/login',userController.loginUser)
routes.get('/users',userController.getUser);
routes.put('/update/:id',userController.updateUser);
routes.delete('/delete/:id',userController.deleteUser)



module.exports=routes





