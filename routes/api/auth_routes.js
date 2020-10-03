"use strict";

const express = require("express"),
      controller = require("../../controllers/auth-controller"),
      router = express.Router();


router
    .post("/login",controller.login)
    .post("/logout",controller.logout)
    .post("/signin",controller.add)
    

module.exports = router;