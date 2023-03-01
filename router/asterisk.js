const express = require('express');

const {getuser,getalluser}  = require('../Db/issabel')
/*
const {accion,getstate,getcurrentstatus}= require('../asterisk');
*/
const asterisk = express.Router();


asterisk.post('/getusers', async function(req, res) {
  const {users} = req.body

    let result= await getuser(users);
   
      res.json({'data' : JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)})
  });

  asterisk.get('/getalluser', async function(req, res) {
  
      let result= await getalluser();
     
        res.json({'data' : JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v)})
    });


  
module.exports = asterisk 

