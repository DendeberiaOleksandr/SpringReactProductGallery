import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";
import ProductService from "../../../service/product.service";
import NotFound from "../../notFound/NotFount";
import {Button, Card, Container, Dropdown, Form, Row, Spinner} from "react-bootstrap";
import DatePicker from "react-datepicker";
import CategoryService from "../../../service/category.service";

function ProductDetails(props) {

    const {id} = useParams()

    const [product, setProduct] = useState()
    const [categories, setCategories] = useState()

    function getProduct(){
        ProductService.getById(id).then(res => setProduct({
            name: res.data.name,
            imageUrl: res.data.imageUrl,
            description: res.data.description,
            categoryId: res.data.category.id,
            price: res.data.price,
            addingDate: res.data.addingDate
        }))
    }

    function getCategories(){
        CategoryService.getCategories().then(res => setCategories(res.data))
    }

    useEffect(() => {
        getProduct()
        getCategories()
    }, [id])

    function update(){
        ProductService.update(id, product).then(() => window.location.reload())
    }

    function isInputValid(){
        return product.name &&
            product.imageUrl &&
            product.price &&
            product.addingDate &&
            product.description &&
            product.categoryId
    }

    return (
        <div>
            {
                product && categories ? <Container>
                    <Row md={3}>
                        <Card className="p-4">
                            <Card.Header>{product.name}</Card.Header>
                            <Card.Img variant="top" src={product.imageUrl} />
                            <Card.Subtitle>{"$" + product.price}</Card.Subtitle>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Footer className="text-muted">{new Date(product.addingDate).toISOString().split('T')[0]}</Card.Footer>
                        </Card>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={event => setProduct(prevState => ({
                                    ...prevState,
                                    name: event.target.value
                                }))} value={product.name} placeholder="Name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <Form.Control onChange={event => setProduct(prevState => ({
                                    ...prevState,
                                    imageUrl: event.target.value
                                }))} value={product.imageUrl} placeholder="URL"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control onChange={event => setProduct(prevState => ({
                                    ...prevState,
                                    price: event.target.value
                                }))} value={product.price} placeholder="Price"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control onChange={event => setProduct(prevState => ({
                                    ...prevState,
                                    description: event.target.value
                                }))} as={"textarea"} value={product.description} placeholder="Description"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Adding Date</Form.Label>
                               <DatePicker onChange={date => setProduct(prevState => ({
                                   ...prevState,
                                   addingDate: date
                               }))} className="form-control" selected={new Date(product.addingDate)}/>
                            </Form.Group>
                            <Form.Group className="my-2">
                                <Dropdown>
                                    <Dropdown.Toggle>Category</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {
                                            categories.map(category => <Dropdown.Item key={category.id} onClick={() => setProduct(prevState => ({
                                                ...prevState,
                                                categoryId: category.id
                                            }))} active={category.id === product.categoryId}>{category.name}</Dropdown.Item>)
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>
                            <Form.Group className="mt-4">
                                <Button onClick={() => update()} disabled={!isInputValid()} variant={"success"}>Update</Button>
                            </Form.Group>
                        </Form>
                    </Row>
                </Container> : null
            }
        </div>
    );
}

export default observer(ProductDetails);