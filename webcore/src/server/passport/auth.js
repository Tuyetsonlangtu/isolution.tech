/**
 * Created by hien.tran on 6/2/2017.
 */

"use strict";
import passportHttpBearer from 'passport-http-bearer';
import oauth2orize from 'oauth2orize';
import passport from 'passport';
import {systems} from '../../common/common-code';
import {tokenDecode} from '../../common/common';

let BearerStrategy = passportHttpBearer.Strategy;
let TokenError = oauth2orize.TokenError;


passport.use("bearer", new BearerStrategy(
  function (accessToken, next) {
    let promise = tokenDecode(accessToken);
    promise.then(result => {
      if(result)
        return next(null, result);
      else
        return next(new Error('token error'));
    })
  }
));

const validateToken = function(req, res, next) {
  passport.authenticate('bearer', {session: false}, function (err, user, info) {
    if (err || !user)
      return res.json(systems.invalidToken)
    else {
      return next();
    }
  })(req, res, next)
}

export default validateToken;

