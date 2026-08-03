
const dns = require('node:dns');
const connectDB = require("./config/db.js");
const notesRouter = require("./routes/notes.js");
const dotenv = require("dotenv");
const express = require("express");

const app = express();
app.use("/api/notes", notesRouter);

dotenv.config();
const PORT = process.env.PORT || 3000;

dns.setServers(['1.1.1.1', '8.8.8.8']);

connectDB().then( () => {
	app.listen(PORT, () => {
		console.log("server started on port: ", PORT);
	})
})
