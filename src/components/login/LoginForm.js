import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {Form, Button, Alert} from "react-bootstrap";
import "./LoginForm.css"

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [state, setState] = useState({
        isLoginInvalid: false,
        isRegister: false,
        isRegisterInvalid: false
    })

    const {store} = useContext(Context)

    function isUsernameValid(){
        return username.length >= 3 && username.length <= 20
    }

    function isPasswordValid(){
        return password.length >= 8 && password.length <= 20
    }

    function register(username, password){

        setState(prevState => (
            {
                ...prevState,
                isRegister: true
            }
        ))

        store.register(username, password).then(r => {
            setState(prevState => (
                {
                    ...prevState,
                    isRegisterInvalid: false
                }
            ))
        }).catch((e) => {
            setState(prevState => (
                {
                    ...prevState,
                    isRegisterInvalid: true
                }
            ))
        })
    }

    function login(username, password){
        store.login(username, password).then(() => window.location.reload()).catch((error) => {
            setState(prevState => (
                {
                    ...prevState,
                    isLoginInvalid: true
                }
            ))
        })
    }

    return (
        <Form className="LoginForm">
            <h1>Product Gallery</h1>
            <Form.Group className="mt-1">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username"
                              placeholder="Username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mt-1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mt-1">
                <div className="d-grid gap-2">
                    <Button disabled={!isUsernameValid() || !isPasswordValid()} onClick={() => login(username, password)}>Login</Button>
                    <Button disabled={!isUsernameValid() || !isPasswordValid()} className="ml-1" variant="outline-primary" onClick={() => register(username, password)}>Register</Button>
                </div>
            </Form.Group>
            <Form.Group className="mt-3">
                {
                    state.isLoginInvalid ? <Alert variant="danger">Invalid username or password</Alert> : null
                }
            </Form.Group>
            <Form.Group className="mt-3">
                {
                    state.isRegister ? (state.isRegisterInvalid ? <Alert variant="danger">Username already exists!</Alert> : <Alert variant="success">Successfully registered!</Alert>) : null
                }
            </Form.Group>
        </Form>
    );
};

export default observer(LoginForm);