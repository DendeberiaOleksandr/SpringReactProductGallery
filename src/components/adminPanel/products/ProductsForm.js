import React, {useState} from 'react';
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

function ProductsForm({categories, onSubmit}) {

    const [form, setForm] = useState({
        name: null,
        price: null,
        description: null,
        imageUrl: null,
        categoryId: null
    })

    function isFormValid(){
        return form.name && form.price && form.description && form.imageUrl && form.categoryId
    }

    return (
        <div>
            <Form className="mt-3">
                <Form.Group className="mt-2">
                    <Row>
                        <Col sm={1}>
                            <Form.Label>Name</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control onChange={event => setForm(prevState => ({
                                ...prevState,
                                name: event.target.value
                            }))} placeholder="Name"/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Row>
                        <Col sm={1}>
                            <Form.Label>Price</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control onChange={event => setForm(prevState => ({
                                ...prevState,
                                price: event.target.value
                            }))} placeholder="Price"/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Row>
                        <Col sm={1}>
                            <Form.Label>Image</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control onChange={event => setForm(prevState => ({
                                ...prevState,
                                imageUrl: event.target.value
                            }))} placeholder="URL"/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={event => setForm(prevState => ({
                        ...prevState,
                        description: event.target.value
                    }))} as={"textarea"}/>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Dropdown>
                        <Dropdown.Toggle>Category</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                categories.map(category => <Dropdown.Item onClick={() => setForm(prevState => ({
                                    ...prevState,
                                    categoryId: category.id
                                }))} active={form.categoryId === category.id} key={category.id}>{category.name}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Button disabled={!isFormValid()} onClick={() => onSubmit(form)} className="mt-2">Submit</Button>
            </Form>
        </div>
    );
}

export default observer(ProductsForm);