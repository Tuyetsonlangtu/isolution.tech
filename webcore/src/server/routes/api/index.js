/**
 * Created by hien.tran on 6/2/2017.
 */

"use strict";
import express from 'express';
import userRoute from './user.route';
let router = express.Router();

router.use("/user", userRoute);
export default router;