const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


// route 1 get all the notes: GET"api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// route 2 add notes: POST"/api/notes/addnotes"
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', "Description can't be so small").isLength({ min: 8 }),
], async (req, res) => {
    try {
        // to check if the entered data is correct
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id,
        })
        const savenote = await note.save()
        res.json(savenote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// route 3 note update : PUT"api/notes/updatenotes"
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try{
    // creating new note object to update 
    const newNote = {};
    if (title){newNote.title = title};
    if (description){newNote.description = description};
    if (tag){newNote.tag = tag};

    // finding the note to be updated 
    let note = await Note.findById(req.params.id);
    if (!note){return res.status(404).send("Not Found")}

    if (note.user.toString() !== req.user.id){ return res.status(401).send("Your Not allowed")}

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
    }catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
}
})
    
    // route  note delete : DELETE "api/notes/deletenotes"
    router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
        try{
        // finding the note to be delete 
        let note = await Note.findById(req.params.id);
        if (!note){return res.status(404).send("Not Found")}
    
        if (note.user.toString() !== req.user.id){ return res.status(401).send("Your Not allowed")}
    
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Note": "note as been deleted successfully", note: note  });
    }catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
    }) 


module.exports = router;
