#!/bin/bash
#Script Develop for Ing.Kenny Ortiz

curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash - #  se descarga el repositorion node 16
yum install -y nodejs # se instala node 


# se agrega el contexto Chanspy
cat << EOF >> /etc/asterisk/extensions_override_issabelpbx.conf  


