const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const server = jsonServer.create();
const router = jsonServer.router('../Data/DB.json');
const middlewares = jsonServer.defaults();

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

server.use(router); // Use the default router
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
