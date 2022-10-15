const router = require('express').Router();
const { readAndAppend, readFromFile, readAndRemove } = require('../helpers/fsUtilities');
const { v4: uuidv4 } = require('uuid');

// GET Route for retrieving all the notes
router.get('/', (req, res) => {
    let data = readFromFile('./db/db.json')
    
    res.json(data)
}
);

// POST Route for submitting feedback
router.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const note = req.body;

  // If all the required properties are present
  if (note) {
    // Variable for the object we will save
    const newNotes = {
      note: note,
      id: uuidv4(),
    };

    readAndAppend('./db/db.json', newNotes);

    const response = {
      status: 'success',
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json('Error in posting notes');
  }
});

router.delete('/*', (req, res) => {
    const id = req.query.id;
    
    readAndRemove('./db/db.json', id);

    const response = {
        status: 'success'
    };

    res.json(response);
})

module.exports = router;
