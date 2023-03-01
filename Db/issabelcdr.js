const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'localhost', 
     user: 'root', 
     password: 'root',
     database : 'asteriskcdrdb',
     dateStrings: true,
 
     
});


async function incoming(extensions,filter){
    let  conn;
    try{
   conn = await pool.getConnection();

   let filters = `='${filter}'`;

   if (filter == 'ALL') {
       filters='<>\'\'';
   }
   



   query =`SELECT substring(dstchannel,1,locate('-',dstchannel,1)-1) AS chan1,substring(channel,1,locate('-',channel,1)-1) AS chan2,billsec,duration,duration-billsec as ringtime,src, IF(dst='s',dcontext,dst) as dst,calldate,disposition,accountcode,recordingfile,uniqueid FROM cdr WHERE substring(dstchannel,1,locate('-',dstchannel,1)-1)<>'' AND calldate BETWEEN '2023-02-09 00:00:00' AND  '2023-02-12 23:59:59' AND (duration-billsec) >=0 AND disposition${filters} HAVING chan1 IN (${extensions}) ORDER BY chan1,calldate`
    return  await conn.query(query);
    
  } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  
}

module.exports = {incoming}