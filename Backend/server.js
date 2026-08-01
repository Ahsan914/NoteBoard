
const notesRouter = require("./routes/notes.js");
const express = require("express");
const app = express();

app.use("/api/notes", notesRouter);

app.listen(3000, () => {
	console.log("server started on port: 3000")
});