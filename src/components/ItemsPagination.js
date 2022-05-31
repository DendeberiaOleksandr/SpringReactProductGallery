import React, {useState} from 'react';
import {Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";

function ItemsPagination({count, onPageChange}) {

    const [page, setPage] = useState(0)

    function changePage(page){
        setPage(page)
        onPageChange(page)
    }

    return (
        <div>
            <Pagination>
                <Pagination.First onClick={() => changePage(0)}/>
                {
                    page === 0 ? null : <>
                        <Pagination.Prev onClick={() => changePage(page - 1)}/>
                        <Pagination.Item onClick={() => changePage(0)}>1</Pagination.Item>
                        <Pagination.Ellipsis/>
                    </>
                }
                {
                    page - 3 > 0 ? <Pagination.Item onClick={() => changePage(page - 3)}>{page - 2}</Pagination.Item> : null
                }
                {
                    page - 2 > 0 ? <Pagination.Item onClick={() => changePage(page - 2)}>{page - 1}</Pagination.Item> : null
                }
                {
                    page - 1 > 0 ? <Pagination.Item onClick={() => changePage(page - 1)}>{page}</Pagination.Item> : null
                }
                <Pagination.Item active={true}>{page + 1}</Pagination.Item>
                {
                    page + 1 < count - 1 ? <Pagination.Item onClick={() => changePage(page + 1)}>{page + 2}</Pagination.Item> : null
                }
                {
                    page + 2 < count - 1 ? <Pagination.Item onClick={() => changePage(page + 2)}>{page + 3}</Pagination.Item> : null
                }
                {
                    page + 3 < count - 1 ? <Pagination.Item onClick={() => changePage(page + 3)}>{page + 4}</Pagination.Item> : null
                }
                {
                    page + 1 === count ? null : <>
                        <Pagination.Ellipsis/>
                        <Pagination.Item onClick={() => changePage(count - 1)}>{count}</Pagination.Item>
                        <Pagination.Next onClick={() => changePage(page + 1)}/>
                    </>
                }
                <Pagination.Last onClick={() => changePage(count - 1)}/>
            </Pagination>
        </div>
    );
}

export default observer(ItemsPagination);