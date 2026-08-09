
const ratelimit = require("../config/upstash.js");


const rateLimiter = async (req, res, next) => {
	try{
		const { success } = await ratelimit.limit("my-ratelimit-key");

		if(!success) {
			res.status(429).json({message: "Too may requests, try again later"});
		}

		next()

	}catch(error){
		console.error("error in rateLimiter: ", error);
		next(error);
	}
}


module.exports = rateLimiter;
