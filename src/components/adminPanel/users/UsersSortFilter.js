import React, {useState} from 'react';
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import {DIRECTIONS} from "../../../const/SortDirection";
import {observer} from "mobx-react-lite";
import DatePicker from "react-datepicker";

function UsersSortFilter({onSortChange, onFilterChange, defaultSort}) {

    const sortAttributes = [
        "id",
        "username",
        "registrationDate"
    ]

    const [filter, setFilter] = useState({
        idFrom: null,
        idTo: null,
        username: null,
        registrationDateFrom: null,
        registrationDateTo: null
    })

    const [sort, setSort] = useState(defaultSort)

    return (
        <div>
            <Form>
                <Form.Group className="mt-2">
                    <Form.Label><strong>Username</strong></Form.Label>
                    <Form.Control onChange={event => setFilter(prevState => ({
                        ...prevState,
                        username: event.target.value
                    }))} placeholder="Username"/>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label><strong>Id</strong></Form.Label>
                    <Row>
                        <Col>
                            <Form.Control onChange={event => setFilter(prevState => ({
                                ...prevState,
                                idFrom: event.target.value
                            }))} placeholder="From"/>
                        </Col>
                        <Col>
                            <Form.Control onChange={event => setFilter(prevState => ({
                                ...prevState,
                                idTo: event.target.value
                            }))} placeholder="To"/>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Label><strong>Registration Date</strong></Form.Label>
                    <Row>
                        <Col sm={1}>
                            <Form.Label>From</Form.Label>
                        </Col>
                        <Col>
                            <DatePicker onChange={date => setFilter(prevState => ({
                                ...prevState,
                                registrationDateFrom: date
                            }))} selected={filter.registrationDateFrom} className="form-control"/>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={1}>
                            <Form.Label>To</Form.Label>
                        </Col>
                        <Col>
                            <DatePicker onChange={date => setFilter(prevState => ({
                                ...prevState,
                                registrationDateTo: date
                            }))} selected={filter.registrationDateTo}
                                        className="form-control"/>
                        </Col>
                    </Row>
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
                    onSortChange(sort)
                    onFilterChange(filter)
                }}>Submit</Button>
            </Form>
        </div>
    );
}

export default observer(UsersSortFilter);