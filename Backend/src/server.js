
const rateLimiter = require("./middleware/rateLimiter.js");
const connectDB = require("./config/db.js");
const notesRouter = require("./routes/notes.js");

const dns = require('node:dns');
const dotenv = require("dotenv");
const express = require("express");

const app = express();
app.use(express.json()); //parse json body
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

dotenv.config();
const PORT = process.env.PORT || 3000;

dns.setServers(['1.1.1.1', '8.8.8.8']);

connectDB().then( () => {
	app.listen(PORT, () => {
		console.log("server started on port: ", PORT);
	});
});
