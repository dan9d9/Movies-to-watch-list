const router = require('express').Router();
const Movie = require('../models/Movie');


// GET ALL MOVIES
router.get('/', async (req, res) => {
	try{
		const movies = await Movie.find();
		res.json(movies);
	}catch(err) {
		res.json({message: err});
	}
});


// GET ONE MOVIE
router.get('/:movieId', async (req, res) => {
	const { movieId } = req.params;
	try {
		const oneMovie = await Movie.findById(movieId);
		res.json(oneMovie);
	}catch(err) {
		res.json({message: err});
	}
});


// ADD NEW MOVIE
router.post('/new', async (req, res) => {
	const { title, array, approved } = req.body;
	if(!title) {return res.status(400).json({message: 'Missing title'})}

	const movie = new Movie({
		title,
		array,
		approved
	});

	try {
		const savedMovie = await movie.save();
		res.json(savedMovie);
	} catch(err) {
		res.json({message: err});
	}
});


// DELETE ONE MOVIE
router.delete('/:movieId', async (req, res) => {
    const { movieId } = req.params;
    try{
      const deleted = await Movie.deleteOne({_id: movieId});
      res.json(deleted);
    }
    catch(err){
      res.json({message: err})
    } 
});

// APPROVE MOVIE
router.patch('/:movieId', async(req, res) => {
	const { movieId } = req.params;
	try{
      const toUpdate = await Movie.findById({_id: movieId});
      toUpdate.approved = !toUpdate.approved;
      const updated = await toUpdate.save();

      res.json(updated);
    }
    catch(err){
      res.json({message: err})
    }
})


module.exports = router;