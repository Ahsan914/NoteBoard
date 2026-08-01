
function getAllNotes(req, res) {
	res.status(200).send("You just fetched the notes");
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
