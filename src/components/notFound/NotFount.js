import React from 'react';
import {Alert} from "react-bootstrap";
import {observer} from "mobx-react-lite";

function NotFound(props) {
    return (
        <div className="NotFound" style={{
            margin: "10px auto",
            width: "300px",
            textAlign: "center"
        }}>
            <Alert variant="danger">Page not found!</Alert>
        </div>
    );
}

export default observer(NotFound);