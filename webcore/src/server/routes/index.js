/**
 * Created by hien.tran on 6/2/2017.
 */

"use strict";

import express from 'express';
import fbPassport from '../passport/auth.facebook';
import {tokenGenerate, setTokenCookie, removeTokenCookie} from '../../common/common';

let router = express.Router();

router.get('/status', (req, res) => {
  var cookies = req.cookies;
  console.log("cookie: ", cookies.token);
  res.json({status: "server runing"});
});

router.post('/user', (req, res) => {
  res.json({status: "create user"});
});

router.get('/auth/facebook',
  fbPassport.authenticate('facebook', { scope: ['email', 'user_location'], session: false })
);

router.get('/auth/facebook/callback',
  fbPassport.authenticate('facebook', {session: false }),
  (req, res) => {
    if (req.user) {
      let user = {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email
      }
      let token = tokenGenerate(user);
      user['profile'] = req.user.profile;
      setTokenCookie(res, token);
      res.json({
        token: token,
        user: user
      });
    }
    else {
      removeTokenCookie(res);
      res.json({
        token: "",
        user: null
      });
    }
});

export default router;