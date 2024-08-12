import React, { useState, useContext } from "react";
import UserContext from "./providers/UserContext";
import UsersList from "./UsersList";
import EditUser from "./users/EditUser";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const Ctx = useContext(UserContext);
  const [editingUser, setEditingUser] = useState(null); // State to track the user being edited

  const users = Ctx.users;

  const cartItemRemoveHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`http://localhost:7000/api/delete/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(`${data.message}`)
         
        }
        
        else {
          console.log("User deleted successfully:", data);
          toast.success("User deleted successfully!");
        }
      } catch (error) {
        console.log("An error occurred:", error);
        toast.error(`${error}`);
      }

      Ctx.removeUser(id);
    }
  };

  const userEditHandler = (id) => {
    const user = users.find((u) => u.id === id);
    setEditingUser(user);
  };

  const saveEditHandler = (updatedUser) => {
    Ctx.editUser(updatedUser);// Update the user in the context
    toast.success("User updated Successfully!");
    setEditingUser(null); // Hide the edit form after saving
  };

  const cancelEditHandler = () => {
    setEditingUser(null); // Hide the edit form without saving
  };

  const registeredUsers = (
    <ul>
      {users.map((item) => (
        <UsersList
          key={item.id}
          id={item.id}
          name={item.name}
          phoneno={item.phoneno}
          profession={item.profession}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onEditUser={userEditHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <>
    <ToastContainer />
      <h1 className="text-danger text-center m-1 p-1 fst-italic fw-bold">
    {editingUser ? 'Edit The User details' :'Welcome to the UserPage'}
      </h1>
      {editingUser ? (
        <EditUser
          user={editingUser}
          onCancel={cancelEditHandler}
          onSave={saveEditHandler}
        />
      ) : (
        registeredUsers
      )}
    </>
  );
};

export default Home;
