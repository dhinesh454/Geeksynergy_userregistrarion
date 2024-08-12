import React from "react";



const UserContext = React.createContext({
    users:[],
    isLoggedIn:false,
    token:'',
    login:(token)=>{},
    logout:()=>{},
    editUser:()=>{},
    removeUser:()=>{},
});

export default UserContext;