/**
 * Created by hien.tran on 6/2/2017.
 */

"use strict";
import mongoose from 'mongoose';
import { createId } from '../common/common';

let Schema = mongoose.Schema;
const UserProfile = new Schema({
  _id: {
    type: String,
    default: createId,
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

export default {
  name: 'UserProfile',
  schema: UserProfile
}