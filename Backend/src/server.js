
const dns = require('node:dns');
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const rateLimiter = require("./middleware/rateLimiter.js");
const connectDB = require("./config/db.js");
const notesRouter = require("./routes/notes.js");

const app = express();

app.use(
	cors({origin: "http://localhost:5173"})
);
app.use(express.json()); //parse json body
app.use(rateLimiter);

app.use("/api/notes", notesRouter);

dns.setServers(['1.1.1.1', '8.8.8.8']);
const PORT = process.env.PORT || 3000;

connectDB().then( () => {
	app.listen(PORT, () => {
		console.log("server started on port: ", PORT);
	});
});
