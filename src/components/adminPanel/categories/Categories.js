import React, {useEffect, useState} from 'react';
import {Alert, Container} from "react-bootstrap";
import CategoriesList from "./CategoriesList";
import CategoryService from "../../../service/category.service";
import {observer} from "mobx-react-lite";
import CategoriesForm from "./CategoriesForm";

function Categories(props) {

    const [categories, setCategories] = useState()

    function getCategories(){
        CategoryService.getCategories().then(res => {
            setCategories(res.data)
        })
    }

    useEffect(() => {
        getCategories()
    }, [])

    function createCategory(category){
        CategoryService.saveCategory(category).then(() => getCategories())
    }

    function deleteCategory(id){
        CategoryService.deleteById(id).then(() => getCategories())
    }

    return (
        <div>
            <Container>
                <CategoriesForm onCreate={createCategory}/>
                {
                    categories && categories.length > 0 ? <CategoriesList categories={categories} deleteCategory={deleteCategory}/> :
                        <Alert className="mt-2">Categories list is empty</Alert>
                }
            </Container>
        </div>
    );
}

export default observer(Categories);