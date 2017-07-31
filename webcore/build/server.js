require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export generateCode */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return createSalt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return createId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return passwordEncryption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return tokenGenerate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return tokenDecode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setTokenCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeTokenCookie; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_randomstring__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_randomstring___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_randomstring__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_crypto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__const__ = __webpack_require__(10);
/**
 * Created by hientran on 6/3/17.
 */







function generateCode(num) {
  return __WEBPACK_IMPORTED_MODULE_0_randomstring___default.a.generate(num);
}

function createSalt(){
  return generateCode(50);
}

function createId(){
  return generateCode(12);
}

function passwordEncryption(pass, salt) {
  const hash = __WEBPACK_IMPORTED_MODULE_1_crypto___default.a.createHash("sha256");
  let code = hash.update(pass) + salt;
  return hash.update(code).digest("hex");
}

function tokenGenerate(objData) {
  const expiresIn = __WEBPACK_IMPORTED_MODULE_3__config___default.a.jwt.expiresIn;
  objData.iss = __WEBPACK_IMPORTED_MODULE_3__config___default.a.jwt.issuer;
  objData.aud = objData.email;
  let token = __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default.a.sign(objData, __WEBPACK_IMPORTED_MODULE_3__config___default.a.jwt.secret, {
    expiresIn: expiresIn
  });
  return token;
}

function tokenDecode(token, objKey) {
  if(!objKey) objKey = {}
  objKey.issuer = __WEBPACK_IMPORTED_MODULE_3__config___default.a.jwt.issuer;
  console.log("objKey: ", objKey);
  return new Promise((resolve, reject) => {
    __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default.a.verify(token, __WEBPACK_IMPORTED_MODULE_3__config___default.a.jwt.secret, objKey, function (err, decoded) {
      console.log("decoded: ", decoded);
      if (err)
        resolve();
      else {
        resolve(decoded);
      }
    });
  });
}

function setCookie(res, key, value){
  res.cookie(key, value, {
    expires: __WEBPACK_IMPORTED_MODULE_3__config___default.a.cookie.expires,
    httpOnly: __WEBPACK_IMPORTED_MODULE_3__config___default.a.cookie.httpOnly
  });
}

function removeCookie(res, key) {
  res.cookie(key, "", {
    expires: new Date()
  });
}

function setTokenCookie(res, token) {
  setCookie(res, __WEBPACK_IMPORTED_MODULE_4__const__["a" /* default */].token, token);
}

function removeTokenCookie(res) {
  removeCookie(res, __WEBPACK_IMPORTED_MODULE_4__const__["a" /* default */].token);
}




/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

