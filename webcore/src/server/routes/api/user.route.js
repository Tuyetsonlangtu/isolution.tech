/**
 * Created by hien.tran on 6/2/2017.
 */

"use strict";
import express from 'express';
let router = express.Router();

router.get('/', (req, res) => {
  //res.clearCookie('id_token');
  res.json({rs: "ok"});
});

export default router;