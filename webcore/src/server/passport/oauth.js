/**
 * Created by hien.tran on 6/2/2017.
 */

"use strict";
import oauth2orize from 'oauth2orize';
import passport from 'passport';

let server = oauth2orize.createServer();


export default {
  token: [server.token(), server.errorHandler()]
};