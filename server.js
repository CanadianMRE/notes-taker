const express = require('express');
const path = require('path');
const app = express();
const {reqLog} = require('./middleware/reqLog')
const api = require('./routes/api.js');

const PORT = process.env.PORT || 3001;

// Middleware for logging requests
app.use(reqLog)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api)

app.use(express.static('./public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);