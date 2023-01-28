const ami = new require('asterisk-manager')('5038','127.0.0.1','sencom','31994', true);

ami.keepConnected();

function accion(scr,dst,type){
    ami.action({
        'action':'originate',
        'channel':scr,
        'context':'app-chanspy',
        'exten':555,
        'priority':1,
        'callerid' : 'Chanspy <555>',
        'variable':{
            'dst': `${dst}`,
            'type': type
            
          }
        
      }, function(err, res) {});

}

function getstate(ext){
    return new Promise((resolve, reject) => {
        ami.action({
            'action':'ExtensionState',
            'context':'from-internal',
            'exten':ext,
            'actionid':2223
          }, function(err, res) {
            resolve(res);
          });

    })
  

}


module.exports = {ami,accion,getstate}


