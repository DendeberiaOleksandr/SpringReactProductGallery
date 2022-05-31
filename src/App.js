import {useContext, useEffect} from "react";
import {Context, linkNoUnderlineStyle} from "./index";
import {observer} from "mobx-react-lite";
import Gallery from "./components/gallery/Gallery";
import LoginForm from "./components/login/LoginForm";
import {Button, Container, Navbar, Spinner} from "react-bootstrap";
import {Link, Route, Routes} from "react-router-dom";
import AdminPanel from "./components/adminPanel/AdminPanel";
import NotFound from "./components/notFound/NotFount";
import Users from "./components/adminPanel/users/Users";
import Categories from "./components/adminPanel/categories/Categories";
import Products from "./components/adminPanel/products/Products";
import ProductDetails from "./components/adminPanel/products/ProductDetails";

function App() {

    const {store} = useContext(Context)
    const ADMIN_ROLE = "ROLE_ADMIN"

    useEffect(() => {
        if (localStorage.getItem("accessToken")){
            store.checkAuth().then(() => {
                const decoded = store.getDecodedToken()
                decoded.roles.forEach(role => {
                    if (role === ADMIN_ROLE){
                        store.setIsAdmin(true)
                    }
                })
            })
        }
    }, [])

    function logout() {
        store.logout().then()
    }

    return (
        <div className="App">
            {
                store.isLoading ? <Spinner className="d-block m-auto mt-4" animation={"border"}/> : (store.isAuth ? (
                    <>
                        <Navbar>
                                <Container>
                                    <Navbar.Brand><Link style={linkNoUnderlineStyle} to="/">Product Gallery</Link></Navbar.Brand>
                                    <Navbar.Toggle />
                                    <Navbar.Collapse className="justify-content-end">
                                        {
                                            store.isAdmin ? (
                                                <Navbar.Text>
                                                    <Link className="mx-1" style={linkNoUnderlineStyle} to="/admin"><Button>Admin Panel</Button></Link>
                                                </Navbar.Text>
                                            ) : null
                                        }
                                        <Navbar.Text>
                                            <Button onClick={() => logout()} variant="outline-primary">Logout</Button>
                                        </Navbar.Text>
                                    </Navbar.Collapse>
                                </Container>
                        </Navbar>
                        <Routes>
                            <Route element={<Gallery/>} path=""/>
                            {
                                store.isAdmin ? <Route element={<AdminPanel/>} path="admin">
                                    <Route element={<Users/>} path="users">
                                    </Route>
                                    <Route element={<Categories/>} path="categories"/>
                                    <Route element={<Products/>} path="products"/>
                                    <Route element={<ProductDetails/>} path="products/:id"/>
                                </Route> : null
                            }
                            <Route element={<NotFound/>} path="*"/>
                        </Routes>
                    </>
                ) : <LoginForm/>)
            }
        </div>
    );
}

export default observer(App);
