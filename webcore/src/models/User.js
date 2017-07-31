/**
 * Created by hien.tran on 6/2/2017.
 */

"use strict";
import mongoose from 'mongoose';
import { createSalt, createId } from '../common/common';
let Schema = mongoose.Schema;

const User = new Schema({
  _id: {
    type: String,
    default: createId,
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
    default: createSalt
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

export default {
  name: 'User',
  schema: User
}