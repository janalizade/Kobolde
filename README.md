This project is a WPA web progressive application that is written with bootstrapped and React and  Nodejs and  MongoDB as Database.It is bounded to real data service.
It allows end users to define user profile, make a new category and define a new product based on the category when the mobile is not connected to the internet. It is possible to sync a new product to the database from the mobile local storage. This WPA shows the list of products and delete and edit the products from the database. It has a dashboard that has the ability to shows graph of categories and  search the category to show the increase or decrease in product growth.  



## Screenshot 1
![image](https://user-images.githubusercontent.com/73483327/120782334-31383e80-c52a-11eb-94f6-279f7e5b8f86.png)
![image](https://user-images.githubusercontent.com/73483327/120782587-70668f80-c52a-11eb-9ccc-0dd6e7427eaa.png)
![image](https://user-images.githubusercontent.com/73483327/120782857-b7ed1b80-c52a-11eb-8c2e-9d2522524c22.png)
![image](https://user-images.githubusercontent.com/73483327/120782951-d4895380-c52a-11eb-982c-57538209b5c4.png)


### NPM Installations

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

### Server Installations

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
