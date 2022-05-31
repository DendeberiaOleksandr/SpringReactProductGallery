import React from 'react';
import {Button, Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";

function UsersList({ users, onDelete }) {
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Registration Date</th>
                        <th>Roles</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(u => <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.username}</td>
                            <td>{u.password}</td>
                            <td>{new Date(u.registrationDate).toISOString().split('T')[0]}</td>
                            <td>{u.roles.map(r => r.name).join(", ")}</td>
                            <td><Button onClick={() => onDelete(u.id)} variant="danger">Delete</Button></td>
                        </tr>)
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default observer(UsersList);