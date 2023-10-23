const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: './uploads', // Specify the destination folder for uploaded images.
    filename: function (req, file, callback) {
        // Generate a unique filename for the uploaded image.
        callback(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Serve your HTML page.
app.use(express.static(__dirname + '/public'));

// Handle POST requests for image uploads.
app.post('/upload', upload.single('image'), (req, res) => {
    // Check if the file was successfully uploaded.
    if (!req.file) {
        return res.json({ success: false });
    }

    // If the file was uploaded successfully, send a success response.
    res.json({ success: true });
});

// Start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
