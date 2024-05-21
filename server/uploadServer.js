const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());
app.use('/pdfs', express.static(path.join(__dirname, '../public/pdfs')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/pdfs'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/pdfBooks', (req, res) => {
  fs.readFile(path.join(__dirname, '../Data/DB.json'), (err, data) => {
    if (err) {
      res.status(500).send('Error reading database');
      return;
    }
    const db = JSON.parse(data);
    res.json(db.pdfBooks);
  });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  const { title } = req.body;
  const newBook = {
    id: Date.now(),
    title: title,
    filePath: req.file.filename
  };

  fs.readFile(path.join(__dirname, '../Data/DB.json'), (err, data) => {
    if (err) {
      res.status(500).send('Error reading database');
      return;
    }
    const db = JSON.parse(data);
    db.pdfBooks.push(newBook);
    fs.writeFile(path.join(__dirname, '../Data/DB.json'), JSON.stringify(db, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error writing database');
        return;
      }
      res.json(newBook);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
