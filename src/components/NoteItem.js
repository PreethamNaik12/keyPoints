import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import cardcss from '../card.css';
import { useRef } from 'react';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const refDelete = useRef(null);
    const refClose = useRef(null);

    return (
        <div>

            <div class="card">
                {note.tag && <em className='tag'>#{note.tag}</em>}
                <div class="header">
                    <span class="icon">
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" fill-rule="evenodd"></path>
                        </svg>
                    </span>
                    <h4 class="alert text-black">{note.title}</h4>
                </div>
                <hr />
                <p class="fw-bold">
                    {note.description}
                </p>

                <div class="actions">
                    <div>
                        <button className="btn btn-primary mb-2 read" onClick={() => { updateNote(note) }}>
                            <i className="fa-solid fa-pen-to-square"></i>Edit</button>
                    </div>

                    <div>
                        <button className="btn btn-outline-danger mark-as-read" onClick={() => {
                            refDelete.current.click();}}><i className="fa-solid fa-trash mx-1" ></i>Delete</button>
                    </div>
                </div>
            </div>



            {/* <!-- Button trigger modal --> */}
            <button ref={refDelete} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden>
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete this note?</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                                <h3>{note.title}</h3>
                                <hr />
                                <p>{note.description}</p>
                        </div>
                        <div class="modal-footer">
                            <button ref={refClose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger" onClick={() => {
                                deleteNote(note._id);
                                refClose.current.click();
                                }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default NoteItem;