import React, { useRef } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link ,useHistory} from "react-router-dom";
import classes from './UserRegistration.module.css'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const UserRegisteration = () => {
    const history = useHistory()

    const emailidRef = useRef();
    const passwordRef = useRef();
    const nameRef =useRef();
    const phonenoRef = useRef();
    const professionRef = useRef();

    const registrationHandler = async(event) => {
        event.preventDefault();
        const email = emailidRef.current.value;
        const password = passwordRef.current.value;
        const name = nameRef.current.value;
        const phoneno = phonenoRef.current.value;
        const profession = professionRef.current.value;
        
        try {
            const response = await fetch('http://localhost:7000/api/register',{
                method:'POST',
                body:JSON.stringify({
                    name,
                    email,
                    password,
                    phoneno,
                    profession
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`${data.message}`);
            } else {
                toast.success('Successfully Registered!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

               
                setTimeout(() => {
                    history.push('/login');
                }, 3000);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Registration failed: ${error.message}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return(
    <div className={`${classes.background} d-flex justify-content-center align-item-center`}>  
         <ToastContainer />  
        <Card style={{width:'30rem'}} className="m-2 p-3">
            <Form onSubmit={registrationHandler}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="fw-bold fst-italic ">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your email" ref={nameRef} required/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="fw-bold fst-italic ">Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your password" ref={emailidRef} required/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="fw-bold fst-italic ">Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" ref={passwordRef} minLength={6} required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="fw-bold fst-italic ">PhoneNo</Form.Label>
                        <Form.Control type="number" placeholder="Enter your phoneno" ref={phonenoRef} minLength={10} required/>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label className="fw-bold fst-italic ">Profession</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Profession" ref={professionRef} minLength={6} required/>
                    </Form.Group>
                </Row>

               

                 <div className="d-flex text-center justify-content-center">
                    <Button  type="submit" >Register</Button>
                 </div>  


            </Form>
            <div className={classes.toogle}>
            <Link className="text-decoration-none text-success" to="/login">Already Registered?click here..</Link>
            </div>
        </Card>

</div>
       
    
    )
};


export default UserRegisteration