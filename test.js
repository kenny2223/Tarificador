const fs = require('fs');
  
// Calling the readFileSync() method
// to read 'input.txt' file
const data = fs.readFileSync('/etc/amportal.conf',{encoding:'utf8', flag:'r'}).split(/[\n\r]+/g).filter((k) => k.indexOf('#'));

let credenciales = [];
data.forEach(e => {
    let d = e.split('=');
    credenciales[d[0]] = d[1]

    
});

module.exports = credenciales;

