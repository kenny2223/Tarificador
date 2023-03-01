const express = require('express');
const {incoming}  = require('../Db/issabelcdr')
const {getuser}  = require('../Db/issabel')

/*
const {accion,getstate,getcurrentstatus}= require('../asterisk');
*/
const cdr = express.Router();

cdr.post('/incoming', async function(req, res) {
  const {extensions,filter } = req.body
    let result= await incoming(extensions,filter);
    let extensiones= await getuser(extensions);

    let exts=[]
result.forEach((e,i) => {
if (i==0) {
    newexten(exts,e,extensiones)
   return
}

let search=exts.findIndex(i => i[0].channel == e.chan1)

if (search != -1) {
    exts[search][0].c++
    e.disposition =='ANSWERED'? exts[search][0].complete++ : exts[search][0].loss++
    exts[search][0].duration +=e.duration
    exts[search][0].ringtime +=Number(e.ringtime)
    exts[search][0].billsec+=e.billsec

    exts[search][1].push(e)
}else { 
    newexten(exts,e,extensiones)
}

});


      res.json({'data' : JSON.stringify(exts, (_, v) => typeof v === 'bigint' ? v.toString() : v)})
  });






  /// funtion tools///////////
  function newexten(exts,e,extensiones){

    let extension=extensiones[extensiones.findIndex(i => i.dial == e.chan1)];

    let complete=0
    let loss=0
      e.disposition =='ANSWERED'? complete++ : loss++
       exts.push([{channel:e.chan1,username:extension.user+' '+ extension.description,c:1,complete:complete,loss:loss,duration:e.duration,ringtime:Number(e.ringtime),billsec:e.billsec},[e]]);
}
  


module.exports = cdr

