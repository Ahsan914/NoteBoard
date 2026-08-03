
const {getAllNotes, createNote, updateNote, deleteNote} = require("../controllers/notes.js");
const express = require("express");
const router = express.Router();

router.get('/', getAllNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;