const port = 4000;
module.exports = {

  jwt: {
    secret: process.env.JWT_SECRET || 'findmotel.isolution.tech',
    expiresIn: 60 * 60 * 24 * 30,
    issuer: 'findmotel.isolution.tech'
  },

  cookie: {
    expires: new Date(Date.now() + 9999999),
    httpOnly: false
  },

  // Node.js app
  port: process.env.PORT || port,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || port}`,
  },

  analytics: {
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  database: {
    mongoose: {
      databaseURI : "mongodb://localhost:27017/ISolution-FindMotel",
      logging: false
    }
  }
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return systems; });
/**
 * Created by hien.tran on 6/9/2017.
 */

const systems = {
  unauthorized: {
    code: 401,
    msg: "Unauthorized!"
  },
  forbidden: {
    code: 403,
    msg: "Forbidden!"
  },
  notFound: {
    code: 404,
    msg: "Not Found!"
  },
  invalidToken: {
    code: 600,
    msg: 'Invalid Token!'
  },
  systemError: {
    code: 500,
    msg: "System Error!"
  }
}



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("oauth2orize");

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cookie_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cookie_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__common_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_passport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__routes__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes_api__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__passport_auth__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__passport_oauth__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_crypto__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_crypto__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__common_common_code__ = __webpack_require__(5);
/**
 * Created by hien.tran on 5/29/2017.
 */















let app = __WEBPACK_IMPORTED_MODULE_1_express___default()();

//random secret key when start server node
//config.jwt.secret = crypto.randomBytes(48).toString('hex');
app.use(__WEBPACK_IMPORTED_MODULE_2_cookie_parser___default()());
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.urlencoded({ extended: true }));
app.use(__WEBPACK_IMPORTED_MODULE_3_body_parser___default.a.json());

app.use(__WEBPACK_IMPORTED_MODULE_1_express___default.a.static(__WEBPACK_IMPORTED_MODULE_0_path___default.a.join(__dirname, 'public')));
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

app.use("/", __WEBPACK_IMPORTED_MODULE_6__routes__["a" /* default */]);

app.use(__WEBPACK_IMPORTED_MODULE_5_passport___default.a.initialize());
app.post('/oauth/token', __WEBPACK_IMPORTED_MODULE_9__passport_oauth__["a" /* default */].token);
app.all('/api/*', __WEBPACK_IMPORTED_MODULE_8__passport_auth__["a" /* default */]);
app.use("/api", __WEBPACK_IMPORTED_MODULE_7__routes_api__["a" /* default */]);

app.use(function (err, req, res, next) {
  switch(err.code){
    case 401:
      res.status(401).json(__WEBPACK_IMPORTED_MODULE_11__common_common_code__["a" /* systems */].unauthorized);
      break;
    case 403:
      res.status(403).json(__WEBPACK_IMPORTED_MODULE_11__common_common_code__["a" /* systems */].forbidden);
      break;
    default:
      res.status(err.status || 500).json(__WEBPACK_IMPORTED_MODULE_11__common_common_code__["a" /* systems */].systemError);
      break;
  }
});

app.use(function(req, res, next) {
  res.status(404).json(__WEBPACK_IMPORTED_MODULE_11__common_common_code__["a" /* systems */].notFound);
});

app.listen(__WEBPACK_IMPORTED_MODULE_4__common_config___default.a.port, () => {
  console.info(`The server is running at http://localhost:${__WEBPACK_IMPORTED_MODULE_4__common_config___default.a.port}/`);
});

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by hien.tran on 6/12/2017.
 */

const CONST = {
  token: 'token'
}

/* harmony default export */ __webpack_exports__["a"] = (CONST);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_common__ = __webpack_require__(0);
/**
 * Created by hien.tran on 6/2/2017.
 */




let Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

