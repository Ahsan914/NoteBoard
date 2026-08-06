
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

async function updateNote(req, res) {
	try{
		const {title, content} = req.body;
		const updatedNote = await Note.findByIdAndUpdate(
			req.params.id, {title, content}, {returnDocument: "after"}
		);

		if(!updatedNote) return res.status(404).json({message: "Note not found"});
		res.status(200).json({message: `Note updated successfully: ${updatedNote}`});

	}catch(error){
		console.error("Error in updatedNote controller: ", error);
		res.status(500).json({message: "internal server error!"})
	}
}

function deleteNote(req, res) {
	try{
		const deletedNote = await Note.findByIdAndDelete(req.params.id);

		if (!deletedNote) return res.status(404).json({message: "Note not found"});
		res.status(200).json({message: "Note deleted successfully"});

	}catch(error){
		console.error("Error in deleteNote controller: ", error);
		res.status(500).json({message: "internal server error!"})
	}
}

module.exports = {getAllNotes, createNote, updateNote, deleteNote};
