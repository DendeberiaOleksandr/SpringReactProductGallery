import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import'./Gallery.css'
import {Alert, Card, Col, Container, Dropdown, Navbar, Row} from "react-bootstrap";
import Sidebar from "../sidebar/Sidebar";
import {DESC} from "../../const/SortDirection";
import ProductService from "../../service/product.service";
import ItemsPagination from "../ItemsPagination";

function Gallery(props) {

    const [size, setSize] = useState(20)

    const [page, setPage] = useState(0)

    const [totalPages, setTotalPages] = useState(1)

    const [products, setProducts] = useState([])

    const [filter, setFilter] = useState({
        name: "",
        priceFrom: "",
        priceTo: "",
        addingDateFrom: "",
        addingDateTo: "",
        categoryId: ""
    })
    const [sort, setSort] = useState({
        attribute: "addingDate",
        direction: DESC
    })

    const sortAttributes = [
        "addingDate",
        "price",
        "name",
        "id"
    ]

    const counts = [
        10, 20, 50, 100
    ]

    function changeFilter(filter){
        setFilter(filter)
    }

    function changeSort(sort){
        setSort(sort)
    }

    function submitSortFilter(){
        getProducts()
    }

    function getProducts(){
        ProductService.getProducts(filter, sort, page, size).then(res => {
            setTotalPages(res.data.totalPages)
            setProducts(res.data.content)
        })
    }

    function changePage(page){
        setPage(page)
    }

    useEffect(() => {
        getProducts()
    }, [size, page])

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="Gallery">
            <Container>
                <hr/>
                <Row>
                    <Col sm={3}>
                        <Sidebar sortAttributes={sortAttributes}
                                 onSubmit={submitSortFilter}
                                 onFilterChange={changeFilter}
                                 onSortChange={changeSort}
                                 defaultFilter={filter}
                                 defaultSort={sort}/>
                    </Col>
                    <Col sm={9}>
                        <Dropdown className="my-1">
                            <Dropdown.Toggle>Count</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    counts.map(c => <Dropdown.Item onClick={() => setSize(c)} key={c} active={size === c}>{c}</Dropdown.Item>)
                                }
                            </Dropdown.Menu>

                            {
                                products && products.length > 0 ? <Container className="my-1">
                                    <Row className="gap-4" xs={1} md={4}>
                                        {
                                            products.map(product => <Card className="p-1" key={product.id}>
                                                <Card.Img variant="top" src={product.imageUrl} />
                                                <Card.Title>{product.name}</Card.Title>
                                                <Card.Subtitle>{"$" + product.price}</Card.Subtitle>
                                                <Card.Text>{product.description}</Card.Text>
                                                <Card.Footer className="text-muted">{new Date(product.addingDate).toISOString().split('T')[0]}</Card.Footer>
                                            </Card>)
                                        }
                                    </Row>
                                    <Row className="my-1">
                                        <ItemsPagination count={totalPages} onPageChange={changePage}/>
                                    </Row>
                                </Container> : <Alert className="my-1">Product list is empty</Alert>
                            }

                        </Dropdown>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default observer(Gallery);