const User = new Schema({
  _id: {
    type: String,
    default: __WEBPACK_IMPORTED_MODULE_1__common_common__["f" /* createId */],
    index: true,
    unique: true
  },

  username:{
    type: String,
    unique: true,
  },

  password:{
    type: String,
    unique: true,
  },

  salt: {
    type: String,
    default: __WEBPACK_IMPORTED_MODULE_1__common_common__["g" /* createSalt */]
  },

  email: {
    type: String,
    unique: true,
    sparse: true,
    dropDups: true
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  accessToken: {
    type: String,
    default: ''
  },

  expirationDate: {
    type: Date,
    default: Date.now
  },

  isEnabled: {
    type: Boolean,
    default: true
  },

  logins: [{
    type: String,
    ref: 'UserLogin'
  }],

  profile: {
    type: String,
    ref: 'UserProfile'
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'User',
  schema: User
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_common__ = __webpack_require__(0);
/**
 * Created by hien.tran on 6/2/2017.
 */





let Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;

const UserLogin = new Schema({
  _id: {
    type: String,
    default: __WEBPACK_IMPORTED_MODULE_1__common_common__["f" /* createId */],
    index: true,
    unique: true
  },

  name:{
    type: String,
    unique: true,
  },

  key:{
    type: String,
    unique: true,
  },

  token:{
    type: String,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'UserLogin',
  schema: UserLogin
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_common__ = __webpack_require__(0);
/**
 * Created by hien.tran on 6/2/2017.
 */





let Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
const UserProfile = new Schema({
  _id: {
    type: String,
    default: __WEBPACK_IMPORTED_MODULE_1__common_common__["f" /* createId */],
    index: true,
    unique: true
  },

  displayName: {
    type: String,
    default: ""
  },

  picture: {
    type: String,
    default: ""
  },

  gender: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ''
  },

  phone: {
    type: String,
    default: ''
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'UserProfile',
  schema: UserProfile
});

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UserLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UserProfile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_config__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__common_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__User__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UserLogin__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__UserProfile__ = __webpack_require__(13);
/**
 * Created by hien.tran on 6/2/2017.
 */








//Config mongodb
let conn = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.createConnection(__WEBPACK_IMPORTED_MODULE_1__common_config___default.a.database.mongoose.databaseURI)
let Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Promise = Promise;
__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.set('debug', __WEBPACK_IMPORTED_MODULE_1__common_config___default.a.database.mongoose.logging);

const User = conn.model(__WEBPACK_IMPORTED_MODULE_2__User__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__User__["a" /* default */].schema);
const UserProfile = conn.model(__WEBPACK_IMPORTED_MODULE_4__UserProfile__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_4__UserProfile__["a" /* default */].schema);
const UserLogin = conn.model(__WEBPACK_IMPORTED_MODULE_3__UserLogin__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__UserLogin__["a" /* default */].schema);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_facebook__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_facebook___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport_facebook__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_common__ = __webpack_require__(0);
/**
 * Created by hien.tran on 6/2/2017.
 */







__WEBPACK_IMPORTED_MODULE_0_passport___default.a.use(new __WEBPACK_IMPORTED_MODULE_1_passport_facebook__["Strategy"]({
  clientID: __WEBPACK_IMPORTED_MODULE_2__config___default.a.auth.facebook.clientID,
  clientSecret: __WEBPACK_IMPORTED_MODULE_2__config___default.a.auth.facebook.clientSecret,
  callbackURL: __WEBPACK_IMPORTED_MODULE_2__config___default.a.auth.facebook.callbackURL,
  profileFields: ['displayName', 'name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, next) => {
  const loginName = 'facebook';
  const claimType = 'urn:facebook:access_token';
  const fooBar = async () => {
    if (req.user) {
      next(null, {id: '123', email: 'Hien Tran',});
    } else {
      let user = await __WEBPACK_IMPORTED_MODULE_3__models__["a" /* User */]
        .findOne({
          'email': profile._json.email
        })
        .populate('profile')
        .populate({
          path: 'logins',
          match: {'name': loginName, 'key': profile.id}
        });

      if (user) {
        let userLogin = user.logins.length == 0 ? new __WEBPACK_IMPORTED_MODULE_3__models__["b" /* UserLogin */]() : user.logins[0];
        userLogin.name = loginName;
        userLogin.key = profile.id;
        userLogin.token = accessToken;
        userLogin = await userLogin.save();

        let userProfile = user.profile ? user.profile : new __WEBPACK_IMPORTED_MODULE_3__models__["c" /* UserProfile */]();
        userProfile.displayName = profile.displayName;
        userProfile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
        userProfile.gender = profile._json.gender;
        userProfile.location = profile.location;
        userProfile = await userProfile.save();

        if(user.logins.length == 0)
          user.logins.push(userLogin);

        if(!user.profile)
          user.profile = userProfile;

        user = await user.save();
        next(null, user);

      } else {
        user = new __WEBPACK_IMPORTED_MODULE_3__models__["a" /* User */]();
        //create login with facebook
        let userLogin = new __WEBPACK_IMPORTED_MODULE_3__models__["b" /* UserLogin */]({
          name: loginName,
          key: profile.id,
          token: accessToken
        });
        userLogin = await userLogin.save();

        //create user profile
        let userProfile = await new __WEBPACK_IMPORTED_MODULE_3__models__["c" /* UserProfile */]({
          displayName: profile.displayName,
          picture: `https://graph.facebook.com/${profile.id}/picture?type=large`,
          gender: profile._json.gender,
          location: profile.location
        });
        userProfile = await userProfile.save();

        //main account
        user.username = "admin";
        user.password = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_common__["e" /* passwordEncryption */])("123456", user.salt);
        user.email = profile._json.email;
        user.logins.push(userLogin);
        user.profile = userProfile;
        user = await user.save();
        next(null, user);
      }
    }
  };
  fooBar().catch(next);
}));

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_passport___default.a);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport_http_bearer__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_passport_http_bearer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_passport_http_bearer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_oauth2orize__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_oauth2orize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_oauth2orize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_passport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_common_code__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_common__ = __webpack_require__(0);
/**
 * Created by hien.tran on 6/2/2017.
 */








let BearerStrategy = __WEBPACK_IMPORTED_MODULE_0_passport_http_bearer___default.a.Strategy;
let TokenError = __WEBPACK_IMPORTED_MODULE_1_oauth2orize___default.a.TokenError;


__WEBPACK_IMPORTED_MODULE_2_passport___default.a.use("bearer", new BearerStrategy(
  function (accessToken, next) {
    let promise = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__common_common__["a" /* tokenDecode */])(accessToken);
    promise.then(result => {
      if(result)
        return next(null, result);
      else
        return next(new Error('token error'));
    })
  }
));

const validateToken = function(req, res, next) {
  __WEBPACK_IMPORTED_MODULE_2_passport___default.a.authenticate('bearer', {session: false}, function (err, user, info) {
    if (err || !user)
      return res.json(__WEBPACK_IMPORTED_MODULE_3__common_common_code__["a" /* systems */].invalidToken)
    else {
      return next();
    }
  })(req, res, next)
}

/* harmony default export */ __webpack_exports__["a"] = (validateToken);



/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * Created by hien.tran on 6/2/2017.
 */


module.exports = {
  // Authentication
  auth: {
    facebook: {
      clientID: process.env.FACEBOOK_APP_ID || '2006619856232997',
      clientSecret: process.env.FACEBOOK_APP_SECRET || '2466ea45b5f5d3d1b2227758c08f0922',
      callbackURL: '/auth/facebook/callback'
    },

    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
    },

    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
    },
  },
};


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_oauth2orize__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_oauth2orize___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_oauth2orize__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport__);
/**
 * Created by hien.tran on 6/2/2017.
 */





let server = __WEBPACK_IMPORTED_MODULE_0_oauth2orize___default.a.createServer();


/* harmony default export */ __webpack_exports__["a"] = ({
  token: [server.token(), server.errorHandler()]
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_route__ = __webpack_require__(20);
/**
 * Created by hien.tran on 6/2/2017.
 */




let router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.use("/user", __WEBPACK_IMPORTED_MODULE_1__user_route__["a" /* default */]);
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/**
 * Created by hien.tran on 6/2/2017.
 */



let router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.get('/', (req, res) => {
  //res.clearCookie('id_token');
  res.json({rs: "ok"});
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__passport_auth_facebook__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_common__ = __webpack_require__(0);
/**
 * Created by hien.tran on 6/2/2017.
 */







let router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router();

router.get('/status', (req, res) => {
  var cookies = req.cookies;
  console.log("cookie: ", cookies.token);
  res.json({status: "server runing"});
});

router.post('/user', (req, res) => {
  res.json({status: "create user"});
});

router.get('/auth/facebook',
  __WEBPACK_IMPORTED_MODULE_1__passport_auth_facebook__["a" /* default */].authenticate('facebook', { scope: ['email', 'user_location'], session: false })
);

router.get('/auth/facebook/callback',
  __WEBPACK_IMPORTED_MODULE_1__passport_auth_facebook__["a" /* default */].authenticate('facebook', {session: false }),
  (req, res) => {
    if (req.user) {
      let user = {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
      }
      let token = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common__["b" /* tokenGenerate */])(user);
      user['profile'] = req.user.profile;
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common__["c" /* setTokenCookie */])(res, token);
      res.json({
        token: token,
        user: user
      });
    }
    else {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common_common__["d" /* removeTokenCookie */])(res);
      res.json({
        token: "",
        user: null
      });
    }
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("passport-http-bearer");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("randomstring");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(9);
module.exports = __webpack_require__(8);


/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map