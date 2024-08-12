
import React, { useContext } from "react";
import { Container, Navbar ,Nav} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import UserContext from "./providers/UserContext";




const NavBar = () => {
    const history = useHistory(); 
    const Ctx = useContext(UserContext)
    const logoutHandler = () => {
        Ctx.logout()
        history.push('/login')
    }
    return(
        <>
            <Navbar bg='dark' expand='lg' variant='dark'>
                <Container>
                    
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="d-flex justify-content-between">
                                <Navbar.Brand className="fst-italic fw-bolder">UserRegistration</Navbar.Brand>    
                                </Nav>
                        </Navbar.Collapse>
                        {Ctx.isLoggedIn && <div className="d-flex align-items-center gap-3">
                            
                            <Nav.Link onClick={logoutHandler} className="text-danger me-5 cursor-pointer"><span><TbLogout /></span>   Logout</Nav.Link>
                        </div>}
                </Container>
            </Navbar>
        </>
    )
};

export default NavBar;