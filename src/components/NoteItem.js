import React from 'react'

const NoteItem = (props) => {
    const {note} = props;
    return (
        <div>
            
            
            <div className="card my-5 mx-3">
                <div className="card-body">
                    <h3 className="card-title">{note.title}</h3>
                    <p className="card-text">{note.description}</p>
                    <a href="#" className="btn btn-primary mx-3">Edit</a>
                    <a href="#" className="btn btn-primary mx-3">Delete</a>
                </div>
                <div className="card-footer">
                    #{note.tag}
                </div>
            </div>
        </div>
    )
}

export default NoteItem;