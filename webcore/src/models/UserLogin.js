/**
 * Created by hien.tran on 6/2/2017.
 */

"use strict";
import mongoose from 'mongoose';
import { createId } from '../common/common';

let Schema = mongoose.Schema;

const UserLogin = new Schema({
  _id: {
    type: String,
    default: createId,
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

export default {
  name: 'UserLogin',
  schema: UserLogin
}