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
**********************************************************
npm install react-hook-form
npm install @material-ui/icons
npm install @material-ui/core 
npm install -g sass    
npm install bootstrap
npm install --save react-chartjs-2 chart.js
npm install blob-util
npm i react-image-file-resizer
npm i semantic-ui-react 
npm install --save sweetalert2
