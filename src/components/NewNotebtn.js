import React from 'react';
import { Link } from "react-router-dom";

const NewNotebtn = () => {
  return (
    <div style={{
        "position": "fixed",
        "bottom": "5%",
        "right": "3%",
    }}>
        <Link className="btn btn-primary" to="/addnote" role="button" style={{
            "padding": "1em 2em"
        }}><i className="fa-solid fa-square-plus mx-3"></i>Create</Link>
    </div>
  )
}

export default NewNotebtn