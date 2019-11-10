
import * as express from 'express';
import { Application } from 'express';
import * as fs from 'fs';
import * as https from 'https';
import { readAllLessons } from './read-all-lessons.route';
import * as expressJwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';

const bodyParser = require('body-parser');
const commandLineArgs = require('command-line-args');

const app: Application = express();
const checkIfAuthenticated = expressJwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true, // protection against attacker having control of jwksUri and rotating keys every second and blocking our authentication
    jwksUri: 'https://dev-asc01.eu.auth0.com/.well-known/jwks.json'
  }),
  algorithms: ['RS256'],

});

app.use(bodyParser.json());
app.use(checkIfAuthenticated);

app.use((error, request, response, next) => {

  // error.name from express-jwt library documentation
  if (error && error.name === 'UnauthorizedError') {
    response.status(error.status).json({message: error.message});
  } else {
    next();
  }

});

const optionDefinitions = [
  { name: 'secure', type: Boolean, defaultOption: false },
];

const options = commandLineArgs(optionDefinitions);

// REST API
app.route('/api/lessons')
  .get(readAllLessons);

if (options.secure) {
  const httpsServer = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  }, app);

  // launch an HTTPS Server. Note: this does NOT mean that the application is secure
  httpsServer.listen(9000, () => console.log('HTTPS Secure Server running at https://localhost:' + httpsServer.address().port));

} else {
  // launch an HTTP Server
  const httpServer = app.listen(9000, () => {
    console.log('HTTP Server running at https://localhost:' + httpServer.address().port);
  });
}

