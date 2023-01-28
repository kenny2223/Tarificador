const express = require('express');
const {getusers}  = require('../Db/issabel')
const {accion,getstate}= require('../asterisk');

const ChanSpy = express.Router();

console.log("ok");


ChanSpy.get('/GetExtension', async function(req, res) {
    
    let result= await getusers();
      res.json({"Db": result});
   
  });

  ChanSpy.post('/Spy', async function(req, res) {
    const {Extension,supervisor,type } = req.body
    
      accion(`SIP/${supervisor}`,`SIP/${Extension}`,type)

    //from-internal


      res.json({"ok": "kenny"});
   
  });

  ChanSpy.post('/getstatus', async function(req, res) {
    const {Extension} = req.body

  
   const exten= await getstate(Extension)
  
      res.json({"exten": exten});
   
  });


  
module.exports = ChanSpy

