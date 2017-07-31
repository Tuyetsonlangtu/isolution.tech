/**
 * Created by hien.tran on 5/29/2017.
 */

"use strict";
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import config from '../common/config';
import passport from 'passport';
import publicApi from './routes';
import privateApi from './routes/api';
import validateToken from './passport/auth';
import oauth from './passport/oauth';
import crypto from 'crypto';
import {systems} from '../common/common-code';

let app = express();

//random secret key when start server node
//config.jwt.secret = crypto.randomBytes(48).toString('hex');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.use("/", publicApi);

app.use(passport.initialize());
app.post('/oauth/token', oauth.token);
app.all('/api/*', validateToken);
app.use("/api", privateApi);

app.use(function (err, req, res, next) {
  switch(err.code){
    case 401:
      res.status(401).json(systems.unauthorized);
      break;
    case 403:
      res.status(403).json(systems.forbidden);
      break;
    default:
      res.status(err.status || 500).json(systems.systemError);
      break;
  }
});

app.use(function(req, res, next) {
  res.status(404).json(systems.notFound);
});

app.listen(config.port, () => {
  console.info(`The server is running at http://localhost:${config.port}/`);
});