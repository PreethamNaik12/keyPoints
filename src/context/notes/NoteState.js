import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInital = []

  const [notes, setNotes] = useState(notesInital);

  //ADD a note
  const addNote = async (title, description, tag) => {
    //TODO: API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZTNjMjc1ODgyODE4MmYyZGFiZGY5In0sImlhdCI6MTY4Mzg5ODI4MH0.AcZqoKphbQs4HFsP3TyElzhM1cqp94zHUT4qSLl1ZkI"
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log("Adding a new note", json);

    const note = {
      "_id": "645f94cc684b63eac33a3a88",
      "user": "645f9460684b63eac33a3a7d",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-05-13T13:46:52.765Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }
  
  //Get all notes
  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZTNjMjc1ODgyODE4MmYyZGFiZGY5In0sImlhdCI6MTY4Mzg5ODI4MH0.AcZqoKphbQs4HFsP3TyElzhM1cqp94zHUT4qSLl1ZkI"
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json)
  }

  //DELETE a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZTNjMjc1ODgyODE4MmYyZGFiZGY5In0sImlhdCI6MTY4Mzg5ODI4MH0.AcZqoKphbQs4HFsP3TyElzhM1cqp94zHUT4qSLl1ZkI"
      }
    });
    const json = await response.json();
    console.log(json);
    //Logic to delete in client
    console.log("Deleting a note with id: " + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //EDIT a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ1ZTNjMjc1ODgyODE4MmYyZGFiZGY5In0sImlhdCI6MTY4Mzg5ODI4MH0.AcZqoKphbQs4HFsP3TyElzhM1cqp94zHUT4qSLl1ZkI"
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = await response.json();
    console.log(json);


    let newNotes = JSON.parse(JSON.stringify(notes)) 
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }

    }
    setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;