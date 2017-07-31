/**
 * Created by hientran on 6/3/17.
 */

import randomString from 'randomstring';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from './config';
import CONST from './const';

function generateCode(num) {
  return randomString.generate(num);
}

function createSalt(){
  return generateCode(50);
}

function createId(){
  return generateCode(12);
}

function passwordEncryption(pass, salt) {
  const hash = crypto.createHash("sha256");
  let code = hash.update(pass) + salt;
  return hash.update(code).digest("hex");
}

function tokenGenerate(objData) {
  const expiresIn = config.jwt.expiresIn;
  objData.iss = config.jwt.issuer;
  objData.aud = objData.email;
  let token = jwt.sign(objData, config.jwt.secret, {
    expiresIn: expiresIn
  });
  return token;
}

function tokenDecode(token, objKey) {
  if(!objKey) objKey = {}
  objKey.issuer = config.jwt.issuer;
  console.log("objKey: ", objKey);
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, objKey, function (err, decoded) {
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
    expires: config.cookie.expires,
    httpOnly: config.cookie.httpOnly
  });
}

function removeCookie(res, key) {
  res.cookie(key, "", {
    expires: new Date()
  });
}

function setTokenCookie(res, token) {
  setCookie(res, CONST.token, token);
}

function removeTokenCookie(res) {
  removeCookie(res, CONST.token);
}


export {
  generateCode,
  createSalt,
  createId,
  passwordEncryption,
  tokenGenerate,
  tokenDecode,
  setTokenCookie,
  removeTokenCookie
}