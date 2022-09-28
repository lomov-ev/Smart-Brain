const Clarifai = require("clarifai");

//api key as env var on deployment server
const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAIKEY
});


//Call AI with picture from frontend input and returning predictions
const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json("unable to work with API"));
}

//Incerement entries by 1 in a database when user adds a new picture
const incrementEntries = (db) => (req, res) => {
	const {id} = req.body;
	db("users").where("id", "=", id).increment("entries", 1)
		.returning("entries")
		.then(entries => res.json(entries[0].entries))
		.catch(err => res.status(400).json("unable to get counts"))
}

//Export functions
module.exports = {
	incrementEntries,
	handleApiCall
}