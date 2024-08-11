const express = require('express');

const { validateUser } = require('./database');

const router = express.Router();

router.post("/login",express.json(), async(req,res,next)=>{
    const request = req.body;
    const loginCheck = await validateUser(request.mail, request.password);
    return loginCheck;
})


router.post("/register",express.json(), async(req,res,next)=>{
    const request = req.body;
    const loginCheck = await validateUser(request.mail, request.password);
    return loginCheck;
})