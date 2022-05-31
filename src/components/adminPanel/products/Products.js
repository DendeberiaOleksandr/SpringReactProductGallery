import React, {useEffect, useState} from 'react';
import ProductsSortFilter from "./ProductsSortFilter";
import ProductService from "../../../service/product.service";
import {ASC} from "../../../const/SortDirection";
import {Alert, Button, Container, Dropdown} from "react-bootstrap";
import CategoryService from "../../../service/category.service";
import ProductsList from "./ProductsList";
import ProductsForm from "./ProductsForm";
import ItemsPagination from "../../ItemsPagination";
import {observer} from "mobx-react-lite";

function Products(props) {

    const [sort, setSort] = useState({
        attribute: "id",
        direction: ASC
    })

    const [filter, setFilter] = useState({
        idFrom: "",
        idTo: "",
        name: "",
        addingDateFrom: "",
        addingDateTo: "",
        priceFrom: "",
        priceTo: "",
        category: ""
    })

    const [isFormEnabled, setIsFormEnabled] = useState(false)

    const [products, setProducts] = useState()

    const [categories, setCategories] = useState([])

    const [form, setForm] = useState({
        name: null,
        price: null,
        description: null,
        imageUrl: null
    })

    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)

    const [size, setSize] = useState(10)

    const sizes = [
        1, 10, 20, 50, 100
    ]

    function changeFilter(filter){
        setFilter(filter)
    }

    function changeSort(sort){
        setSort(sort)
    }

    function getProducts(){
        ProductService.getProducts(filter, sort, page, size).then(res => {
            setTotalPages(res.data.totalPages)
            setProducts(res.data.content)
        })
    }

    function getCategories(){
        CategoryService.getCategories().then(res => {
            setCategories(res.data)
        })
    }

    function changePage(page){
        setPage(page)
    }

    function changeSize(size){
        setSize(size)
    }

    function saveProduct(product){
        ProductService.saveProduct(product).then(() => getProducts())
    }

    function submitSortFilter(){
        getProducts()
    }

    function changePage(page){
        setPage(page)
    }

    function deleteProductById(id){
        ProductService.deleteById(id).then(() => getProducts())
    }

    useEffect(() => {
        getProducts()
    }, [size, page])

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div>
            <Container>
                {
                    isFormEnabled ? <Button onClick={() => setIsFormEnabled(false)}>Show Filter</Button> :
                        <Button onClick={() => setIsFormEnabled(true)}>Add Product</Button>
                }
                {
                    isFormEnabled ? <ProductsForm onSubmit={saveProduct} categories={categories}/> : <ProductsSortFilter onSubmit={submitSortFilter} defaultFilter={filter} onFilterChange={changeFilter}
                                                                          onSortChange={changeSort}
                                                                          defaultSort={sort}
                                                                          categories={categories}/>
                }
                <hr className="mt-4 mb-4"/>
                {
                    products && products.length > 0 ? <>
                        <Dropdown>
                            <Dropdown.Toggle>Size</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    sizes.map(sz => <Dropdown.Item key={sz} active={sz === size} onClick={() => setSize(sz)}>{sz}</Dropdown.Item>)
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <ProductsList onDelete={deleteProductById} products={products}/>
                        <ItemsPagination count={totalPages} onPageChange={changePage}/>
                    </> : <Alert>Products list is empty</Alert>
                }
            </Container>
        </div>
    );
}

export default observer(Products);