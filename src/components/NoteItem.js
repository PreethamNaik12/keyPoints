import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;
    return (
        <div>
            
            
            <div className="card my-1 mx-3">
                <div className="card-body">
                    <h3 className="card-title">{note.title}</h3>
                    <p className="card-text">{note.description}</p>
                    <button className="btn btn-primary mx-3"  onClick={() => { updateNote(note) }}><i className="fa-solid fa-pen-to-square mx-1"></i>Edit</button>
                    <button className="btn btn-danger mx-3" onClick={() => { deleteNote(note._id) }}><i className="fa-solid fa-trash mx-1" ></i>Delete</button>
                </div>
                <div className="card-footer">
                    #{note.tag}
                </div>
            </div>
        </div>
    )
}

export default NoteItem;