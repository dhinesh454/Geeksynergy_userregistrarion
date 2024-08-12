import { useCallback, useEffect, useReducer,useState } from "react"
import UserContext from "./UserContext";


const defaultUserState = {
    users:[]
}

const userReducer = (state,action) => {
    if(action.type === 'ADD_USERS'){
       
         console.log('state',state);
         console.log('action',action);
         var updatedUsers = state.users.concat(action.users)

            return{
                users:updatedUsers
              
            }   
    }


    if(action.type ==='EDIT_USER'){

        console.log(action.users)

        const existingUserIndex = state.users.findIndex(
            (user) => user.id === action.users._id
        );

        const updatedUser = {
            ...state.users[existingUserIndex],
            name: action.users.name,
            phoneno: action.users.phoneno,
            profession: action.users.profession
        };

        const updatedUsers = [...state.users];
        updatedUsers[existingUserIndex] = updatedUser;

        return {
            users: updatedUsers
        };
    }


    if (action.type === 'REMOVE_USER') {
        const updatedUsers = state.users.filter(
            (user) => user.id !== action.id
        );

        return {
            users: updatedUsers
        };
    }

    return defaultUserState;
}










const UserProvider = (props) => {
    const [userState,dispatchUserAction] = useReducer(
        userReducer,
        defaultUserState
    );

    const initialToken = localStorage.getItem('token')
    const [token , setToken] = useState(initialToken);
    const userLoggedIn = !!token; 

    ///fetchallUser
    const fetchallUsers = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:7000/api/users');
            if (!response.ok) {
                throw new Error('Fetching cart error, please check again');
            }
            const data = await response.json();
            const fetchedUsers = [];
            const users = data.users;
            console.log(users)
            console.log('------------------->',data)

            for (const key in users) {
                fetchedUsers.push({
                    id: users[key]._id,
                    name: users[key].name,
                    phoneno:users[key].phoneno,
                    profession:users[key].profession
                });
            }
            console.log(fetchedUsers)
            dispatchUserAction({ type: 'ADD_USERS', users: fetchedUsers });
        } catch (error) {
            console.log(error);
        }
    },[]);


    useEffect(()=>{
        if(userLoggedIn){
            fetchallUsers();
        }
    },[userLoggedIn,fetchallUsers]);


    const editUserHandler = (item) =>{
        dispatchUserAction({type:'EDIT_USER',users:item})
    }
  

    const removeUserHandler = (id) => {
        dispatchUserAction({type:'REMOVE_USER',id:id})
    }

    const loginHandler = (token)=>{
        setToken(token);
        localStorage.setItem('token',token)
  
      };
  
  
      const logoutHandler = () => {
        setToken(null);
        localStorage.clear();
      }

      const addUserHandler = (items) => {
        dispatchUserAction({type:'ADD_USERS',items:items})
      }

      const userContext = {
        users:userState.users,
        isLoggedIn:userLoggedIn,
        token:token,
        login:loginHandler,
        logout:logoutHandler,
        addUsers:addUserHandler,
        editUser:editUserHandler,
        removeUser:removeUserHandler,

      }


      return(
        <>
            <UserContext.Provider value={userContext}>
                {props.children}
            </UserContext.Provider>
        </>
      )
}


export default UserProvider;