const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');  //can check if the notes made are not simply empty

// ROUTE 1: Get all the notes using: GET "/api/notes/createuser". Login required 
router.get('/fetchallnotes', fetchUser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required 
router.post('/addnote', [
    body('title', 'Please enter a valid title').isLength({ min: 5 }),
    body('description', 'Description should be atleast 5 characters long').isLength({ min: 5 }),
], fetchUser, async (req, res) => {

    try {

        const { title, description, tag } = req.body;   //destructuring

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }


})

// ROUTE 3: Update a note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;   //destructuring   

    try {
    // create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //Find the note to be updated and update it

    let note = await Note.findById(req.params.id);  //Find byID is used intentionally to make it more secure
    if (!note) { return res.status(404).send("Not Found") } //Shows error if note not found

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    } //Shows error if user is unauthorized

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }) //new:true is used to return the updated note, $set sets new note as source for update
    res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

// ROUTE 4: Delete a note using: DELETe "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;   //destructuring  

    try {
    //Find the note to be  deleted and delete it

    let note = await Note.findById(req.params.id);  //Find byID is used intentionally to make it more secure
    if (!note) { return res.status(404).send("Not Found") } //Shows error if note not found

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    } //Shows error if user is unauthorized

    note = await Note.findByIdAndDelete(req.params.id) //new:true is used to return the updated note, $set sets new note as source for update
    res.json({ "Success": "Note has been deleted", note: note });
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    }

})

module.exports = router