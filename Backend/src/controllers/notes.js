
const Note = require("../models/notes.js");


async function getAllNotes(req, res) {
	try{
		const notes = await Note.find();
		res.status(200).json(notes);
	}catch(error){
		console.error("internal server error: ", error);
		res.status(500).json({message: "internal server error!"})
	}
}

async function createNote(req, res) {
	try{
		const {title, content} = req.body;
		const note = new Note({title, content});

		const savedNote = await note.save();
		res.status(201).json(savedNote);
	}catch(error){
		console.error("Error in createNote controller: ", error);
		res.status(500).json({message: "internal server error!"})
	}
}

function updateNote(req, res) {
	res.status(200).json({message: "Note updated successfully"});
}

function deleteNote(req, res) {
	res.status(200).json({message: "Note deleted successfully"});
}

module.exports = {getAllNotes, createNote, updateNote, deleteNote};
