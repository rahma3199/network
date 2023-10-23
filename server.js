const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  }
});

// Initialize upload
const upload = multer({ storage: storage });

app.use(express.static(__dirname)); // Serve your HTML file

app.post('/upload', upload.single('sampleFile'), (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: 'No file uploaded.' });
  }
  
  // Normally, here is where you'd do processing on the uploaded file if necessary.
  // But for simplicity, we'll just send a success response.

  res.json({ success: true, message: 'File uploaded successfully.' });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
