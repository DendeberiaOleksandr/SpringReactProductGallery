import React from 'react';
import {Button, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

function ProductsList({products, onDelete}) {

    let navigate = useNavigate()

    return (
        <div>
            <Table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Category</th>
                    <th>Adding Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map(product => <tr style={{cursor: "pointer"}} key={product.id}>
                        <td onClick={() => navigate(`/admin/products/${product.id}`)}>{product.id}</td>
                        <td onClick={() => navigate(`/admin/products/${product.id}`)}>{product.name}</td>
                        <td onClick={() => navigate(`/admin/products/${product.id}`)}>{product.price}</td>
                        <td onClick={() => navigate(`/admin/products/${product.id}`)}>{product.description}</td>
                        <td onClick={() => navigate(`/admin/products/${product.id}`)}><img style={{width: "64px"}} alt={product.name} src={product.imageUrl}/></td>
                        <td onClick={() => navigate(`/admin/products/${product.id}`)}>{product.category.name}</td>
                        <td onClick={() => navigate(`/admin/products/${product.id}`)}>{new Date(product.addingDate).toISOString().split('T')[0]}</td>
                        <td><Button onClick={() => onDelete(product.id)} variant="danger">Delete</Button></td>
                    </tr>)
                }
                </tbody>
            </Table>
        </div>
    );
}

export default observer(ProductsList);