const express = require('express')
const path = require ('path')
const app = express()
const mediaFileRoutes = require('./routes/image_reader')
const jsonFileRoutes = require('./routes/json_reader')

app.use(mediaFileRoutes)
app.use(jsonFileRoutes)
app.use('/homepage',express.static(path.join(__dirname, 'homepage')));
app.use('/upload_image',express.static(path.join(__dirname, 'upload_image')));
app.use('/assets',express.static(path.join(__dirname, 'assets')));
app.use('/media-files',express.static(path.join(__dirname, 'media-files')));
app.use('/text-resources',express.static(path.join(__dirname, 'text-resources')));

app.get('/', (req, res) => {
	res.redirect('/homepage');
});

app.get('/homepage', (req, res) => {
	res.sendFile(path.join(__dirname, 'homepage','homepage.html'));
});


const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
