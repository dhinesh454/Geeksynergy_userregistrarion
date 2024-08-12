
import { Button, Card } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
// import UserContext from "./providers/UserContext";
// import { useContext } from "react";


const UsersList = (props) => {
    // const Ctx = useContext(UserContext);

//   const editUserHandler = () => {
//     console.log(Ctx.users)
//   }
    

    return(

<Card style={{ width: '40rem' }} className="border border-warning rounded m-auto">
    <Card.Body className="d-flex justify-content-between flex-wrap align-items-center">
        <div>
            <p className="fw-bold fst-italic fs-5 text-primary m-0">{props.name}</p>
            <p className="fst-italic fs-6 text-secondary m-0">{props.profession}</p>
        </div>
        <div>
            <p className="fs-6 m-0">Contact: {props.phoneno}</p>
        </div>
    </Card.Body>
    <Card.Footer className="d-flex justify-content-end p-2">
        <Button variant="outline-primary" className="m-1 p-1" onClick={props.onEditUser}>
            <MdModeEdit />
        </Button>
        <Button variant="outline-danger" className="m-1 p-1" onClick={props.onRemove}>
            <AiFillDelete />
        </Button>
    </Card.Footer>
</Card>

            
       
    )
};


export default UsersList;