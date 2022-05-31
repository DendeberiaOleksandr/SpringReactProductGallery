import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Link, Outlet} from "react-router-dom";
import {linkNoUnderlineStyle} from "../../index";

function AdminPanel(props) {

    return (
        <div className="AdminPanel">
            <Navbar>
                <Container>
                    <Nav className="me-auto">
                        <Link className="mx-1" style={linkNoUnderlineStyle} to="users">Users</Link>
                        <Link className="mx-1" style={linkNoUnderlineStyle} to="products">Products</Link>
                        <Link className="mx-1" style={linkNoUnderlineStyle} to="categories">Categories</Link>
                    </Nav>
                </Container>
            </Navbar>
            <Outlet/>
        </div>
    );
}

export default observer(AdminPanel);