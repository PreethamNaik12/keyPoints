import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context;
    const [note, setNote] = useState({id:"" ,etitle: "", edescription: "", etag: ""})

    useEffect(() => {
      getNotes();
      // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id ,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    }
    
    const ref = useRef(null)
    const refClose = useRef(null)

    const handleClick = (currentNote)=>{
        console.log("Updating a note", note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        // setNote({title: "", description: "", tag: ""})
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    
  return (
    <>
        <Addnote/>

        {/* <!-- Button trigger modal --> */}
        <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{
            "display": "none"
        }}>
        Edit
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className="my-3">
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/> 
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                    <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-success" onClick={handleClick}>Update Note</button>
                </div>
            </div>
        </div>
        </div>

        <div className="mt-3">
            <h1 className='text-center'>Your notes</h1>
            <div className="text-center">
                { notes.length === 0 && 'No notes to display'}
            </div>
            <div className='conaitner' style={{
                "display": 'grid',
                "gridTemplateColumns": 'repeat(auto-fill, minmax(24em, 2fr))',
            }}>
            
                {notes.map((note)=>{
                return <NoteItem key = {note._id} updateNote = {updateNote} note = {note} />
                })}
                
                
            </div>
        </div>
    </>
  )
}

export default Notes;
