import React, {useState} from 'react';
import {Button, Form, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import CategoryService from "../../../service/category.service";

function CategoriesList({ categories, deleteCategory }) {

    const [category, setCategory] = useState()

    function update(){
        CategoryService.update(category.id, category).then(() => window.location.reload())
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map(cat => <tr key={cat.id}>
                            <td onClick={() => setCategory(cat)}>{cat.id}</td>
                            <td onClick={() => setCategory(cat)}>
                                {
                                    category && category.id === cat.id ? <Form.Control onChange={event => setCategory(prevState => ({
                                        ...prevState,
                                        name: event.target.value
                                    }))} value={category.name}/> : cat.name
                                }
                            </td>
                            <td>
                                {
                                    category && category.id === cat.id ? <Button onClick={() => update()} className="mx-1" variant="success" disabled={!category.name}>Update</Button> : null
                                }
                                <Button className="mx-1" variant="danger" onClick={() => deleteCategory(cat.id)}>Delete</Button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default observer(CategoriesList);