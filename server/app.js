const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3000;

const upload = multer({
    // dest: __dirname + '/uploads/'
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, __dirname + '/uploads/');
        },
        filename(req, file, callback) {
            callback(null, Date.now() + file.originalname);
        }
    })
})


app.get('/', (req, res) => res.send('Hello'));
app.use('/images', cors(), (req, res, next) => {
    console.log('get /images');
    next();
}, express.static('uploads'));

app.post('/upload', cors(), upload.single('img'), (req, res) => {
    console.log('app.post /upload')
    const file = req.file;
    console.log(file)

    const result = {
        originalName: file.originalname,
        filename: file.filename,
        size: file.size,
        url: `http://localhost:3000/images/${file.filename}`
    }

    res.json(result);
})

app.listen(port, () => {
    console.log('app running');
})