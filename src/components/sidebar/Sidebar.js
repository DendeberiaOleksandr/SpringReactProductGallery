import React, {useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import {observer} from "mobx-react-lite";
import CategoryService from "../../service/category.service";
import {DESC, DIRECTIONS} from "../../const/SortDirection";

function Sidebar({ sortAttributes, onSubmit, onSortChange, onFilterChange, defaultFilter, defaultSort }) {

    const [filter, setFilter] = useState(defaultFilter)

    const [sort, setSort] = useState(defaultSort)

    const [categories, setCategories] = useState([])

    useEffect(() => {
        CategoryService.getCategories().then(res => {
            setCategories(res.data)
        })
    }, [])

    useEffect(() => {
        onSortChange(sort)
        onFilterChange(filter)
    }, [sort, filter])

    return (
        <div className="Sidebar">
            <Form>
                <Form.Group>
                    <Dropdown className="my-1">
                        <Dropdown.Toggle>Sort</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                sortAttributes.map(srt => <Dropdown.Item active={srt === sort.attribute} onClick={() => setSort(prevState => ({
                                    ...prevState,
                                    attribute: srt
                                }))} key={srt} >{srt}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="my-1">
                        <Dropdown.Toggle>Direction</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {
                                DIRECTIONS.map(dir => <Dropdown.Item active={dir === sort.direction} onClick={() => setSort(prevState => ({
                                    ...prevState,
                                    direction: dir
                                }))} key={dir} >{dir}</Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
                <Form.Group className="mt-4">
                    <Form.Label>
                        <strong>Categories</strong>
                    </Form.Label>
                    <ListGroup>
                        <ListGroupItem key="none" style={{cursor: "pointer"}} onClick={() => setFilter(prevState => ({
                            ...prevState,
                            categoryId: null
                        }))} active={!filter.categoryId}>None</ListGroupItem>
                        {
                            categories.map(c => <ListGroupItem active={filter.categoryId === c.id}
                                                               onClick={() => setFilter(prevState => ({
                                                                   ...prevState,
                                                                   categoryId: c.id
                                                               }))}
                                                               style={{cursor: "pointer"}}
                                                               key={c.id}>{c.name}</ListGroupItem>)
                        }
                    </ListGroup>
                </Form.Group>
                <Form.Group className="mt-4">
                    <Form.Label>
                        <strong>Name</strong>
                    </Form.Label>
                    <Form.Control onChange={event => setFilter(prevState => ({
                        ...prevState,
                        name: event.target.value
                    }))} placeholder="Name"/>
                </Form.Group>
                <Form.Group className="mt-4">
                    <Form.Label>
                        <strong>Price</strong>
                    </Form.Label>
                    <Form.Group>
                        <Form.Label>Min:</Form.Label>
                        <Form.Range max={100000} value={filter.priceFrom} onChange={e => setFilter(prevState => ({
                            ...prevState,
                            priceFrom: e.target.value
                        }))}/>
                        <Form.Control onChange={event => setFilter(prevState => ({
                            ...prevState,
                            priceFrom: event.target.value
                        }))} value={filter.priceFrom}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Max:</Form.Label>
                        <Form.Range max={100000} value={filter.priceTo} onChange={e => setFilter(prevState => ({
                            ...prevState,
                            priceTo: e.target.value
                        }))}/>
                        <Form.Control onChange={event => setFilter(prevState => ({
                            ...prevState,
                            priceTo: event.target.value
                        }))} value={filter.priceTo}/>
                    </Form.Group>
                </Form.Group>

                <Form.Group className="mt-4">
                    <Form.Label>
                        <strong>Adding date</strong>
                    </Form.Label>
                    <Form.Group>
                        <Form.Label>From:</Form.Label>
                        <DatePicker className="form-control" selected={filter.addingDateFrom} onChange={(date) => setFilter(prevState => ({
                            ...prevState,
                            addingDateFrom: date
                        }))} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>To:</Form.Label>
                        <DatePicker className="form-control" selected={filter.addingDateTo} onChange={(date) => setFilter(prevState => ({
                            ...prevState,
                            addingDateTo: date
                        }))} />
                    </Form.Group>
                </Form.Group>
                <Button onClick={() => onSubmit()} className="mt-4">Submit</Button>
            </Form>
        </div>
    );
}

export default observer(Sidebar);