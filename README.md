tail -f  /var/log/syslog

npm i -g service-systemd
sudo service-systemd --add --service kobolde-backend --cwd /root/git/kobolde/kobolde-backend --app server.js
sudo service kobolde-backend start
sudo service kobolde-backend status
sudo service kobolde-backend stop


sudo service-systemd --add --service kobolde-frontend --cwd /root/git/kobolde/kobolde-frontend-localstorage

nano /etc/systemd/system/kobolde-frontend.service
update ExecStart as:
ExecStart=/usr/bin/npm start

save and run ---> systemctl daemon-reload


sudo service kobolde-frontend start
sudo service kobolde-frontend status
sudo service kobolde-frontend stop
sudo service-systemd --remove --service kobolde-frontend

---------------------------------------------------------------
Add SwalAlert
npm install --save sweetalert2
