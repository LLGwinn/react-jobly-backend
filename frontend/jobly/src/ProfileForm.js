import React, {useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import TokenContext from "./tokenContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import JoblyApi from "./api";
import './ProfileForm.css';

function ProfileForm() {
    const {currUser, addCurrUser} = useContext(TokenContext);
    const INITIAL_STATE = {username: currUser.username, fname:currUser.firstName, lname:currUser.lastName, 
                            email:currUser.email, password:''}
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [alert, setAlert] = useState(null);

    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(data => (
             {...data, [name]:value}
        ))
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        const updatedUser = await JoblyApi.updateUser(
           currUser.username, formData.fname, formData.lname, formData.email, formData.password);
        addCurrUser(updatedUser.username);
        setAlert(`${currUser.username} updated sucessfully!`)
    }

    return(
        currUser ? 
        <div className='ProfileForm col-sm-8 col-md-6'>
            <h1>Profile</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text'
                                  value={currUser.username}
                                  name='username'
                                  readOnly={true} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type='text'
                                  value={formData.fname}
                                  name='fname'
                                  onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type='text'
                                  value={formData.lname}
                                  name='lname'
                                  onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email'
                                  value={formData.email}
                                  name='email'
                                  onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Enter password to make changes:</Form.Label>
                    <Form.Control type='password'
                                  value={formData.password}
                                  name='password'
                                  onChange={handleChange} />
                </Form.Group>
                {alert ? <Alert variant='success'>{alert}</Alert> : null}
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </div>
        :
        <Redirect to='/'></Redirect>
    )
}

export default ProfileForm;