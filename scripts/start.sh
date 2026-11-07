#!/bin/bash
cd /home/ec2-user/app
BUCKET="${BUCKET:-mercadoandino-uploads-demo}" PORT=80 nohup node server.js > /var/log/mercadoandino.log 2>&1 &
