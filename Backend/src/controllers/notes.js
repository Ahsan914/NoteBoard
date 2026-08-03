
const Note = require("../models/notes.js");


async function getAllNotes(req, res) {
	try{
		const notes = await Note.find();
		res.status(200).json(notes);
	}catch(error){
		console.error("internal server error: ", error);
		res.status(500).json({message: "internal server error"})
	}
}

function createNote(req, res) {
	res.status(201).json({message: "Note created successfully"});
}

function updateNote(req, res) {
	res.status(200).json({message: "Note updated successfully"});
}

function deleteNote(req, res) {
	res.status(200).json({message: "Note deleted successfully"});
}

module.exports = {getAllNotes, createNote, updateNote, deleteNote};
