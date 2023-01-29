#!/bin/bash
#Script Develop for Ing.Kenny Ortiz

curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash - #  se descarga el repositorion node 16
yum install -y nodejs # se instala node 


# se agrega el contexto Chanspy
cat << EOF >> /etc/asterisk/extensions_override_issabelpbx.conf  

[app-chanspy]
include => app-chanspy-custom
exten => 555,1,NoOp(ChanSpy)
same => n,Authenticate(1234) 
same => n,ChanSpy(${dst},qs${type})
; end of [app-chanspy]
EOF

#se crea credenciales para ami 
cat << EOF >> /etc/asterisk/manager_custom.conf

[sencom]
secret = 31994
deny=0.0.0.0/0.0.0.0
permit=127.0.0.1/255.255.255.0
read = system,call,log,verbose,command,agent,user,config,dtmf,reporting,cdr,dialplan
write = system,call,log,verbose,command,agent,user,config,command,reporting,originate
EOF


asterisk -rx 'core restart now'

mkdir /usr/local/Chanspy


tar xzvf Chanspy.tar.gz
cp -r ./Chanspy/* /usr/local/Chanspy

rm -f  Chanspy.tar.gz
rm -f  ChanSpy


cd /usr/local/Chanspy

npm i --only=prod 

node app.js

#se finaliza la instalacion



