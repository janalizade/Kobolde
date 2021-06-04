This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## Screenshot 1
![image](https://user-images.githubusercontent.com/73483327/111279754-4db78f80-863b-11eb-8546-ba89ccceceb4.png)
https://www.udrop.com/57g8/image.png
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
"# ReactContactBookApp" 


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
