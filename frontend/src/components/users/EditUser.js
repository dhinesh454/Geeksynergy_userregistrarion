import React, { useState } from "react";
import { Form,Col,Row,Card,Button } from "react-bootstrap";



const EditUser = ({ user, onCancel, onSave }) => {
 
  const [name, setName] = useState(user.name);
  const [phoneno, setPhoneNo] = useState(user.phoneno);
  const [profession, setProfession] = useState(user.profession);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:7000/api/update/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phoneno, profession }),
      });

      const data = await response.json();


      if (!response.ok) {
        throw new Error(`${data.message}`)
      } else {
        console.log("User updated successfully:", data.updatedUser);
        onSave(data.updatedUser); // Update the user context
      }
    } catch (error) {
        console.log("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
    <Card style={{ width: '30rem' }} className="p-3">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className="fw-bold fst-italic">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className="fw-bold fst-italic">Phone No</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your phone number"
              value={phoneno}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label className="fw-bold fst-italic">Profession</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <div className="d-flex text-center justify-content-center">
          <Button type="submit">Save</Button>
          <Button variant="secondary" className="ms-2" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Card>
  </div>
);
  
};

export default EditUser;