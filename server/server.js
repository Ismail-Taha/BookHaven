const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const server = jsonServer.create();
const router = jsonServer.router('../Data/DB.json');
const middlewares = jsonServer.defaults();

const upload = multer({ dest: 'uploads/' });

server.use(middlewares);
server.use(jsonServer.bodyParser); // Ensures the server can handle POST requests body data

// Middleware to hash passwords on POST to /users endpoint
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/users') {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10); // Hash the password before saving
    }
  }
  next(); // Pass the request to the next middleware or json-server itself
});

// Endpoint to handle file uploads
server.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }
  const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.send({ url: fileUrl });
});

// Serve uploaded files
server.use('/uploads', jsonServer.static(path.join(__dirname, 'uploads')));

// Serve PDF files
server.use('/pdfs', jsonServer.static(path.join(__dirname, '../pdfs')));

// Ensure correct Content-Type for JSON responses
server.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

server.use(router); // Use the default router
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
