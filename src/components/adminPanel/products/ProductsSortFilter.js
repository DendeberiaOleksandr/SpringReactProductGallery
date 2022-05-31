import React, {useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {DIRECTIONS} from "../../../const/SortDirection";
import {observer} from "mobx-react-lite";

function ProductsSortFilter({onSortChange, onFilterChange, defaultSort, defaultFilter, categories, onSubmit}) {

    const sortAttributes = [
        "id",
        "name",
        "price",
        "addingDate",
        "category"
    ]

    const [filter, setFilter] = useState(defaultFilter)

    const [sort, setSort] = useState(defaultSort)

    useEffect(() => {
        onFilterChange(filter)
        onSortChange(sort)
    }, [filter, sort])

    return (
        <div>
            <Form>
                <Form.Group className="mt-2">
                    <Form.Label><strong>Name</strong></Form.Label>
                    <Form.Control value={filter.name} onChange={event => setFilter(prevState => ({
                        ...prevState,
                        name: event.target.value
                    }))} placeholder="Name"/>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label><strong>Id</strong></Form.Label>
                    <Row>
                        <Col>
                            <Form.Control value={filter.idFrom} onChange={event => setFilter(prevState => ({
                                ...prevState,
                                idFrom: event.target.value
                            }))} placeholder="From"/>
                        </Col>
                        <Col>
                            <Form.Control value={filter.idTo} onChange={event => setFilter(prevState => ({
                                ...prevState,
                                idTo: event.target.value
                            }))} placeholder="To"/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label><strong>Price</strong></Form.Label>
                    <Row>
                        <Col>
                            <Form.Control value={filter.priceFrom} onChange={event => setFilter(prevState => ({
                                ...prevState,
                                priceFrom: event.target.value
                            }))} placeholder="From"/>
                        </Col>
                        <Col>
                            <Form.Control value={filter.priceTo} onChange={event => setFilter(prevState => ({
                                ...prevState,
                                priceTo: event.target.value
                            }))} placeholder="To"/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label><strong>Adding Date</strong></Form.Label>
                    <Row>
                        <Col sm={1}>
                            <Form.Label>From</Form.Label>
                        </Col>
                        <Col>
                            <DatePicker onChange={date => setFilter(prevState => ({
                                ...prevState,
                                addingDateFrom: date
                            }))} selected={filter.addingDateFrom} className="form-control"/>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={1}>
                            <Form.Label>To</Form.Label>
                        </Col>
                        <Col>
                            <DatePicker onChange={date => setFilter(prevState => ({
                                ...prevState,
                                addingDateTo: date
                            }))} selected={filter.addingDateTo}
                                        className="form-control"/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Dropdown>
                        <Dropdown.Toggle>Category</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setFilter(prevState => ({
                                ...prevState,
                                category: null
                            }))} active={!filter.category}>None</Dropdown.Item>
                            {
                                categories.map(cat => <Dropdown.Item active={cat.id === filter.category} onClick={() => setFilter(prevState => ({
                                    ...prevState,
                                    category: cat.id
                                }))} key={cat.id}>{cat.name}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle>Sort</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                sortAttributes.map(attr => <Dropdown.Item onClick={() => setSort(prevState => ({
                                    ...prevState,
                                    attribute: attr
                                }))} active={attr===sort.attribute} key={attr}>{attr}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle>Direction</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                DIRECTIONS.map(dir => <Dropdown.Item onClick={() => setSort(prevState => ({
                                    ...prevState,
                                    direction: dir
                                }))} active={dir===sort.direction} key={dir}>{dir}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Button className="mt-2" onClick={() => {
                    onSubmit()
                }}>Submit</Button>
            </Form>
        </div>
    );
}

export default observer(ProductsSortFilter);