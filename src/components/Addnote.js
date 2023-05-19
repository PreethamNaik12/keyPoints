import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"
import { useNavigate } from 'react-router-dom';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const navigate = useNavigate();

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        navigate('/')
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required placeholder='Keyword for your keypoints' /> 
                    <div id="emailHelp" className="form-text">Keyword: This reminds your the main purpose of the note</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required placeholder='Write as many as keypoints possible'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required placeholder='Adding tag may help you to filter the notes'/>
                </div>
               
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}><i className="fa-solid fa-square-plus mx-2"></i>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote

