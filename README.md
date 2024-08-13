# User Registration and Management


***Registration***

New users must register to create an account. This process involves providing necessary details such as email, password, and any other required information.

***Login***: 

Registered users can log in using their credentials. If a user is not registered, they must first complete the registration process before logging in.

***Post-Login Features***

 Upon successful login, users are redirected to the Home page, where the following features are available:

- View All Users: The Home page displays a list of all registered users. This list is fetched from the backend server upon login.

- Edit User Information: Users have the ability to edit their own information or the information of other users, depending on the access level provided. This feature allows for updating user details.

- Delete Users: Users can also delete their own accounts or other users' accounts if authorized. Deleting a user will remove their information from the system.



### Setup and Installation Guide
To run this project successfully, you'll need to set up both the frontend and backend environments. Below are the detailed steps:

### 1. Install Dependencies

### For the Frontend:
Navigate to the frontend directory and install the required packages:

```
cd frontend
npm install

```


### For the Backend:
Similarly, navigate to the backend directory and install the necessary packages:

```
cd Backend
npm install

```


### 2.Environment Configuration
This project requires certain environment variables to be set up for proper operation, including the MongoDB connection string.

- Replace  with your actual MongoDB credentials and database name.
- Ensure the .env file is correctly configured as it contains sensitive information like the database connection string and secret keys.


***Note: The .env file is included in the project repository for assessment purposes. However, in a real-world scenario, this file should remain private and not be included in version control.***

### 3. Starting the Development Servers
Once the dependencies are installed and the environment variables are set, you can start both the backend server and frontend client:

*For the Backend*:
Navigate to the backend directory and start the server:

``` 
cd Backend
npm start 
```

This will initiate the backend server and establish a connection to the MongoDB database.

*For the Frontend*:
Navigate to the frontend directory and start the client:

``` 
cd Backend
npm start 
```
This will start the frontend development server.


### 4. Accessing the Application
- The frontend client is typically accessible via http://localhost:3000.
- The backend server is typically accessible via http://localhost:7000 or the port specified in .env file.
