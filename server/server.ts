import * as express from 'express';
import { Application } from 'express';
import * as _ from 'lodash';
import { checkIfAuthenticated } from './authentication.middleware';
import { checkIfAuthorized } from './authorization.middleware';
import { createUser } from './create-user.route';
import { retrieveUserIdFromRequest } from './get-user.middleware';
import { loginAsUser } from './login-as-user.route';
import { readAllLessons } from './read-all-lessons.route';
import { getUser } from './get-user.route';

const app: Application = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const commandLineArgs = require('command-line-args');

app.use(cookieParser());
app.use(retrieveUserIdFromRequest);
app.use(bodyParser.json());

const optionDefinitions = [
  {
    name: 'secure',
    type: Boolean,
    defaultOption: true
  }
];

const options = commandLineArgs(optionDefinitions);

// REST API
app.route('/api/lessons')
  .get(checkIfAuthenticated, _.partial(checkIfAuthorized, ['STUDENT']), readAllLessons);

app.route('/api/admin')
  .post(checkIfAuthenticated, _.partial(checkIfAuthorized, ['ADMIN']), loginAsUser);

app.route('/api/signup').post(createUser);

app.route('/api/user').get(getUser);

app.route('/api/logout')
  .post(checkIfAuthenticated, checkCsrfToken, logout);

app.route('/api/login')
  .post(login);



// import * as fs from 'fs';
// import * as https from 'https';
// import {createUser} from "./create-user.route";
// import {getUser} from "./get-user.route";
// import {logout} from "./logout.route";
// import {login} from "./login.route";
// import {retrieveUserIdFromRequest} from "./get-user.middleware";
// import {checkCsrfToken} from "./csrf.middleware";
// import * as _ from 'lodash';
// import {loginAsUser} from "./login-as-user.route";

// app.route('/api/user')
//     .get(getUser);

// app.route('/api/logout')
//     .post(checkIfAuthenticated, checkCsrfToken, logout);

// app.route('/api/login')
//     .post(login);


// if (options.secure) {

//     const httpsServer = https.createServer({
//         key: fs.readFileSync('key.pem'),
//         cert: fs.readFileSync('cert.pem')
//     }, app);

//     // launch an HTTPS Server. Note: this does NOT mean that the application is secure
//     httpsServer.listen(9000, () => console.log("HTTPS Secure Server running at https://localhost:" + httpsServer.address().port));

// }
// else {

//     // launch an HTTP Server
//     const httpServer = app.listen(9000, () => {
//         console.log("HTTP Server running at https://localhost:" + httpServer.address().port);
//     });

// }
