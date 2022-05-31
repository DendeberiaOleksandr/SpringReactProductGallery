import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Col, Form, Row} from "react-bootstrap";

function CategoriesForm({ onCreate }) {

    const [category, setCategory] = useState({
        id: null,
        name: null
    })

    const [validated, setValidated] = useState(false)

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            onCreate(category)
        }

        setValidated(true);
    }

    return (
        <div>
            <Form noValidate  className="mt-4" validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        <strong>Create category</strong>
                    </Form.Label>
                    <Form.Control required onChange={event => setCategory(prevState => ({
                                ...prevState,
                                name: event.target.value
                    }))} placeholder="Name"/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="mt-2">Create</Button>
            </Form>
        </div>
    );
}

export default observer(CategoriesForm);