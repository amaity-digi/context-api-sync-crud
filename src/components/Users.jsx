import React, { useRef, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useCustom } from '../hooks/CustomHooks';
import { Button, Container, Form, FormControl, FormGroup, FormLabel, Table } from 'react-bootstrap';
import UserProvider from '../provider/UserProvider';

const Users = () => {
    const { users, addUsers, deleteUser, updateUser } = useCustom(UserProvider);
    const [update, setUpdate] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const [currentId, setCurrentId] = useState("");
    const [currentName,setCurrentName] = useState("");
    const [currentAge,setCurrentAge] = useState("");

    let nameRef = useRef(null);
    let ageRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit", nameRef.current.value);
        console.log("User", users, nameRef, 'a', name, 'as', age);
        let user = {
            id: Date.now(),
            name,
            age
        }
        addUsers(user);
        nameRef.current.value = "";
        ageRef.current.value = "";
    }

    const handleEdit = (user) => {
        console.log("Edit");
        setUpdate(true);
        setCurrentId(user.id);
        setCurrentName(user.name);
        setCurrentAge(user.age);
        nameRef.current.value = user.name;
        ageRef.current.value = user.age;
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateUser(currentId, currentName, currentAge);
        setCurrentId(null);
        setCurrentAge(null);
        setName(null);
        setUpdate(false);

        nameRef.current.value = "";
        ageRef.current.value = "";
    }

    return (
        <div>
            <Container>
                <h2 className='text-center'>React Js Context API CRUD </h2>
                {update ? (
                  <Form onSubmit={handleUpdate}>
                  <FormGroup>
                      <FormLabel>Name</FormLabel>
                      <FormControl type='text' ref={nameRef} placeholder='Enter Name' onChange={(e) => setCurrentName(e.target.value)} required />

                      <FormLabel>Age</FormLabel>
                      <FormControl type='number' ref={ageRef} placeholder='Enter Age' onChange={(e) => setCurrentAge(e.target.value)} required />
                  </FormGroup>
                  <br />
                  <Button type='submit'>Update User</Button>
              </Form>
                ):
                (
                    <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <FormLabel>Name</FormLabel>
                        <FormControl type='text' ref={nameRef} placeholder='Enter Name' onChange={(e) => setName(e.target.value)} required />

                        <FormLabel>Age</FormLabel>
                        <FormControl type='number' ref={ageRef} placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} required />
                    </FormGroup>
                    <br />
                    <Button type='submit'>Add Users</Button>
                </Form>
                )
                }
                
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Edit User</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users && users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>
                                    <Button onClick={() => handleEdit(user)}>Edit User</Button>
                                </td>
                                <td>
                                    <Button onClick={() => deleteUser(user.id)}>Delete User</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>

    )
}

export default Users