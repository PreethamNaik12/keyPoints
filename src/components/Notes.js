import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
  return (
    <>
        <h1>Your notes</h1>
        <div className='conaitner' style={{
            "display": 'grid',
            "grid-template-columns": 'repeat(auto-fill, minmax(24em, 2fr))',
        }}>
            {notes.map((note)=>{
            return <NoteItem note = {note} />
            })}
        </div>
    </>
  )
}

export default Notes;
