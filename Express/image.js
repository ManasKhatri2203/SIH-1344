const express = require('express');
const path = require('path');
const multer = require('multer');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express();
const port = 80;

// Set up static file serving
app.use("/static", express.static('static'));

// Use express-fileupload middleware
app.use(fileUpload());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Define the route for rendering the form
app.get('/', (req, res) => {
    const con = "This is a random text jada na padhe";
    const params = { 'title': 'This is pug, doggie nhi h', "content": con };
    res.status(200).render('image.pug', params);
});

// Define the route for handling the image upload
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // Get the uploaded image
    const uploadedFile = req.files.image;

    const uploadDirectory = path.join(__dirname, 'uploaded_images');

    // Delete existing files 
    fs.readdirSync(uploadDirectory).forEach((file) => {
        const filePath = path.join(uploadDirectory, file);
        fs.unlinkSync(filePath);
        console.log(`Deleted existing file: ${filePath}`);
    });

    // fixed name for the uploaded image
    const fixedFileName = 'uploaded_image.jpg';

    uploadedFile.mv(path.join(uploadDirectory, fixedFileName), (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        // File has been uploaded and moved.
        console.log(`File saved to: ${path.join(uploadDirectory, fixedFileName)}`);
        res.send("File uploaded and saved successfully!");
    });
});

// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
