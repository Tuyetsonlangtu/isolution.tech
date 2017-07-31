/**
 * Created by hien.tran on 6/2/2017.
 */

"use strict";
import mongoose from 'mongoose';
import config from '../common/config';
import user from './User';
import userLogin from './UserLogin';
import userProfile from './UserProfile';

//Config mongodb
let conn = mongoose.createConnection(config.database.mongoose.databaseURI)
let Schema = mongoose.Schema;
mongoose.Promise = Promise;
mongoose.set('debug', config.database.mongoose.logging);

const User = conn.model(user.name, user.schema);
const UserProfile = conn.model(userProfile.name, userProfile.schema);
const UserLogin = conn.model(userLogin.name, userLogin.schema);
export { UserLogin, User , UserProfile}