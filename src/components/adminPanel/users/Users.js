import React, {useEffect, useState} from 'react';
import UsersSortFilter from "./UsersSortFilter";
import {Container, Dropdown} from "react-bootstrap";
import UsersList from "./UsersList";
import UserService from "../../../service/user.service";
import {ASC} from "../../../const/SortDirection";
import ItemsPagination from "../../ItemsPagination";
import {observer} from "mobx-react-lite";

function Users(props) {

    const [sort, setSort] = useState({
        attribute: "id",
        direction: ASC
    })

    const [filter, setFilter] = useState()

    const [users, setUsers] = useState()

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

    function getUsers(){
        UserService.getUsers(filter, sort, page, size).then(res => {
            console.log(res)
            setTotalPages(res.data.totalPages)
            setUsers(res.data.content)
        })
    }

    function changePage(page){
        setPage(page)
    }

    function changeSize(size){
        setSize(size)
    }

    function deleteById(id){
        UserService.deleteById(id).then(() => getUsers())
    }

    useEffect(() => {
        getUsers()
    }, [size, page, filter, sort])

    return (
        <div>
            <Container>
                <UsersSortFilter onFilterChange={changeFilter} onSortChange={changeSort} defaultSort={sort}/>
                <Dropdown className="mt-2">
                    <Dropdown.Toggle>Size</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {
                            sizes.map(s => <Dropdown.Item onClick={() => changeSize(s)} active={size === s} key={"size-" + s}>{s}</Dropdown.Item>)
                        }
                    </Dropdown.Menu>
                </Dropdown>
                {
                    users ? <UsersList onDelete={deleteById} users={users}/> : null
                }
                {
                    users ? <ItemsPagination count={totalPages} onPageChange={changePage}/> : null
                }
            </Container>
        </div>
    );
}

export default observer(Users);